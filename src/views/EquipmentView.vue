<template>
  <div class="area">
    <div v-if="loading">Loading...</div>
    <Error v-else-if="error">{{ error }}</Error>
    <div class="asset" v-else>
      <carousel :perPage="1">
        <slide v-for="(img,i) in equipment.images" :key="i">
          <img :src="equipImg(img.file_name)" class="asset--image">
        </slide>
      </carousel>
      <div class="asset--section top--section">
        <h2
          class="text-align-center"
        >{{ equipment.year }} {{ equipment.make }} {{ equipment.model }} {{ equipment.equipment_type }}</h2>
        <div
          v-if="equipment.shoot_price"
          class="selling-chart"
          :style="'--progress:'+ Math.floor(auction.bidPrice / equipment.shoot_price * 100) + '%'"
        >
          <div class="barchart">
            <div class="bar"></div>
          </div>
          <div class="bid">{{ format(equipment.shoot_price) }}</div>
          <div class="market">{{ format(auction.bidPrice) }}</div>
          <div class="ratio">
            <div
              class="ratio--amt"
            >{{ Math.floor(auction.bidPrice / equipment.shoot_price * 100) }}%</div>
          </div>
        </div>
      </div>
      <div class="asset--section">
        <h3>Potential Buyers</h3>
        <div v-if="loadingCustomers">Loading...</div>
        <Error v-else-if="errorCustomers">{{ error }}</Error>
        <div v-else-if="customers.length === 0">Yo got no friends!</div>
        <ul>
          <Customer
            v-for="customer in customers"
            :key="customer.id"
            :customer="customer"
            :equip="equipment"
          />
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { Carousel, Slide } from "vue-carousel";
import Customer from "@/components/Customer";
import Error from "@/components/Error.vue";
import formatMoney from "@/lib/formatMoney";

export default {
  name: "EquipmentView",
  components: {
    Carousel,
    Slide,
    Error,
    Customer
  },
  mounted() {
    this.$store
      .dispatch("equipment/getEquipment", this.$route.params.equipmentid)
      .then(result => {
        this.loading = false;
        if (!result.success) this.error = result.error;
      });
    this.$store.dispatch("customers/getAllCustomers").then(result => {
      this.loadingCustomers = false;
      if (!result.success) this.errorCustomers = result.error;
    });
  },
  computed: {
    equipment() {
      return this.$store.state.equipment.currentEquipment;
    },
    customers() {
      return this.$store.state.customers.customers;
    },
    conversations() {
      return Object.values(
        this.$store.state.conversations.conversations
      ).filter(item => item.asset === this.equipment.id);
    }
  },
  methods: {
    equipImg(img) {
      return process.env.BASE_URL + "img/" + img;
    },
    format: function(amt) {
      return formatMoney(amt);
    }
  },
  data: function() {
    return {
      loading: true,
      error: null,
      loadingCustomers: true,
      errorCustomers: null,
      auction: {
        bidPrice: 10000
      }
    };
  }
};
</script>

<style lang="scss">
.asset {
  max-width: 800px;
  margin: 0 auto;
  padding-bottom: 200px;
}

.asset--image {
  width: 100%;
  display: block;
}

.VueCarousel {
  display: grid;
  grid-template-rows: 1fr 65px;
  grid-template-columns: 1fr;
}

.VueCarousel-wrapper {
  grid-row: 1 / 3;
  grid-column: 1;
}

.VueCarousel-pagination {
  grid-row: 2 / 3;
  grid-column: 1;
  z-index: 1;
}

.asset--section {
  margin: 0 auto;
  width: 90%;
  padding: spacing(4);
  margin-top: spacing(2);
  @include preshadow(2);
}

.top--section {
  position: relative;
  top: -1 * spacing(5);
  margin-top: 0;
  margin-bottom: -1 * spacing(5);
}

.selling-chart {
  display: grid;
  grid-template-areas: "ratio ratio" "bar bar" "market bid";
  grid-template-columns: 1fr auto;
  grid-template-areas: auto auto auto;
  --progress: 0;
}

.market {
  grid-area: market;
}

.bid {
  grid-area: bid;
}

.barchart,
.bar {
  height: spacing(4);
  border-radius: spacing(4);
  background-color: #f5f5f5;
}

.barchart {
  grid-area: bar;
  margin-top: 5px;
}

.bar {
  background-color: $primary;
  width: var(--progress);
}

.ratio {
  grid-area: bar;

  .ratio--amt {
    position: relative;
    left: var(--progress);
    transform: translateX(-50%);
    background-color: white;
    box-shadow: 2px 2px 2px 0 rgba(black, 0.5);
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-weight: 900;
  }
}
</style>

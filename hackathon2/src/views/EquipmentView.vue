<template>
  <div class="area">
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">{{ error }}</div>
    <div class="asset" v-else>
      <carousel :perPage="1">
        <slide v-for="(img,i) in equipment.img" :key="i">
          <img :src="equipImg(img)" class="asset--image">
        </slide>
      </carousel>
      <div class="asset--section top--section">
        <h2 class="text-align-center">{{ equipment.description }}</h2>
      </div>
      <div class="asset--section">
        <h3>Potential Buyers</h3>
        <div v-if="loadingCustomers">Loading...</div>
        <div v-else-if="errorCustomers">{{ error }}</div>
        <ul>
          <Customer
            v-for="customer in customers"
            :key="customer.id"
            :customer="customer"
            :equip="equipment.id"
          />
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { Carousel, Slide } from "vue-carousel";
import Customer from "@/components/Customer";

export default {
  name: "customer",
  components: {
    Carousel,
    Slide,
    Customer
  },
  mounted() {
    this.$store
      .dispatch("equipment/getEquipment", this.$route.params.equipmentid)
      .then(result => {
        this.loading = false;
        if (!result.success) this.error = result.error;
      });
    this.$store.dispatch("customers/getMatchingCustomers").then(result => {
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
    }
  },
  methods: {
    equipImg(img) {
      return process.env.BASE_URL + "img/" + img;
    }
  },
  data: function() {
    return {
      loading: true,
      error: null,
      loadingCustomers: true,
      errorCustomers: null
    };
  }
};
</script>

<style lang="scss">
.asset {
  max-width: 800px;
  margin: 0 auto;
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
</style>

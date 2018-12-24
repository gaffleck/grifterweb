<template>
  <div class="area">
    <div v-if="loading">Loading...</div>
    <Error v-else-if="error">{{ error }}</Error>
    <div class="asset" v-else>
      <carousel :perPage="1">
        <slide v-for="(img,i) in equipment.images" :key="i">
          <img :src="img.file_name" class="asset--image">
        </slide>
      </carousel>
      <div class="asset--section top--section">
        <h2 class="text-align-center">{{ equipment.title }}</h2>
        <Button v-if="!isOnWatchlist" @click.native="addToWatchlist">
          <font-awesome-icon icon="eye"/>
          <span class="m-l-1">Add To Watchlist</span>
        </Button>
        <span v-else>
          <font-awesome-icon icon="eye"/>
          <span class="m-l-1">Watching</span>
        </span>

        <div v-if="editingNote">
          <textarea v-model="assetNote"></textarea>
          <Button @click.native="saveNote">Save</Button>
        </div>
        <div v-else>
          {{ assetNote }}
          <Button @click.native="startEditingNote">{{ hasNote ? 'Edit' : 'Add' }} Note</Button>
        </div>
        <AssetBidding
          v-if="equipment.shoot_price"
          :shootPrice="equipment.shoot_price"
          :bidPrice="auction.bidPrice"
        />
      </div>
      <div class="asset--section">
        <h3>Potential Buyers</h3>
        <div v-if="customers.length === 0">Yo got no friends!</div>
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
import AssetBidding from "@/components/AssetBidding";
import Button from "@/components/Button";
import Error from "@/components/Error.vue";
import formatMoney from "@/lib/formatMoney";

export default {
  name: "EquipmentView",
  components: {
    Carousel,
    Slide,
    Error,
    Customer,
    AssetBidding,
    Button
  },
  mounted() {
    this.$store
      .dispatch("equipment/getEquipment", this.$route.params.equipmentid)
      .then(result => {
        this.loading = false;
        if (!result.success) this.error = result.error;
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
    },
    isOnWatchlist() {
      return this.$store.getters["accounts/isOnWatchlist"](this.equipment.id);
    },
    hasNote() {
      return this.$store.getters["accounts/hasNote"](this.equipment.id);
    }
  },
  methods: {
    equipImg(img) {
      return process.env.BASE_URL + "img/" + img;
    },
    format: function(amt) {
      return formatMoney(amt);
    },
    addToWatchlist() {
      this.$store.dispatch("accounts/addToWatchlist", this.equipment.id);
    },
    startEditingNote() {
      this.assetNote = this.hasNote ? this.hasNote : "";
      this.editingNote = true;
    },
    saveNote() {
      this.editingNote = false;
      this.$store.dispatch("accounts/addNote", {
        asset: this.equipment.id,
        note: this.assetNote
      });
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
      },
      assetNote: null,
      editingNote: false
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
</style>

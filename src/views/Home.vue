<template>
  <div class="area">
    <div class="box">
      <fieldset>
        <div class="searchinput">
          <input type="text" placeholder="Find Equipment" v-model="searchString">
          <Button @click.native="search">
            <font-awesome-icon icon="search"/>
          </Button>
        </div>
      </fieldset>
      <span v-if="loading">Loading...</span>
      <Error v-else-if="error">{{error}}</Error>
      <ul v-else>
        <li v-for="asset in assets" :key="asset.id" class="asset" @click="goToAsset(asset.id)">
          <img
            :src="equipImg(asset.images[0].file_name)"
            v-if="asset.images[0]"
            class="asset-thumbnail"
          >
          <div
            class="asset--description"
          >{{ asset.year }} {{asset.make}} {{asset.model}} {{asset.equipment_type}}</div>
          <div class="asset--shoot">{{format(asset.shoot_price)}}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Button from "@/components/Button.vue";
import Error from "@/components/Error";
import formatMoney from "@/lib/formatMoney";

export default {
  name: "home",
  components: {
    Button,
    Error
  },
  data: function() {
    return {
      searchString: null,
      loading: true,
      error: null
    };
  },
  mounted() {
    this.$store.dispatch("equipment/getAllEquipment").then(result => {
      this.loading = false;
      if (!result.success) this.error = result.error;
    });
  },
  computed: {
    assets() {
      return this.$store.state.equipment.allEquipment;
    }
  },
  methods: {
    equipImg(img) {
      return process.env.BASE_URL + "img/" + img;
    },
    search: function() {
      let equipmentid = 0;
      this.$router.push({ name: "equipment", params: { equipmentid } });
    },
    format: function(amt) {
      return formatMoney(amt);
    },
    goToAsset: function(id) {
      this.$router.push({ name: "equipment", params: { equipmentid: id } });
    }
  }
};
</script>

<style lang="scss" scoped>
.searchinput {
  display: grid;
  grid-template-areas: "input button";
  grid-template-columns: 1fr auto;
}

.asset {
  @include preshadow(0);
  padding: spacing(3);
  border-bottom: 1px solid #f5f5f5;
  cursor: pointer;
  display: grid;
  grid-template-areas: "thumbnail description" "thumbnail price";
  grid-template-columns: auto 1fr;
  grid-template-rows: auto auto;
}

.asset-thumbnail {
  grid-area: thumbnail;
  height: 80px;
  width: 120px;
  display: block;
  object-fit: cover;
  margin-right: spacing(3);
}
.asset--description {
  grid-area: description;
}
.asset--shoot {
  grid-area: price;
}
</style>


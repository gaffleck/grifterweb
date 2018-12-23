<template>
  <div class="area">
    <section class="section">
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
        <AssetTile v-for="asset in assets" :asset="asset" :key="asset.id" :contacts="contacts"/>
      </ul>
    </section>
  </div>
</template>

<script>
import Button from "@/components/Button.vue";
import AssetTile from "@/components/AssetTile.vue";
import Error from "@/components/Error";

export default {
  name: "home",
  components: {
    Button,
    AssetTile,
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
    },
    contacts() {
      return this.$store.state.customers.customers;
    }
  },
  methods: {
    search: function() {
      let equipmentid = 2;
      this.$router.push({ name: "equipment", params: { equipmentid } });
    }
  }
};
</script>

<style lang="scss" scoped>
.section {
  max-width: 800px;
  margin: 0 auto;
  padding-bottom: 200px;
}

.searchinput {
  display: grid;
  grid-template-areas: "input button";
  grid-template-columns: 1fr auto;
}
</style>


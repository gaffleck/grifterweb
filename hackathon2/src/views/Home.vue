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
    </div>
  </div>
</template>

<script>
import Button from "@/components/Button.vue";

export default {
  name: "home",
  components: {
    Button
  },
  data: function() {
    return {
      searchString: null
    };
  },
  methods: {
    search: function() {
      let equipmentid = 0;
      this.$router.push({ name: "equipment", params: { equipmentid } });
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
</style>


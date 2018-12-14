<template>
  <div class="error">
    <font-awesome-icon icon="times" class="icon"/>
    <slot></slot>
    <Button>Dismiss</Button>
  </div>
</template>

<script>
import Button from "@/components/Button.vue";

export default {
  name: "Error",
  components: {
    Button
  },
  props: {},
  mounted() {
    console.log("GOT ERRR");
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.error {
  color: white;
  padding: spacing(4);
  @include preshadow(2);

  &:after {
    background-color: red;
  }
}
</style>
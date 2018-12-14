

<template>
  <div class="input-wrapper">
    <label>{{label}}</label>
    <label v-if="optional" class="input-optional">Optional</label>
    <slot></slot>
    <div class="input-error" v-if="error">{{error}}</div>
  </div>
</template>

<script>
export default {
  name: "InputItem",
  props: {
    error: String,
    label: String,
    optional: Boolean
  }
};
</script>

<style scoped lang="scss">
.input-wrapper {
  margin-bottom: spacing(3);
  position: relative;
}
.input-error {
  color: red;
  padding: spacing(1);
}
.input-optional {
  opacity: 0.5;
  position: absolute;
  top: 0;
  right: 0;
}
</style>
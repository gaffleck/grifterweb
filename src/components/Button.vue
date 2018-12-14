

<template>
  <button :data-processing="processing" :class="[variantClass ? 's-' + variantClass : '']">
    <span v-if="!processing">
      <slot></slot>
    </span>
    <span v-else>Processing...</span>
  </button>
</template>

<script>
export default {
  name: "Button",
  props: {
    processing: Boolean,
    variantClass: String
  }
};
</script>

<style scoped lang="scss">
button {
  padding: 8px 16px;
  border-radius: 4px;
  background-color: $primary;
  color: white;
  border: none;
  font-size: 1rem;
  font-weight: 900;
  font-family: $fontfam;
  text-transform: uppercase;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  &:hover {
    background-color: $secondary;
  }
  &:focus {
    box-shadow: 0px 0 2px 3px $secondary;
    outline: none;
  }

  &.s-secondary {
    background-color: $secondary;
  }

  &[data-processing="true"] {
    opacity: 0.8;
    &:after {
      position: absolute;
      content: "";
      bottom: 0;
      left: 0;
      right: 0;
      height: 5px;
      background-color: $secondary;

      animation: waitinganimation 1s ease-in-out infinite alternate;
    }
  }
}

@keyframes waitinganimation {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(100%);
  }
}
</style>
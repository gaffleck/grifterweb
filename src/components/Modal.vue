<template>
  <PoseTransition>
    <Shade class="modal-frame" v-if="show" v-on:click.native="close">
      <ModalBody class="modal-body" v-on:click.native.stop="go($event)">
        <slot></slot>
      </ModalBody>
      <div class="modal-close" v-on:click.native="close">
        <font-awesome-icon icon="times"/>
      </div>
    </Shade>
  </PoseTransition>
</template>

<script>
import posed, { PoseTransition } from "vue-pose";

export default {
  name: "Modal",
  props: {
    close: Function,
    show: Boolean
  },
  components: {
    PoseTransition,
    Shade: posed.div({
      enter: {
        opacity: 1,
        beforeChildren: true,
        transition: { duration: 200, ease: "backInOut" }
      },
      exit: {
        opacity: 0,
        afterChildren: false,
        transition: { duration: 200, ease: "backInOut" }
      }
    }),
    ModalBody: posed.div({
      enter: { y: 0, opacity: 1 },
      exit: { y: 200, opacity: 0 }
    })
  },
  methods: {
    go: function(e) {
      e.stopPropagation();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.modal-frame {
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: rgba(white, 0.9);
  display: flex;
  z-index: 100;
  overflow-y: auto;
}
.modal-body {
  width: 100%;
  max-width: 600px;
  padding: 40px;
  background-color: white;
  position: relative;
  margin: auto;

  @include preshadow;
}

.modal-close {
  position: absolute;
  top: spacing(5);
  right: spacing(5);
  width: 60px;
  height: 60px;
  cursor: pointer;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  transition: all 0.3s ease-in-out;

  &:hover {
    font-size: 1.5rem;
    color: white;
    background-color: $primary;
  }
}
</style>

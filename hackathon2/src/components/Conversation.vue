<template>
  <Modal v-bind:close="dismissModal" :show="!!conversation">
    <div v-if="!success && !error && conversation">
      <h1>Conversation</h1>
      <ul class="messages">
        <li class="message" v-for="message in conversation" :key="message.id">{{message.Body}}</li>
      </ul>
      <fieldset class="m-t-2" :disabled="processing">
        <div class="message--composer">
          <input class="message--input" type="text" v-model="message" name="message">
          <Button v-on:click.native="sendMessage" :processing="processing">Send</Button>
        </div>
      </fieldset>
    </div>
  </Modal>
</template>

<script>
import Modal from "@/components/Modal.vue";
import Button from "@/components/Button.vue";

export default {
  name: "Conversation",
  components: {
    Modal,
    Button
  },
  data: function() {
    return {
      message: "",
      success: false,
      processing: false,
      error: null
    };
  },
  mounted() {},
  computed: {
    conversation() {
      return this.$store.state.conversations.activeConversation;
    }
  },
  methods: {
    sendMessage: function() {
      this.processing = true;

      this.$store
        .dispatch("conversations/sendMessage", this.fields)
        .then(result => {
          this.processing = false;
          if (!result.success) {
            this.error = result.error;
          }
        });
    },
    dismissModal: function() {
      this.$store.dispatch("conversations/hideConversation");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.messages {
  display: flex;
  flex-direction: column;
}

.message {
  padding: spacing(2) spacing(4);
  background-color: $grey-200;
  border-radius: spacing(4);
  max-width: 90%;
  align-self: flex-start;

  &:nth-child(odd) {
    background-color: $blue;
    color: white;
    align-self: flex-end;
  }
}

.message--composer {
  display: grid;
  grid-template-areas: "input button";
  grid-template-columns: 1fr auto;

  button {
    grid-area: button;
  }
}

.message--input {
  grid-area: input;
  border: 2px solid $secondary;
}
</style>

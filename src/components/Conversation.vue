<template>
  <Modal v-bind:close="dismissModal" :show="!!conversation">
    <div v-if="!success && !error && conversation">
      <h1>Conversation</h1>
      <ul class="messages">
        <li
          class="message"
          v-for="message in conversation.messages"
          :key="message.id"
          :class="{ 's-from': message.From }"
        >
          <img v-if="message.From" :src="conversation.recipient.image" class="message--avatar">
          {{message.Body}}
        </li>
      </ul>
      <fieldset class="m-t-2" :disabled="processing">
        <div class="message--composer">
          <input class="message--input" type="text" v-model="message" name="message">
          <Button
            v-on:click.native="sendMessage"
            :processing="processing"
            :disabled="message.length === 0"
          >Reply</Button>
        </div>
      </fieldset>
      <Error v-if="error">{{ error }}</Error>
    </div>
  </Modal>
</template>

<script>
import Modal from "@/components/Modal.vue";
import Button from "@/components/Button.vue";
import Error from "@/components/Error.vue";

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
        .dispatch("conversations/sendMessage", {
          To: this.conversation.recipient.To,
          Body: this.message
        })
        .then(result => {
          this.processing = false;
          if (!result.success) this.error = result.error;
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
  border-radius: spacing(4);
  max-width: 90%;
  align-self: flex-start;
  background-color: $blue;
  color: white;
  align-self: flex-end;
  margin-bottom: spacing(2);
  display: flex;
  align-items: center;

  &.s-from {
    background-color: $grey-200;
    color: black;
    align-self: flex-start;
  }
}

.message--avatar {
  width: 30px;
  height: 30px;
  object-fit: cover;
  display: inline-block;
  margin: -5px -14px;
  margin-right: spacing(3);
  border-radius: 50%;
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

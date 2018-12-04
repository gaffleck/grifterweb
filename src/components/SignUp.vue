

<template>
  <Modal v-bind:close="dismissModal" v-bind:show="signingUp">
    <div v-if="!success && !error">
      <h1>Sign Up</h1>
      <fieldset class="m-t-4" :disabled="processing">
        <InputItem :label="'Username'" :error="validation.userName">
          <input type="text" v-model="user.userName" placeholder="eg. johnsmith" name="username">
        </InputItem>
        <InputItem :label="'E-mail Address'" :error="validation.email">
          <input
            type="email"
            v-model="user.email"
            placeholder="eg. john.smith@email.com"
            name="email"
          >
        </InputItem>
        <Button class="stretch" v-on:click.native="signup" :processing="processing">Let's Do This!</Button>
      </fieldset>
    </div>
    <div class="error" v-if="error"></div>
    <div class="success" v-if="success">
      <div class="text-large">🎉</div>
      <h2>{{firstName}} {{lastName}} Added Successfully!</h2>
      <Button class="stretch m-t-4" v-on:click.native="dismissModal">Done</Button>
    </div>
  </Modal>
</template>

<script>
import Modal from "@/components/Modal.vue";
import Button from "@/components/Button.vue";
import InputItem from "@/components/InputItem.vue";

function initialState() {
  return {
    error: null,
    success: false,
    processing: false,
    user: {
      userName: null,
      email: null
    },
    validation: {
      userName: null,
      email: null
    }
  };
}

export default {
  name: "SignUp",
  components: {
    Modal,
    Button,
    InputItem
  },
  data: function() {
    return initialState();
  },
  computed: {
    signingUp() {
      return this.$store.state.customers.signingUp;
    }
  },
  methods: {
    signup: function() {
      if (!this.validateForm()) return;
      this.processing = true;
      this.$store
        .dispatch("customers/signUp", this.user)
        .then(res => {
          this.processing = false;
          this.success = true;
        })
        .catch(error => {
          this.processing = false;
          this.error = error;
        });
    },
    addNew: function() {
      this.resetForm();
    },
    dismissModal: function() {
      this.resetForm();
      this.$store.dispatch("customers/toggleSignUp");
    },
    validateForm: function() {
      let validationPassed = true;
      if (!this.user.userName) {
        this.validation.userName = "Please provide a username!";
        validationPassed = false;
      } else this.validation.userName = null;

      if (!this.user.email) {
        this.validation.email = "Please provide a e-mail address!";
        validationPassed = false;
      } else this.validation.email = null;
      return validationPassed;
    },
    resetForm: function() {
      Object.assign(this.$data, this.$options.data.apply(initialState()));
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.success {
  text-align: center;
}
</style>

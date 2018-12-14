

<template>
  <Modal v-bind:close="dismissModal" v-bind:show="signingUp">
    <div v-if="!success && !error">
      <h1>Sign Up</h1>
      <fieldset class="m-t-4" :disabled="processing">
        <InputItem :label="'First Name'" :error="validation.first_name">
          <input type="text" v-model="user.first_name" placeholder="eg. John" name="first_name">
        </InputItem>
        <InputItem :label="'Last Name'" :error="validation.last_name">
          <input type="text" v-model="user.last_name" placeholder="eg. Smith" name="last_name">
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
    <div class="text-align-center" v-if="success">
      <div class="text-large">🎉</div>
      <h2>Added Successfully!</h2>
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
      first_name: null,
      last_name: null,
      email: null
    },
    validation: {
      first_name: null,
      last_name: null,
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
      console.log("create", this.user);
      this.processing = true;
      if (this.$store.dispatch("customers/signUp", this.user)) {
        this.processing = false;
        this.success = true;
      } else {
        this.processing = false;
        this.error = "THERE WAS AN ERROR";
      }
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
      if (!this.user.first_name) {
        this.validation.first_name = "Please provide a first name!";
        validationPassed = false;
      } else this.validation.first_name = null;

      if (!this.user.last_name) {
        this.validation.last_name = "Please provide a last name!";
        validationPassed = false;
      } else this.validation.last_name = null;

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
</style>

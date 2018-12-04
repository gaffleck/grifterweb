<template>
  <Modal v-bind:close="dismissModal" v-bind:show="creatingFriend.value">
    <div v-if="!success && !error">
      <h1>Add a Friend</h1>
      <fieldset class="m-t-4" :disabled="processing">
        <InputItem :label="'First Name'" :error="validation.firstName">
          <input type="text" v-model="fields.firstName" placeholder="eg. John" name="firstName">
        </InputItem>
        <InputItem :label="'Last Name'" :error="validation.lastName">
          <input type="text" v-model="fields.lastName" placeholder="eg. Smith" name="lastName">
        </InputItem>
        <InputItem :label="'Birthday'" :error="validation.birthday">
          <v-date-picker mode="single" v-model="fields.birthday"></v-date-picker>
        </InputItem>
        <InputItem :label="'Gift Budget'" :optional="true">
          <vue-numeric currency="$" separator="," v-model="fields.budget"></vue-numeric>
        </InputItem>
        <Button class="stretch" v-on:click.native="addFriend" :processing="processing">Add Friend</Button>
      </fieldset>
    </div>
    <div class="error" v-if="error"></div>
    <div class="success" v-if="success">
      <div class="text-large">🎉</div>
      <h2>{{firstName}} {{lastName}} Added Successfully!</h2>
      <Button class="stretch m-t-4" v-on:click.native="addNew">Add Another Friend</Button>
    </div>
  </Modal>
</template>

<script>
import Modal from "@/components/Modal.vue";
import VueNumeric from "vue-numeric";
import { setTimeout } from "timers";
import Button from "@/components/Button.vue";
import InputItem from "@/components/InputItem.vue";

function initialState() {
  return {
    error: null,
    processing: false,
    success: false,
    fields: {
      firstName: null,
      lastName: null,
      birthday: null,
      budget: null
    },
    validation: {
      firstName: null,
      lastName: null,
      birthday: null,
      budget: null
    }
  };
}

export default {
  name: "AddFriend",
  components: {
    Modal,
    Button,
    InputItem,
    VueNumeric
  },
  data: function() {
    return initialState();
  },
  mounted() {
    console.log(this.creatingFriend.targetDate);
    this.fields.birthday = this.creatingFriend.targetDate;
  },
  computed: {
    creatingFriend() {
      this.fields.birthday = this.$store.state.friends.creatingFriend.targetDate;
      return this.$store.state.friends.creatingFriend;
    }
  },
  methods: {
    addFriend: function() {
      if (!this.validateForm()) return;
      this.processing = true;
      setTimeout(() => {
        this.processing = false;
        this.success = true;
      }, 1000);
      //POST TO SERVER
    },
    addNew: function() {
      this.resetData();
    },
    dismissModal: function() {
      this.$store.dispatch("friends/toggleCreateFriend", null);
      this.resetData();
    },
    validateForm: function() {
      let validationPassed = true;
      if (!this.fields.firstName) {
        this.validation.firstName = "Please provide a first name!";
        validationPassed = false;
      } else this.validation.firstName = null;

      if (!this.fields.lastName) {
        this.validation.lastName = "Please provide a last name!";
        validationPassed = false;
      } else this.validation.lastName = null;

      if (!this.fields.birthday) {
        this.validation.birthday = "Please provide their birthday!";
        validationPassed = false;
      } else this.validation.birthday = null;
      return validationPassed;
    },
    resetData: function() {
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

<template>
  <Modal v-bind:close="dismissModal" v-bind:show="creatingContact">
    <div v-if="!success && !error">
      <h1>Add a Contact</h1>
      <fieldset class="m-t-2" :disabled="processing">
        <InputItem :label="'First Name'" :error="validation.first_name">
          <input
            type="text"
            v-model="fields.first_name"
            :placeholder="'eg. Susan'"
            name="firstName"
          >
        </InputItem>
        <InputItem :label="'Last Name'" :error="validation.last_name">
          <input type="text" v-model="fields.last_name" placeholder="eg. Smith" name="lastName">
        </InputItem>
        <InputItem :label="'Phone Number'" :error="validation.phone_number">
          <input
            type="tel"
            v-model="fields.phone_number"
            placeholder="eg. +15555555555"
            name="phone"
          >
        </InputItem>
        <InputItem :label="'Industry'" :error="validation.industry">
          <input type="text" v-model="fields.industry" placeholder="eg. Smith" name="industry">
        </InputItem>
        <InputItem :label="'Quality: ' + fields.quality" :error="validation.quality">
          <input
            type="range"
            min="0"
            max="10"
            v-model="fields.quality"
            placeholder="eg. Smith"
            name="quality"
          >
        </InputItem>
        <Button class="stretch" v-on:click.native="addContact" :processing="processing">Add Customer</Button>
      </fieldset>
    </div>
    <Error v-if="error">{{error}}</Error>
    <div class="success" v-if="success">
      <div class="text-large">🎉</div>
      <h2>Contact Added Successfully!</h2>
      <Button class="stretch m-t-4" v-on:click.native="addNew">Add Another Contact</Button>
    </div>
  </Modal>
</template>

<script>
import Modal from "@/components/Modal.vue";
import VueNumeric from "vue-numeric";
import { setTimeout } from "timers";
import Button from "@/components/Button.vue";
import Error from "@/components/Error.vue";
import InputItem from "@/components/InputItem.vue";

function initialState() {
  return {
    error: null,
    processing: false,
    success: false,
    fields: {
      first_name: null,
      last_name: null,
      industry: null,
      phone_number: null,
      quality: 5
    },
    validation: {
      first_name: null,
      last_name: null,
      industry: null,
      phone_number: null,
      quality: null
    }
  };
}

export default {
  name: "AddContact",
  components: {
    Modal,
    Button,
    InputItem,
    VueNumeric
  },
  data: function() {
    return initialState();
  },
  mounted() {},
  computed: {
    creatingContact() {
      return this.$store.state.customers.creatingContact;
    }
  },
  methods: {
    addContact: function() {
      if (!this.validateForm()) return;
      this.processing = true;

      this.$store
        .dispatch("customers/createContact", this.fields)
        .then(result => {
          this.processing = false;
          if (result.success) {
            this.success = true;
          } else {
            this.error = result.error;
          }
        });
      //POST TO SERVER
    },
    addNew: function() {
      this.resetData();
    },
    dismissModal: function() {
      this.$store.dispatch("customers/toggleAddContact");
      this.resetData();
    },
    validateForm: function() {
      let validationPassed = true;
      if (!this.fields.first_name) {
        this.validation.first_name = "Please provide a name!";
        validationPassed = false;
      } else this.validation.first_name = null;

      if (!this.fields.last_name) {
        this.validation.last_name = "Please provide a last name!";
        validationPassed = false;
      } else this.validation.last_name = null;

      if (!this.fields.phone_number) {
        this.validation.phone_number = "Please provide a phone number!";
        validationPassed = false;
      } else this.validation.phone_number = null;

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

.selectors {
  display: grid;
  grid-template-columns: repeat(3, minMax(50px, 1fr));
  grid-gap: spacing(2);

  label {
    border-radius: spacing(2);
    border: 2px solid #f5f5f5;
    padding: spacing(4) 0;
    text-align: center;
    text-transform: uppercase;
    color: #b5b5b5;
    cursor: pointer;
  }

  h1 {
    transition: transform 0.3s ease-in-out;
  }
  input {
    position: fixed;
    opacity: 0;

    &:focus + label,
    &:hover + label {
      box-shadow: 0px 0 2px 3px lighten($secondary, 20%);

      h1 {
        transform: scale(1.1);
      }
    }
    &:checked + label {
      border-color: $primary;
      color: $primary;

      h1 {
        transform: scale(1.1);
      }
    }
  }
}
</style>

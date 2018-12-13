<template>
  <Modal v-bind:close="dismissModal" v-bind:show="creatingFriend.value">
    <div v-if="!success && !error">
      <h1>Add an Event</h1>
      <div class="selectors m-t-2">
        <div>
          <input id="birthday" type="radio" v-model="eventType" value="birthday">
          <label for="birthday">
            <h1>🎉</h1>
            <span>Birthday</span>
          </label>
        </div>
        <div>
          <input id="anniversary" type="radio" v-model="eventType" value="anniversary">
          <label for="anniversary">
            <h1>💍</h1>
            <span>Anniversary</span>
          </label>
        </div>
        <div>
          <input id="occasion" type="radio" v-model="eventType" value="occasion">
          <label for="occasion">
            <h1>⭐️</h1>
            <span>Occasion</span>
          </label>
        </div>
      </div>
      <fieldset class="m-t-4" :disabled="processing">
        <InputItem :label="nameLabel" :error="validation.first_name">
          <input
            type="text"
            v-model="fields.first_name"
            :placeholder="placeholderText"
            name="firstName"
          >
        </InputItem>
        <InputItem
          :label="'Last Name'"
          :error="validation.last_name"
          v-if="eventType === 'birthday'"
        >
          <input type="text" v-model="fields.last_name" placeholder="eg. Smith" name="lastName">
        </InputItem>
        <InputItem :label="'Date'" :error="validation.birthday">
          <v-date-picker mode="single" v-model="fields.birthday"></v-date-picker>
        </InputItem>
        <InputItem :label="'Gift Budget'" :optional="true">
          <vue-numeric currency="$" separator="," v-model="fields.budget"></vue-numeric>
        </InputItem>
        <Button class="stretch" v-on:click.native="addFriend" :processing="processing">Add Event</Button>
      </fieldset>
    </div>
    <div class="error" v-if="error"></div>
    <div class="success" v-if="success">
      <div class="text-large">🎉</div>
      <h2>Event Added Successfully!</h2>
      <Button class="stretch m-t-4" v-on:click.native="addNew">Add Another Event</Button>
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
    eventType: "birthday",
    fields: {
      first_name: null,
      last_name: null,
      birthday: null,
      budget: null
    },
    validation: {
      first_name: null,
      last_name: null,
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
    this.fields.birthday = this.creatingFriend.targetDate;
  },
  computed: {
    creatingFriend() {
      this.fields.birthday = this.$store.state.friends.creatingFriend.targetDate;
      return this.$store.state.friends.creatingFriend;
    },
    nameLabel() {
      return this.eventType === "birthday"
        ? "First Name"
        : this.eventType === "anniversary"
        ? "Which Anniversary"
        : "Occasion Name";
    },
    placeholderText() {
      return this.eventType === "birthday"
        ? "eg. John"
        : this.eventType === "anniversary"
        ? "eg. Wedding Anniversary"
        : "eg. First Day at Work";
    }
  },
  methods: {
    addFriend: function() {
      if (!this.validateForm()) return;
      this.processing = true;

      this.$store
        .dispatch("customers/createFriend", this.fields)
        .then(result => {
          if (result) {
            this.processing = false;
            this.success = true;
          } else {
            console.log("ERRRORRRR");
          }
        });
      //POST TO SERVER
    },
    addNew: function() {
      this.resetData();
    },
    dismissModal: function() {
      this.$store.dispatch("friends/toggleCreateFriend");
      this.resetData();
    },
    validateForm: function() {
      let validationPassed = true;
      if (!this.fields.first_name) {
        this.validation.first_name = "Please provide a name!";
        validationPassed = false;
      } else this.validation.first_name = null;

      if (this.eventType === "birthday" && !this.fields.last_name) {
        this.validation.last_name = "Please provide a last name!";
        validationPassed = false;
      } else this.validation.last_name = null;

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

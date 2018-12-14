<template>
  <li class="customer" v-on:click="loadCustomer">
    <div class="customer-inner">
      <div class="customer--avatar">
        <img :src="userImg(customer.image)">
      </div>
      <div class="customer-header">
        <h2>{{ fullName }}</h2>
        <div class="customer-email">{{ customer.phone_number }}</div>
      </div>
      <div class="customer-action" v-if="equip">
        <!-- <Button
          v-if="!messageSent && !conversation"
          @click.native="checkInterest"
          :processing="messageSending"
        >Check Interest</Button>
        <Button v-else @click.native="showConversation" :variantClass="'secondary'">Message Sent</Button>-->
        <Button
          v-if="customer.phone_number && !conversation"
          @click.native="sendMessage"
          :processing="messageSending"
        >Send Warm-Up Msg</Button>
        <Button
          v-if="conversation"
          @click.native="showConversation"
          :variantClass="'secondary'"
        >View Messages</Button>
      </div>
      <div class="customer-meta h-color-primary h-cursor-pointer">
        <div>
          <label>Quality</label>
          <div>{{customer.quality}}</div>
        </div>
        <div>
          <label>Industry</label>
          <div>{{customer.industry}}</div>
        </div>
        <div>
          <label>Past Purchases</label>
          <div>{{customer.purchases.length}}</div>
        </div>
      </div>
    </div>
  </li>
</template>

<script>
import Button from "@/components/Button.vue";

export default {
  name: "Customer",
  components: {
    Button
  },
  props: {
    customer: Object,
    equip: Object
  },
  data: function() {
    return {
      messageSent: false,
      messageSending: false
    };
  },
  mounted() {},
  computed: {
    fullName() {
      return this.customer.first_name + " " + this.customer.last_name;
    },
    conversation() {
      return this.$store.getters["conversations/customerConversation"](
        this.customer.phone_number
      );
      // return this.$store.getters["conversations/assetCustomerConversation"](
      //   this.equip.id,
      //   this.customer.id
      // );
    }
  },
  methods: {
    userImg(img) {
      return process.env.BASE_URL + "img/" + img;
    },
    loadCustomer: function() {
      let id = this.customer.id;
      // this.$router.push({ name: "customer", params: { id } });
    },
    sendMessage: function() {
      this.messageSending = true;
      this.$store
        .dispatch("conversations/sendMessage", {
          To: this.customer.phone_number,
          Body: `${this.customer.first_name} are you looking for a ${
            this.equip.make
          } ${this.equip.model}?`
        })
        .then(result => {
          this.messageSending = false;
          if (result.success) this.messageSent = true;
        });
    },
    checkInterest: function() {
      this.messageSending = true;
      this.$store
        .dispatch("conversations/startConversation", {
          conversation: {
            user: 1,
            contact: this.customer.id,
            asset: this.equip.id
          },
          message: {
            To: this.customer.phone_number,
            Body: `Hey ${this.customer.first_name}, are you looking for a ${
              this.equip.make
            } ${this.equip.model} ${
              this.equip.equipment_type
            }? If you are interested, holla at me!`
          }
        })
        .then(result => {
          this.messageSending = false;
          console.log("DONE", result);
          if (result.success) this.messageSent = true;
        });
      // this.customer.warmedAssets[this.equip] = "100000";
    },
    showConversation: function() {
      this.$store.dispatch(
        "conversations/showConversation",
        this.customer.phone_number
      );
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.customer {
  margin-bottom: spacing(2);
  z-index: 1;
  border-bottom: 1px solid $grey-200;
}

.customer-inner {
  background-color: white;
  padding: spacing(2) spacing(3);
  display: grid;
  grid-template-columns: 50px 1fr auto;
  grid-template-rows: 1fr;
  grid-template-areas: "avatar header action" "meta meta meta";
}
.customer--avatar {
  grid-area: avatar;

  img {
    width: 40px;
    height: 40px;
    object-fit: cover;
    border-radius: 50%;
  }
}

.customer-header {
  grid-area: header;
}

.customer-action {
  grid-area: action;
}

.customer-email {
  margin-bottom: spacing(2);
}

.customer-meta {
  grid-area: meta;
  display: flex;

  & > div {
    flex-basis: 33%;
  }
}

.friends {
  background-color: $primary;
}

h2 {
  font-size: 1.2rem;
}
</style>

<template>
  <div class="area">
    <div class="box">
      <h1 class="h-color-white m-b-4">Customers</h1>
      <div v-if="error">{{error}}</div>
      <div v-else-if="!customers || customers.length === 0">Loading...</div>
      <ul class="customers" v-else>
        <Customer
          v-for="customer in customers"
          v-bind:key="customer.id"
          v-bind:customer="customer"
        />
      </ul>
    </div>
  </div>
</template>

<script>
import Customer from "@/components/Customer.vue";
import { setTimeout } from "timers";
import posed from "vue-pose";

export default {
  name: "customers",
  components: {
    Customer
  },
  computed: {
    customers() {
      return this.$store.state.customers.customers;
    }
  },
  mounted() {
    this.$store
      .dispatch("customers/getAllCustomers")
      .then(() => {})
      .catch(error => {
        this.error = error;
      });
  },
  methods: {
    addFriend: function() {
      this.$store.dispatch("friends/toggleCreateFriend");
    }
  },
  data: function() {
    return {
      error: null
    };
  }
};
</script>

<style lang="scss">
.error {
  background-color: red;
  color: white;
  padding: spacing(6);
}
</style>

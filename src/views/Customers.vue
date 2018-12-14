<template>
  <div class="area">
    <div class="box">
      <h1 class="h-color-white m-b-4">Customers</h1>
      <div v-if="loading">Loading...</div>
      <Error v-if="error">{{error}}</Error>
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
import Error from "@/components/Error.vue";
import { setTimeout } from "timers";
import posed from "vue-pose";

export default {
  name: "customers",
  components: {
    Customer,
    Error
  },
  computed: {
    customers() {
      return this.$store.state.customers.customers;
    }
  },
  mounted() {
    this.$store.dispatch("customers/getAllCustomers").then(result => {
      this.loading = false;
      if (!result.success) this.error = result.error;
    });
  },
  methods: {},
  data: function() {
    return {
      loading: true,
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

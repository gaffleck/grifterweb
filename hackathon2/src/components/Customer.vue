<template>
  <li class="customer" v-on:click="loadCustomer">
    <div class="customer-inner">
      <div class="customer-header">
        <h2>{{ customer.name }}</h2>
        <div class="customer-email">{{ customer.email }}</div>
      </div>
      <div class="customer-action">
        <Button v-if="!messageSent" @click.native="checkInterest">Check Interest</Button>
        <span v-else>Sent Check...</span>
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
          <div>{{customer.pastPurchases.length}}</div>
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
    equip: Number
  },
  data: function() {
    return {};
  },
  mounted() {},
  computed: {
    fullName() {
      return this.customer.first_name + " " + this.customer.last_name;
    },
    messageSent() {
      return this.$store.state.customers.messages.filter(i => {
        return i.customerid === this.customer.id && i.equipid === this.equip;
      }).length;
    }
  },
  methods: {
    loadCustomer: function() {
      let id = this.customer.id;
      // this.$router.push({ name: "customer", params: { id } });
    },
    checkInterest: function() {
      this.$store.dispatch("customers/sendMessage", {
        customerid: this.customer.id,
        equipid: this.equip
      });
      // this.customer.warmedAssets[this.equip] = "100000";
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.customer {
  margin-bottom: spacing(2);
  z-index: 1;
}

.customer-inner {
  background-color: white;
  padding: spacing(2) spacing(3);
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-rows: 1fr;
  grid-template-areas: "header action" "meta meta";
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
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  grid-gap: spacing(2);
}

.friends {
  background-color: $primary;
}

h2 {
  font-size: 1.2rem;
}
</style>

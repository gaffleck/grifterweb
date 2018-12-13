<template>
  <div id="app">
    <div id="nav">
      <div class="nav--links">
        <router-link to="/">Home</router-link>|
        <router-link to="/customers">Customers</router-link>
        <!-- <router-link to="/about">About</router-link> -->
      </div>
      <div class="nav--actions">
        <Button v-on:click.native="showSingup" :variantClass="'secondary'">Sign-Up</Button>
      </div>
    </div>
    <div class="content">
      <router-view/>
    </div>
    <AddCustomer/>
    <SignUp/>
  </div>
</template>

<script>
import AddCustomer from "@/components/AddCustomer.vue";
import SignUp from "@/components/SignUp.vue";
import Button from "@/components/Button.vue";

export default {
  name: "customers",
  components: {
    AddCustomer,
    SignUp,
    Button
  },
  methods: {
    showSingup: function() {
      this.$store.dispatch("customers/toggleSignUp");
    }
  }
};
</script>

<style lang="scss">
#app {
  display: grid;
  grid-template-areas: "nav" "content";
  grid-template-rows: auto 1fr;
}
#nav {
  text-align: left;
  padding: spacing(2) spacing(5);
  grid-area: nav;
  display: grid;
  grid-template-areas: "links actions";
  grid-template-columns: 1fr auto;

  a {
    font-weight: bold;
    color: white;
    text-decoration: none;
    padding: spacing(1) spacing(3);
    text-transform: uppercase;

    &.router-link-exact-active {
      color: $secondary;
    }
  }
}

.nav--links {
  grid-area: links;
}

.nav--actions {
  grid-area: actions;
}

.content {
  grid-area: content;
  overflow-y: auto;
}
</style>

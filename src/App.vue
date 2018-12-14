<template>
  <div id="app">
    <div id="nav">
      <div class="nav--links">
        <router-link to="/">Available Equipment</router-link>|
        <router-link to="/customers">Contacts</router-link>
      </div>
      <div class="nav--actions">
        <Button v-on:click.native="showAddContact" :variantClass="'secondary'">Add A Contact</Button>
      </div>
    </div>
    <div class="content">
      <router-view/>
    </div>
    <Conversation/>
    <AddContact/>
    <SignUp/>
  </div>
</template>

<script>
import AddContact from "@/components/AddContact.vue";
import Conversation from "@/components/Conversation.vue";
import SignUp from "@/components/SignUp.vue";
import Button from "@/components/Button.vue";

export default {
  name: "customers",
  components: {
    AddContact,
    Conversation,
    SignUp,
    Button
  },
  mounted() {
    this.$store.dispatch("conversations/getMessages");
    this.$store.dispatch("conversations/getConversations");
    this.$store.dispatch("customers/getAllCustomers");
  },
  methods: {
    showAddContact: function() {
      this.$store.dispatch("customers/toggleAddContact");
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

<template>
  <li class="customer" v-on:click="loadCustomer">
    <div class="customer-inner">
      <h2>{{ customer.userName }}</h2>
      <div class="customer-email">{{ customer.email }}</div>
      <div class="customer-meta h-color-primary h-cursor-pointer">
        <span
          v-on:click="toggleFriends($event)"
        >{{ customer.friends ? customer.friends.length : '0' }} Friends</span>
        <span v-on:click="addFriend">
          <font-awesome-icon icon="plus" class="m-r-1"/>Add Friend
        </span>
      </div>
    </div>
    <ul class="friends" v-if="customer.friends && showFriends">
      <Friend
        v-for="friend in customer.friends"
        v-bind:key="friend.customerId"
        v-bind:friend="friend"
        v-on:click.native="loadFriend(friend, $event)"
      />
    </ul>
  </li>
</template>

<script>
import Friend from "@/components/Friend.vue";

export default {
  name: "Customer",
  components: {
    Friend
  },
  props: {
    customer: Object
  },
  data: function() {
    return {
      showFriends: false
    };
  },
  methods: {
    toggleFriends: function(e) {
      e.stopPropagation();
      this.showFriends = !this.showFriends;
    },
    addFriend: function() {
      this.$store.dispatch("friends/toggleCreateFriend");
    },
    loadCustomer: function() {
      let id = this.customer.customerId;
      this.$router.push({ name: "customer", params: { id } });
    },
    loadFriend: function(friend, e) {
      e.stopPropagation();
      let customerid = this.customer.customerId;
      let friendid = friend.friendID;
      this.$router.push({ name: "friend", params: { customerid, friendid } });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.customer {
  margin-bottom: spacing(2);
  z-index: 1;
  @include preshadow;
}

.customer-inner {
  background-color: white;
  padding: spacing(2) spacing(3);
}

.customer-email {
  margin-bottom: spacing(2);
}

.customer-meta {
  display: grid;
  grid-template-columns: 1fr auto;
}

.friends {
  background-color: $primary;
}

h2 {
  font-size: 1.2rem;
}
</style>

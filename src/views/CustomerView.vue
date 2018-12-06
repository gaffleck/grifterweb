<template>
  <div class="area">
    <div class="view-container">
      <div v-if="loading || !customer">Loading...</div>
      <div v-else-if="error">THERE HAS BEEN AN ER-ROR</div>
      <div class v-else>
        <div class="view-header">
          <div>
            <h2>{{ fullName }}</h2>
            <div class="customer-email">{{ customer.email }}</div>
            <span
              class="h-color-white"
            >{{ customer.friends ? customer.friends.length : '0' }} Events</span>
          </div>
          <div class="customer-meta h-color-white">
            <Button v-on:click.native="addFriend" v-bind:variantClass="'secondary'">
              <font-awesome-icon icon="plus" class="m-r-1"/>Add Event
            </Button>
          </div>
        </div>
        <!-- <div>
          <Button v-on:click.native="showFriends(true)">Friends</Button>
          <Button v-on:click.native="showFriends(false)" v-bind:variantClass="'secondary'">Calendar</Button>
        </div>-->
        <div class="view-body" v-if="customer.friends">
          <div class="friends">
            <ul class="friends-inner">
              <Friend
                v-for="friend in customer.friends"
                v-bind:key="friend.customerId"
                v-bind:friend="friend"
                v-on:click.native="loadFriend(friend)"
              />
            </ul>
          </div>
          <Calendar
            v-bind:friends="customer.friends"
            v-bind:loadFriend="loadFriend"
            v-bind:addEvent="addEvent"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Friend from "@/components/Friend.vue";
import Button from "@/components/Button.vue";
import Calendar from "@/components/Calendar.vue";

export default {
  name: "customer",
  components: {
    Friend,
    Button,
    Calendar
  },
  computed: {
    customer() {
      return this.$store.state.customers.currentCustomer;
    },
    fullName() {
      return this.customer.first_name + " " + this.customer.last_name;
    }
  },
  mounted() {
    if (this.$store.dispatch("customers/getACustomer", this.$route.params.id))
      this.loading = false;
    else {
      this.loading = false;
      this.error = true;
    }
  },
  methods: {
    addFriend: function() {
      this.$store.dispatch("friends/toggleCreateFriend", {
        customerid: this.customer.id,
        targetDate: ""
      });
    },
    loadFriend: function(friend) {
      let friendid = friend.id;
      this.$router.push({ name: "friend", params: { friendid } });
    },
    showFriends: function(val) {
      this.showFriendList = val;
    },
    addEvent: function(targetDate) {
      this.$store.dispatch("friends/toggleCreateFriend", {
        customerid: this.customer.id,
        targetDate
      });
    }
  },
  data: function() {
    return {
      loading: true,
      error: false,
      showFriendList: false
    };
  }
};
</script>

<style lang="scss" scoped>
.friends {
  margin-bottom: spacing(2);
  z-index: 1;
  @include preshadow;
}

.friends-inner {
  background-color: $primary;
  padding: spacing(2) 0 0;
}
</style>

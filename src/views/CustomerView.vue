<template>
  <div class="area">
    <div class="customer-view">
      <div v-if="!customer">Loading...</div>
      <div class="customer" v-else>
        <div class="customer-inner">
          <div>
            <h2>{{ customer.userName }}</h2>
            <div class="customer-email">{{ customer.email }}</div>
            <span
              class="h-color-white"
            >{{ customer.friends ? customer.friends.length : '0' }} Friends</span>
          </div>
          <div class="customer-meta h-color-white">
            <Button v-on:click.native="addFriend" v-bind:variantClass="'secondary'">
              <font-awesome-icon icon="plus" class="m-r-1"/>Add Friend
            </Button>
          </div>
        </div>
        <!-- <div>
          <Button v-on:click.native="showFriends(true)">Friends</Button>
          <Button v-on:click.native="showFriends(false)" v-bind:variantClass="'secondary'">Calendar</Button>
        </div>-->
        <div class="friends-views" v-if="customer.friends">
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
          <Calendar v-bind:friends="customer.friends" v-bind:loadFriend="loadFriend"/>
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
  mounted() {
    this.$store
      .dispatch("customers/getACustomer", this.$route.params.id)
      .then(res => {
        this.customer = res;
      })
      .catch(error => {
        this.error = error;
      });
  },
  methods: {
    addFriend: function() {
      this.$store.dispatch("friends/toggleCreateFriend");
    },
    loadFriend: function(friend) {
      let customerid = this.customer.customerId;
      let friendid = friend.friendID;
      this.$router.push({ name: "friend", params: { customerid, friendid } });
    },
    showFriends: function(val) {
      this.showFriendList = val;
    }
  },
  data: function() {
    return {
      error: null,
      customer: null,
      showFriendList: false
    };
  }
};
</script>

<style lang="scss">
.customer-view {
  max-width: 800px;
  margin: 0 auto;
}

.customer-inner {
  display: grid;
  grid-template-columns: 1fr auto;
}

.friends-views {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: spacing(4);
  align-items: start;
}

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

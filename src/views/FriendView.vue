<template>
  <div class="area">
    <div class="box">
      <div v-if="!friend">Loading...</div>
      <div v-else>
        <h1 class="h-color-white m-b-4">{{ friend.firstName }} {{ friend.lastName }}</h1>
        <div>{{ this.$dayjs(friend.birthDay).format('D MMM YYYY') }}</div>
        <div>${{ friend.giftBudget }}</div>
        <ul v-if="friend.giftHistory && friend.giftHistory.length > 0">
          <li class="gift" v-for="gift in friend.giftHistory" v-bind:key="gift.id">
            <div class="gift-inner">
              <h2>{{ gift.giftName }}</h2>
              <div>{{ gift.dateGiven }}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "friend",
  components: {},
  mounted() {
    //SWITCH THIS BACK TO USING THE ACTION IN THE FRIENDS MODULE OF THE STORE ONCE USING API
    this.$store
      .dispatch("customers/getAFriend", {
        customerid: this.$route.params.customerid,
        friendid: this.$route.params.friendid
      })
      .then(res => {
        this.friend = res;
      })
      .catch(error => {
        this.error = error;
      });
  },
  methods: {},
  data: function() {
    return {
      error: null,
      friend: null
    };
  }
};
</script>

<style lang="scss">
.gift {
  margin-bottom: spacing(2);
  z-index: 1;
  @include preshadow;
}

.gift-inner {
  background-color: white;
  padding: spacing(2) spacing(3);
}
</style>

<template>
  <div class="area">
    <div class="view-container">
      <div v-if="loading || !friend">Loading...</div>
      <div v-else-if="error">THERE HAS BEEN AN ER-ROR</div>
      <div v-else>
        <div class="view-header">
          <div>
            <h1 class="h-color-white m-b-4">{{ fullName }}</h1>
            <label>Gift Budget:</label>
            <h3>${{ friend.giftBudget }}</h3>
          </div>
          <div class="bday-container h-color-white">
            <div class="date-sticker">
              <div class="date-header">{{ this.$dayjs(friend.birthDay).format('MMM YYYY') }}</div>
              <div class="date-date">{{ this.$dayjs(friend.birthDay).format('D') }}</div>
            </div>
          </div>
        </div>
        <div class="view-body">
          <div>
            <h2>Gift History</h2>

            <ul v-if="friend.giftHistory && friend.giftHistory.length > 0">
              <li class="gift" v-for="gift in friend.giftHistory" v-bind:key="gift.id">
                <div class="gift-inner">
                  <h2>{{ gift.giftName }}</h2>
                  <div>{{ gift.dateGiven }}</div>
                </div>
              </li>
            </ul>
            <div v-else class="text-align-center">
              <div class="text-large">😫</div>
              You haven't sent {{friend.first_name}} any gifts yet
            </div>
          </div>
          <div>
            <h2>Gift Suggestions</h2>
            <ul class="gifts m-t-2">
              <li
                class="gift-suggestion"
                v-for="giftSuggestion in giftSuggestions"
                :key="giftSuggestion.id"
              >
                <div class="gift-suggestion-inner">
                  <h2>{{ giftSuggestion.name }}</h2>
                  <div>{{ formatMoney(giftSuggestion.price) }}</div>
                  <Button>Send to {{ friend.first_name }}</Button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "@/components/Button";
import formatMoney from "@/lib/formatMoney";

export default {
  name: "friend",
  components: {
    Button
  },
  computed: {
    friend() {
      return this.$store.state.friends.currentFriend;
    },
    giftSuggestions() {
      return this.$store.state.gifts.giftSuggestions;
    },
    fullName() {
      return this.friend.first_name + " " + this.friend.last_name;
    }
  },
  mounted() {
    if (
      this.$store.dispatch("friends/getAFriend", {
        friendid: this.$route.params.friendid
      })
    )
      this.loading = false;
    else {
      this.error = true;
      this.loading = false;
    }
  },
  methods: {
    formatMoney: function(val) {
      return formatMoney(val);
    }
  },
  data: function() {
    return {
      error: false,
      loading: true,
      bdayDate: null,
      bdayMonth: null
    };
  }
};
</script>

<style lang="scss">
.bday-container {
  align-self: center;
}

.gift,
.gift-suggestion {
  margin-bottom: spacing(2);
  z-index: 1;
  @include preshadow;
}

.gift-inner {
  background-color: $primary;
  color: white;
  padding: spacing(2) spacing(3);
}

.gift-suggestion-inner {
  background-color: white;
  padding: spacing(2) spacing(3);
  display: grid;
  grid-template-areas: "name name" "price action";
  grid-template-columns: 1fr auto;
  grid-template-rows: auto auto;

  h2 {
    grid-area: name;
  }

  div {
    grid-area: price;
    align-self: center;
  }

  button {
    grid-area: action;
  }
}

.bday-container {
  perspective: 50em;
}

.date-sticker {
  text-align: center;
  background-color: white;
  z-index: 1;
  @include preshadow;

  transform: rotateY(-20deg) rotateX(10deg);
}

.date-header {
  background-color: $primary;
  font-weight: 900;
  padding: spacing(1) spacing(4);
  z-index: 1;
}

.date-date {
  color: black;
  font-size: 3rem;
  font-weight: 900;
  padding: spacing(1) 0;
  background-color: white;
  z-index: 1;
}
</style>

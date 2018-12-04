<template>
  <li class="friend">
    <h2 class="name">{{ friend.firstName }} {{ friend.lastName }}</h2>
    <div class="bday">
      <span class="m-r-1">🎉</span>
      {{ this.$dayjs(friend.birthDay).format('D MMM') }}
    </div>
    <div class="meta">
      <label>Budget:</label>
      {{ formatMoney(friend.giftBudget) }}
    </div>
  </li>
</template>

<script>
import formatMoney from "@/lib/formatMoney";

export default {
  name: "Friend",
  props: {
    friend: Object
  },
  methods: {
    formatMoney: function(val) {
      return formatMoney(val);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.friend {
  cursor: pointer;
  padding: spacing(2) spacing(3);
  margin-bottom: spacing(2);
  color: white;
  display: grid;
  grid-template-areas: "name bday" "meta meta";
  grid-template-columns: auto auto;
  grid-template-rows: auto auto;
  border-bottom: 1px solid darken($primary, 10%);

  &:hover {
    background-color: lighten($primary, 10%);
  }
}

.name {
  font-size: 1.2rem;
  grid-area: name;
}

.bday {
  grid-area: bday;
  justify-self: self-end;
  background-color: $secondary;
  color: white;
  display: inline-block;
  border-radius: 20px;
  padding: spacing(1) spacing(3);
  font-weight: 900;
}

.meta {
  grid-area: meta;
}
</style>

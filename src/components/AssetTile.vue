<template>
  <li class="asset" @click="goToAsset(asset.id)">
    <img :src="asset.images[0].file_name" v-if="asset.images[0]" class="asset-thumbnail">
    <div class="asset--description">{{ asset.title }}</div>
    <div class="asset--meta">
      <div>
        <label>Est. Value:</label>
        {{format(asset.shoot_price)}}
      </div>
      <div>
        <label>Matches ({{ contacts.length }})</label>
        <div class="matches">
          <img
            v-for="contact in contacts"
            :key="contact.id"
            :src="equipImg(contact.image)"
            class="match-thumbnail"
            v-tooltip.top="contact.first_name + ' ' + contact.last_name"
          >
        </div>
      </div>
      <div class="note">
        <span v-if="hasNote" v-tooltip.top="hasNote.note">
          <font-awesome-icon icon="sticky-note"/>
        </span>
      </div>
      <Button
        @click.native.stop="addToWatchlist"
        v-tooltip.top="'Add to Watchlist'"
        v-if="!isOnWatchlist"
      >
        <font-awesome-icon icon="eye"/>
      </Button>
      <span v-else>
        <font-awesome-icon icon="eye"/>
      </span>
    </div>
  </li>
</template>

<script>
import formatMoney from "@/lib/formatMoney";
import Button from "@/components/Button.vue";

export default {
  props: {
    asset: Object,
    contacts: Array
  },
  components: { Button },
  computed: {
    isOnWatchlist() {
      return this.$store.getters["accounts/isOnWatchlist"](this.asset.id);
    },
    hasNote() {
      return this.$store.getters["accounts/hasNote"](this.asset.id);
    }
  },
  methods: {
    format: function(amt) {
      return formatMoney(amt);
    },
    goToAsset: function(id) {
      this.$router.push({ name: "equipment", params: { equipmentid: id } });
    },
    equipImg(img) {
      return process.env.BASE_URL + "img/" + img;
    },
    addToWatchlist() {
      this.$store.dispatch("accounts/addToWatchlist", this.asset.id);
    }
  }
};
</script>

<style lang="scss" scoped>
.asset {
  @include preshadow(0);
  padding: spacing(3);
  border-bottom: 1px solid #f5f5f5;
  cursor: pointer;
  display: grid;
  grid-template-areas: "thumbnail description" "thumbnail price";
  grid-template-columns: auto 1fr;
  grid-template-rows: auto auto;
}

.asset-thumbnail {
  grid-area: thumbnail;
  height: 80px;
  width: 120px;
  display: block;
  object-fit: cover;
  margin-right: spacing(3);
}
.asset--description {
  grid-area: description;
  font-weight: 900;
  line-height: 1.1rem;
  margin-bottom: spacing(1);
}
.asset--meta {
  grid-area: price;
  display: grid;
  grid-template-columns: auto 1fr auto auto;

  & > div {
    margin-right: spacing(4);
  }

  button {
    align-self: center;
  }
}

.matches {
  display: flex;
}

.match-thumbnail {
  height: 30px;
  width: 30px;
  display: block;
  border-radius: 50%;
  object-fit: cover;
  margin-right: -10px;
  transition: margin 0.2s ease-in-out;

  &:hover {
    margin-right: 5px;

    &:not(:first-child) {
      margin-left: 15px;
    }
  }
}

.note {
  align-self: center;
  font-size: spacing(6);
  margin-right: spacing(4);
}
</style>

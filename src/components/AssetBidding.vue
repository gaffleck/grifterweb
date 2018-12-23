<template>
  <div class="selling-chart" :style="'--progress:'+ Math.floor(bidPrice / shootPrice * 100) + '%'">
    <div class="barchart">
      <div class="bar"></div>
    </div>
    <div class="bid">{{ format(shootPrice) }}</div>
    <div class="market">{{ format(bidPrice) }}</div>
    <div class="ratio">
      <div class="ratio--amt">{{ Math.floor(bidPrice / shootPrice * 100) }}%</div>
    </div>
  </div>
</template>

<script>
import formatMoney from "@/lib/formatMoney";

export default {
  name: "AssetBidding",
  props: {
    bidPrice: Number,
    shootPrice: Number
  },
  methods: {
    format: function(amt) {
      return formatMoney(amt);
    }
  }
};
</script>

<style lang="scss" scoped>
.selling-chart {
  display: grid;
  grid-template-areas: "ratio ratio" "bar bar" "market bid";
  grid-template-columns: 1fr auto;
  grid-template-areas: auto auto auto;
  --progress: 0;
}

.market {
  grid-area: market;
}

.bid {
  grid-area: bid;
}

.barchart,
.bar {
  height: spacing(4);
  border-radius: spacing(4);
  background-color: #f5f5f5;
}

.barchart {
  grid-area: bar;
  margin-top: 5px;
}

.bar {
  background-color: $primary;
  width: var(--progress);
}

.ratio {
  grid-area: bar;

  .ratio--amt {
    position: relative;
    left: var(--progress);
    transform: translateX(-50%);
    background-color: white;
    box-shadow: 2px 2px 2px 0 rgba(black, 0.5);
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-weight: 900;
  }
}
</style>


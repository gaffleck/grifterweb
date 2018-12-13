<template>
  <div class="month">
    <div class="month-inner">
      <h2>{{monthName}}</h2>
      <div class="week weeks-header">
        <div v-for="(day,index) in week" v-bind:key="index">{{day}}</div>
      </div>
      <div class="week" v-for="w in weeksInMonth" v-bind:key="w">
        <div class="day" v-for="d in 7" v-bind:key="d" :class="{'s-hide': !showDate(d,w)}">
          <div class="day-addEvent" v-on:click="triggerAddEvent(month,dayOfMonth(w,d))">
            <font-awesome-icon icon="plus"/>
          </div>
          <span class="date">{{ dayOfMonth(w,d) }}</span>
          <div class="events">
            <slot :name="dayOfMonth(w,d)"></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "month",
  components: {},
  props: {
    month: Number,
    addEvent: Function
  },
  created() {
    let thisYear = new Date().getFullYear();
    let firstDay = new Date(thisYear, this.month, 1);
    let lastDay = new Date(thisYear, this.month + 1, 0);
    this.monthName = firstDay.toLocaleString("en-us", {
      month: "long"
    });

    this.weeksInMonth = Math.ceil((firstDay.getDay() + lastDay.getDate()) / 7);
    this.startDay.dayOfWeek = firstDay.getDay();
    this.startDay.date = firstDay.getDate();
    this.lastDay.dayOfWeek = lastDay.getDay();
    this.lastDay.date = lastDay.getDate();
  },
  methods: {
    dayOfMonth: function(w, d) {
      return d + (w - 1) * 7 - this.startDay.dayOfWeek;
    },
    showDate: function(d, w) {
      if (
        d + (w - 1) * 7 <= this.startDay.dayOfWeek ||
        d + (w - 1) * 7 - this.startDay.dayOfWeek > this.lastDay.date
      )
        return false;
      return true;
    },
    triggerAddEvent: function(month, date) {
      let thisYear = new Date().getFullYear();
      let targetDate = new Date(thisYear, month, date);
      this.$emit("addingEvent", targetDate);
    }
  },
  data: function() {
    return {
      monthName: null,
      weeksInMonth: 0,
      startDay: {
        dayOfWeek: 0,
        date: 0
      },
      lastDay: {
        dayOfWeek: 0,
        date: 0
      },
      week: ["S", "M", "T", "W", "T", "F", "S"]
    };
  }
};
</script>

<style scoped lang="scss">
.month {
  margin-bottom: spacing(2);
  z-index: 1;
  @include preshadow;
}

.month-inner {
  background-color: white;
  padding: spacing(2) spacing(3);
}

.week {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}

.weeks-header {
  color: grey;
  text-align: center;
  border-bottom: none;
  font-size: 0.8rem;
  margin-bottom: spacing(4);
  margin-top: spacing(3);
}

.day {
  width: 100%;
  display: grid;
  grid-template-areas: "date" "events";
  grid-template-rows: auto 1fr;

  &.s-hide {
    pointer-events: none;
    opacity: 0;
  }

  &:before {
    content: "";
    display: block;
    width: 1px;
    height: 0;
    padding-bottom: 100%;
    grid-row: 1 / span 3;
    grid-column: 1 / 1;
  }

  .date {
    grid-area: date;
    justify-self: center;
    pointer-events: none;
    user-select: none;
  }

  .events {
    grid-area: events;
    text-align: center;
  }
}
.day-addEvent {
  grid-row: 1 / span 3;
  grid-column: 1 / 1;
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  color: $primary;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;

  .day:hover & {
    opacity: 1;
  }
}
</style>
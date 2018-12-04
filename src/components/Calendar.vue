<template>
  <div class="calendar">
    <div class="month" v-for="(month, m) in calendar" v-bind:key="month.monthName">
      <div class="month-inner">
        <h2>{{month.monthName}} ({{ birthdaysInMonth(m) }})</h2>
        <div class="week weeks-header">
          <div v-for="(day,index) in week" v-bind:key="index">{{day}}</div>
        </div>
        <div class="week" v-for="w in month.weeksInMonth" v-bind:key="w">
          <div class="day" v-for="d in 7" v-bind:key="d">
            <span class="date">{{ showDate(month,d,w) ? dayOfMonth(month,w,d) : ''}}</span>
            <div class="events">
              <div
                class="event"
                v-for="(friend,num) in hasEvent(m,dayOfMonth(month,w,d))"
                v-bind:key="num"
                v-on:click="loadFriend(friend)"
              >{{ initials(friend) }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "customer",
  components: {},
  props: {
    friends: Array,
    loadFriend: Function
  },
  mounted() {
    for (let i = 0; i < 12; i++) {
      let thisYear = new Date().getFullYear();
      let firstDay = new Date(thisYear, i, 1);
      let lastDay = new Date(thisYear, i + 1, 0);
      this.calendar.push({
        monthName: firstDay.toLocaleString("en-us", {
          month: "long"
        }),
        weeksInMonth: Math.ceil((firstDay.getDay() + lastDay.getDate()) / 7),
        startDay: {
          dayOfWeek: firstDay.getDay(),
          date: firstDay.getDate()
        },
        lastDay: {
          dayOfWeek: lastDay.getDay(),
          date: lastDay.getDate()
        }
      });
    }

    this.events = this.friends.map(friend => {
      return {
        month: new Date(friend.birthDay).getMonth(),
        day: new Date(friend.birthDay).getDay(),
        friend
      };
    });
  },
  methods: {
    showDate: function(month, d, w) {
      if (
        d + (w - 1) * 7 <= month.startDay.dayOfWeek ||
        d + (w - 1) * 7 - month.startDay.dayOfWeek > month.lastDay.date
      )
        return false;
      return true;
    },
    hasEvent: function(month, day) {
      let bdays = [];
      this.friends.forEach(function(friend) {
        let bdate = new Date(friend.birthDay);
        if (bdate.getMonth() === month && bdate.getDate() === day)
          bdays.push(friend);
      });

      return bdays.length > 0 ? bdays : "";
    },
    birthdaysInMonth: function(month) {
      return this.friends.reduce((accumulator, friend) => {
        let m = new Date(friend.birthDay).getMonth();
        accumulator += m === month ? 1 : 0;
        return accumulator;
      }, 0);
    },
    dayOfMonth: function(month, w, d) {
      return d + (w - 1) * 7 - month.startDay.dayOfWeek;
    },
    initials: function(friend) {
      return friend.firstName.charAt(0) + friend.lastName.charAt(0);
    }
  },
  data: function() {
    return {
      events: [],
      calendar: [],
      week: ["S", "M", "T", "W", "T", "F", "S"]
    };
  }
};
</script>

<style lang="scss" scoped>
.month {
  margin-bottom: spacing(2);
  z-index: 1;
  @include preshadow;
}

.month-inner {
  background-color: white;
  padding: spacing(2) spacing(3);
}

h2 {
  position: sticky;
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
  }
  .events {
    grid-area: events;
    text-align: center;
  }

  .event {
    background-color: $primary;
    color: white;
    font-weight: 900;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }
}
</style>

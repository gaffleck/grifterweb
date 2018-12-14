<template>
  <div class="calendar">
    <Month v-for="m in 12" v-bind:key="m" :month="m-1" v-on:addingEvent="addEvent">
      <div
        class="event"
        v-for="(event,i) in events[m-1]"
        :key="i"
        :slot="event.date"
        v-on:click="loadFriend(event.friend)"
      >{{initials(event.friend)}}</div>
    </Month>
  </div>
</template>

<script>
import Month from "@/components/Month";

export default {
  name: "calendar",
  components: {
    Month
  },
  props: {
    friends: Array,
    loadFriend: Function,
    addEvent: Function
  },
  created() {
    this.friends.forEach(friend => {
      let month = new Date(friend.birthDay).getMonth();
      if (!this.events[month]) this.events[month] = [];
      this.events[month].push({
        date: new Date(friend.birthDay).getDate(),
        friend
      });
    });
  },
  methods: {
    birthdaysInMonth: function(month) {
      return this.friends.reduce((accumulator, friend) => {
        let m = new Date(friend.birthDay).getMonth();
        accumulator += m === month ? 1 : 0;
        return accumulator;
      }, 0);
    },
    initials: function(friend) {
      return friend.firstName.charAt(0) + friend.lastName.charAt(0);
    }
  },
  data: function() {
    return {
      events: []
    };
  }
};
</script>

<style lang="scss" scoped>
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
  user-select: none;
  cursor: pointer;
}
</style>

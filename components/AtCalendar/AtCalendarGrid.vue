<template>
  <div class="at-calendar-grid">
    <at-calendar-grid-item
      v-for="(item, index) in transformedSource"
      :key="index"
      :enabled="item.times.length > 0"
    >
      <template #header>
        <div>{{ headers[index] }}</div>
        <div>{{ item.dateDay }}</div>
      </template>
      <template #default>
        <at-calendar-reservations :source="item.times" />
      </template>
    </at-calendar-grid-item>
  </div>
</template>

<script>
import {
  getFirstDateOfTheWeek,
  getDatesWithinTheWeek,
  isSameDate,
  padLeft,
  addDateHours,
  getDateObj,
} from "@/assets/js/utils";

export default {
  props: {
    fromDate: {
      type: String,
      default() {
        return getFirstDateOfTheWeek();
      },
    },
    source: {
      type: Array,
      default() {
        return [];
      },
    },
    headers: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  computed: {
    tzGmt() {
      return this.$store.getters["timezone/tzGmt"];
    },
    datesWithinTheWeek() {
      return getDatesWithinTheWeek(this.fromDate);
    },
    transformedSource() {
      const getDateDay = (isoDate) => {
        const dateObj = getDateObj(isoDate);
        const dateDay = dateObj.getDate();
        return padLeft(dateDay, 2, "0");
      };
      return this.datesWithinTheWeek.map((isoDate) => ({
        dateDay: getDateDay(isoDate),
        times: this.source
          .map((item) => {
            const tzDate = addDateHours(item.isoDate, this.tzGmt);
            return { ...item, tzDate };
          })
          .filter((item) => isSameDate(isoDate, item.tzDate)),
      }));
    },
  },
};
</script>

<style scoped>
.at-calendar-grid {
  margin: 15px 0px;
  display: grid;
  column-gap: 10px;
  grid-template-columns: repeat(7, 1fr);
}
</style>

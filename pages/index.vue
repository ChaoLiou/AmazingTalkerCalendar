<template>
  <div class="index">
    <div class="toolbar">
      <at-locale-switch />
      <at-timezone-switch />
    </div>
    <at-calendar
      :source="calendarSource"
      :default-date="calendarDefaultDate"
      @change-date="loadSource"
    />
  </div>
</template>

<script>
import {
  addDateHours,
  getDateObj,
  getFirstDateOfTheWeek,
} from "@/assets/js/utils";

export default {
  data() {
    return {
      calendarSource: undefined,
      calendarDefaultDate: getFirstDateOfTheWeek(),
    };
  },
  computed: {
    tzGmt() {
      return this.$store.getters["timezone/tzGmt"];
    },
  },
  async mounted() {
    await this.loadSource(this.calendarDefaultDate);
  },
  methods: {
    async loadSource(isoDate) {
      this.calendarSource = { available: [], booked: [] };
      const isoDateAddedHours = addDateHours(isoDate, -this.tzGmt);
      const startedAt = encodeURIComponent(isoDateAddedHours);
      this.calendarSource = await this.$axios.$get(
        `/api?started_at=${startedAt}`
      );
    },
  },
};
</script>

<style scoped>
.index {
  margin: 16px;
}
.toolbar {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 12px 0px;
}
@media screen and (max-width: 700px) {
  .toolbar {
    display: grid;
    row-gap: 8px;
  }
  .toolbar > .at-locale-switch {
    display: grid;
    grid-template-rows: repeat(3, 1fr);
  }
}
</style>

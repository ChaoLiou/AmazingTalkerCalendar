<template>
  <div class="at-calendar">
    <div class="at-calendar__toolbar">
      <at-calendar-pagination
        :from-date="isoDate"
        @go-prev="changeDate(goPrevIncrement)"
        @go-next="changeDate(goNextIncrement)"
      />
      <div class="at-calendar__timezone-message">
        {{ timezoneMessage }}
      </div>
    </div>
    <at-calendar-grid
      :source="sortedSource"
      :from-date="isoDate"
      :headers="headers"
    />
  </div>
</template>

<script>
import {
  getFirstDateOfTheWeek,
  getDatesInEveryHalfHourBetweenTwoDates,
  getDateObj,
  addDates,
} from "@/assets/js/utils";

export default {
  props: {
    defaultDate: {
      type: String,
      default() {
        return getDateObj().toISOString();
      },
    },
    source: {
      type: Object,
      default() {
        return {
          available: [],
          booked: [],
        };
      },
    },
  },
  data() {
    return {
      isoDate: undefined,
      goPrevIncrement: -7,
      goNextIncrement: 7,
      headerKeys: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    };
  },
  computed: {
    timezoneMessage() {
      const tzNameInLocale = this.$t(`timezone.${this.tzName}`);
      const messageTemplate = this.$t("timezone.message-template");
      return messageTemplate.replace("{0}", tzNameInLocale);
    },
    tzName() {
      return this.$store.getters["timezone/tzName"];
    },
    headers() {
      return this.headerKeys.map((item) => this.$t(`week.${item}`));
    },
    defaultFromDate() {
      return getFirstDateOfTheWeek(this.defaultDate);
    },
    availableSource() {
      return this.source.available.map((item) => ({
        ...item,
        booked: false,
      }));
    },
    bookedSource() {
      return this.source.booked.map((item) => ({
        ...item,
        booked: true,
      }));
    },
    transformedSource() {
      return this.availableSource
        .concat(this.bookedSource)
        .map((item) =>
          getDatesInEveryHalfHourBetweenTwoDates(
            item.start,
            item.end
          ).map((isoDate) => ({ ...item, isoDate }))
        )
        .flat();
    },
    sortedSource() {
      const comparePredicate = (prev, next) => {
        const prevDateObj = new Date(prev.isoDate);
        const nextDateObj = new Date(next.isoDate);
        return prevDateObj.getTime() - nextDateObj.getTime();
      };
      return this.transformedSource.sort(comparePredicate);
    },
  },
  methods: {
    changeDate(dateDayIncrement) {
      this.isoDate = addDates(this.isoDate, dateDayIncrement);
      this.$emit("change-date", this.isoDate);
    },
  },
  watch: {
    defaultFromDate: {
      immediate: true,
      handler(value) {
        if (value) {
          this.isoDate = value;
        }
      },
    },
  },
};
</script>

<style scoped>
.at-calendar__toolbar {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}
.at-calendar__timezone-message {
  align-self: center;
  justify-self: end;
  font-size: 12px;
}
@media screen and (max-width: 700px) {
  .at-calendar__toolbar {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(2, 1fr);
  }
}
</style>

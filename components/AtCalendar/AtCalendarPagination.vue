<template>
  <div class="at-calendar-pagination">
    <div class="at-calendar-pagination__controls controls-group">
      <div
        class="controls-group__item controls-group__item_prev"
        :class="{ 'controls_group__item_not-allowed': isCurrentWeek }"
        @mouseenter="ctrlPrevHovered = true"
        @mouseleave="ctrlPrevHovered = false"
        @click="goPrev"
      >
        <at-arrow-icon to-left :color="prevArrowIconColor" />
      </div>
      <div
        class="controls-group__item controls-group__item_next"
        @mouseenter="ctrlNextHovered = true"
        @mouseleave="ctrlNextHovered = false"
        @click="goNext"
      >
        <at-arrow-icon :color="nextArrowIconColor" />
      </div>
    </div>
    <div class="at-calendar-pagination__page-info">
      {{ formattedFromDate }} - {{ endDateDay }}
    </div>
  </div>
</template>

<script>
import {
  getFirstDateOfTheWeek,
  isSameDate,
  formatDateString,
  padLeft,
  getDateObj,
  addDates,
} from "@/assets/js/utils";

export default {
  props: {
    fromDate: {
      type: String,
      default() {
        return getFirstDateOfTheWeek();
      },
    },
  },
  data() {
    return {
      ctrlPrevHovered: false,
      ctrlNextHovered: false,
      highlightColor: "#02cab9",
      disabledColor: "#c0c4cc",
    };
  },
  computed: {
    endDateDay() {
      const endDate = addDates(this.fromDate, 7);
      const endDateObj = getDateObj(endDate);
      const endDateDay = endDateObj.getDate();
      return padLeft(endDateDay, 2);
    },
    formattedFromDate() {
      return formatDateString(this.fromDate);
    },
    isCurrentWeek() {
      const firstDateOfTheWeek = getFirstDateOfTheWeek();
      return isSameDate(this.fromDate, firstDateOfTheWeek);
    },
    prevArrowIconColor() {
      if (this.isCurrentWeek) {
        return this.disabledColor;
      } else if (this.ctrlPrevHovered) {
        return this.highlightColor;
      }
    },
    nextArrowIconColor() {
      return this.ctrlNextHovered ? this.highlightColor : undefined;
    },
  },
  methods: {
    goPrev() {
      if (!this.isCurrentWeek) {
        this.$emit("go-prev");
      }
    },
    goNext() {
      this.$emit("go-next");
    },
  },
};
</script>

<style scoped>
.at-calendar-pagination {
  display: flex;
  flex-direction: row;
}
.controls-group {
  display: flex;
  flex-direction: row;
}
.controls-group__item {
  padding: 4px 12px;
  border-width: 1px;
  border-color: #dcdfe6;
  border-style: solid;
  width: fit-content;
  height: 28px;
  user-select: none;
}
.controls-group__item:first-child:not(:hover) {
  border-right-style: none;
}
.controls-group__item:first-child:hover ~ .controls-group__item {
  border-left-style: none;
}
.controls-group__item_prev {
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
}
.controls-group__item_next {
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
}
.controls-group__item_prev:hover:not(.controls_group__item_not-allowed),
.controls-group__item_next:hover {
  cursor: pointer;
  color: #02cab9;
  border-color: rgba(2, 202, 185, 0.95);
}
.controls_group__item_not-allowed:hover {
  cursor: not-allowed;
  background-color: #fff;
  border-color: #ebeef5;
  color: #c0c4cc;
}
.at-calendar-pagination__page-info {
  padding-left: 15px;
}
</style>

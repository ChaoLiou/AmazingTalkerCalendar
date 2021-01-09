<template>
  <div class="at-calendar-pagination">
    <div class="at-calendar-pagination__controls controls-group">
      <div
        class="controls-group__item controls-group__item_prev"
        :class="{ 'controls_group__item_not-allowed': isCurrentWeek }"
        @mouseenter="ctrlPrevHovered = true"
        @mouseleave="ctrlPrevHovered = false"
        @click="$emit('prev')"
      >
        <at-arrow-icon to-left :color="prevArrowIconColor" />
      </div>
      <div
        class="controls-group__item controls-group__item_next"
        @mouseenter="ctrlNextHovered = true"
        @mouseleave="ctrlNextHovered = false"
        @click="$emit('next')"
      >
        <at-arrow-icon :color="nextArrowIconColor" />
      </div>
    </div>
    <div></div>
  </div>
</template>

<script>
import { getFirstDateOfTheWeek, isSameDate } from "@/assets/js/utils";

export default {
  props: {
    dateFrom: {
      type: Date,
      default() {
        return getFirstDateOfTheWeek();
      },
    },
  },
  data() {
    return {
      ctrlPrevHovered: false,
      ctrlNextHovered: false,
    };
  },
  computed: {
    isCurrentWeek() {
      const firstDateOfTheWeek = getFirstDateOfTheWeek();
      return isSameDate(this.dateFrom, firstDateOfTheWeek);
    },
    prevArrowIconColor() {
      return this.ctrlPrevHovered && !this.isCurrentWeek
        ? "#02cab9"
        : undefined;
    },
    nextArrowIconColor() {
      return this.ctrlNextHovered ? "#02cab9" : undefined;
    },
  },
};
</script>

<style scoped>
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
}
</style>

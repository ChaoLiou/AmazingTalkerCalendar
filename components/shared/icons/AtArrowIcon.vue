<template>
  <svg
    class="at-arrow-icon"
    :style="{ transform: `rotate(${rotateDegree}deg)` }"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    :fill="color"
    :width="size"
    :height="size"
  >
    <path d="M0 0h24v24H0V0z" fill="none" />
    <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
  </svg>
</template>

<script>
export default {
  props: {
    size: {
      type: String,
      default: "18px",
    },
    color: {
      type: String,
      default: "#dcdfe6",
    },
    toLeft: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    rotateDegree() {
      if (this.toLeft) {
        return 180;
      }
    },
  },
};
</script>

<style>
</style>

<template>
  <div
    class="at-calendar-grid-item"
    :class="{ 'at-calendar-grid-item_enabled': enabled }"
  >
    <div class="at-calendar-grid-item__header">
      <slot name="header"></slot>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    enabled: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style scoped>
.at-calendar-grid-item {
  border-top: 4px solid #d2d2d2;
}
.at-calendar-grid-item_enabled {
  border-top-color: #02cab9;
}
.at-calendar-grid-item__header {
  text-align: center;
  margin: 10px 0px;
}
</style>

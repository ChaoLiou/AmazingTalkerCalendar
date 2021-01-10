<template>
  <div class="at-calendar-reservation-list">
    <div
      class="at-calendar-reservation-list__item"
      :class="{ 'at-calendar-reservation-list__item_booked': item.booked }"
      v-for="(item, index) in formattedSource"
      :key="index"
    >
      {{ item.time }}
    </div>
  </div>
</template>

<script>
import { parseDateTime } from "@/assets/js/utils";

export default {
  props: {
    source: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  computed: {
    formattedSource() {
      return this.source.map((item) => ({
        ...item,
        time: parseDateTime(item.tzDate),
      }));
    },
  },
};
</script>

<style scoped>
.at-calendar-reservation-list__item {
  color: #02cab9;
  font-weight: 700;
  text-align: center;
  padding: 3px 0;
  font-size: 0.75rem;
}
.at-calendar-reservation-list__item_booked {
  border: 1px solid transparent;
  color: #b6b6b6;
}
</style>

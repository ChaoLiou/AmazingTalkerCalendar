<template>
  <div class="at-timezone-switch">
    <select v-model="tzGmt" @change="updateTzGmt">
      <option v-for="(item, index) in timezones" :key="index" :value="item.gmt">
        {{ $t(`timezone.${item.name}`) }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tzGmt: undefined,
    };
  },
  computed: {
    timezones() {
      return this.$store.getters["timezone/list"];
    },
  },
  mounted() {
    this.tzGmt = this.$store.getters["timezone/tzGmt"];
  },
  methods: {
    updateTzGmt() {
      this.$store.dispatch("timezone/updateTzGmt", this.tzGmt);
    },
  },
};
</script>

<style>
</style>

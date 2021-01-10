<template>
  <div class="at-locale-switch">
    <nuxt-link
      class="at-locale-switch__item"
      :class="{
        'at-locale-switch__item_disabled': item === $i18n.locale,
      }"
      v-for="(item, index) in $i18n.locales"
      :key="index"
      :to="switchLocalePath(item)"
    >
      <div>{{ $t(`locale.${item}`) }}</div>
    </nuxt-link>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.at-locale-switch {
  display: flex;
  flex-direction: row;
}
.at-locale-switch__item {
  margin-right: 12px;
}
.at-locale-switch__item_disabled {
  text-decoration: none;
  color: black;
  cursor: inherit;
}
</style>

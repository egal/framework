<template>
  <div class="mobile-table">
    <template v-for="(item, index) in items" :key="index">
      <div class="mobile-table__card">
        <header class="mobile-table__header" v-if="isHeader"></header>
        <div
          :class="['mobile-table__row', { 'no-header': !isHeader }, { 'with-header': isHeader }]"
          v-for="(key, columnIndex) in regularHeaders"
          :key="`${index}-${key.name}`"
        >
          <div v-if="isHeader" class="row-item">
            <p class="row-header">{{ key.label }}</p>

            <template v-if="key.format">{{ key.format(item[key.name]) }}</template>
            <template v-else>{{ item[key.name] }}</template>
          </div>
          <div v-else>
            <template v-if="key.format">{{ key.format(item[key.name]) }}</template>
            <template v-else>{{ item[key.name] }}</template>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MobileTable',
  components: {},
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    isHeader: {
      type: Boolean,
      default: true,
    },

    headers: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {}
  },
  computed: {
    regularHeaders() {
      return this.headers.filter((header) => typeof header !== 'string')
    },
  },
  mounted() {},
  beforeDestroy() {},
  methods: {},
  watch: {},
})
</script>

<style scoped lang="scss">
@import 'src/assets/variables';

.mobile-table {
  font-family: var(--font-family);
  font-size: var(--font-size);
  line-height: 120%;

  &__card {
    display: flex;
    flex-direction: column;
    background: var(--row-bg);
    border: 1px solid $gray-300;
    border-radius: 8px;
    margin-bottom: 20px;
    padding: 16px;
    &:last-child {
      margin-bottom: 10px;
    }
  }

  &__header {
    font-weight: 700;
    font-size: calc(var(--font-size) + 2px);
    color: var(--font-color);
  }
  &__row {
    font-weight: 400;
    font-size: 14px;
    color: var(--font-color);
    margin-bottom: 16px;

    &:last-child {
      margin-bottom: 0;
    }

    .row-header {
      font-weight: 400;
      color: $gray-500;
      margin: 0;
    }

    &.no-header {
      &:first-child {
        font-weight: 700;
        font-size: calc(var(--font-size) + 2px);
        color: var(--font-color);
      }
    }
  }
}

.row-item {
  display: flex;
  align-items: center;
  gap: 12px;
}
</style>

<template>
  <div class="loader" :class="[`loader--${mergedData.size}`]" :style="getVars">
    <div class="loader-dot"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ELoader',
  components: {},
  props: {
    data: {
      type: Object,
      default: () => {},
    },
    styleConfig: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {}
  },
  computed: {
    mergedData() {
      return Object.assign(
        {
          size: 'md',
        },
        this.data,
      )
    },
    getVars() {
      return {
        '--color': this.styleConfig?.color || '#0078D2',
      }
    },
  },
  mounted() {},
  beforeDestroy() {},
  methods: {},
  watch: {},
})
</script>

<style scoped lang="scss">
.loader {
  position: relative;
  top: 50%;
  left: 50%;
  width: 100%;
  height: calc(100% - var(--loader-size));
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);

  &--md {
    --loader-size: 8px;
  }
  &--sm {
    --loader-size: 4px;
  }

  &-dot,
  &::before,
  &::after {
    position: absolute;
    top: calc(50% - (var(--loader-size) * 0.5));
    width: var(--loader-size);
    height: var(--loader-size);
    background: var(--color);
    border-radius: 50%;
  }

  &-dot {
    left: calc(50% - (var(--loader-size) * 0.5));
    -webkit-animation: loader 1s -0.18s ease infinite;
    animation: loader 1s -0.18s ease infinite;
  }

  &::before {
    content: '';
    left: calc(50% - (var(--loader-size) * 2.5));
    -webkit-animation: loader 1s ease infinite;
    animation: loader 1s ease infinite;
  }

  &::after {
    content: '';
    left: calc(50% + (var(--loader-size) * 1.5));
    -webkit-animation: loader 1s -0.36s ease infinite;
    animation: loader 1s -0.36s ease infinite;
  }
}

@keyframes loader {
  50% {
    -webkit-transform: scale(1.5);
    transform: scale(1.5);
  }
}
</style>

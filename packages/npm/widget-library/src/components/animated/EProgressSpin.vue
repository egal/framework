<template>
  <div class="progress-spin" :class="[`progress-spin--${mergedData.size}`]" :style="getVars">
    <svg
      class="progress-spin__svg"
      :class="{ spinner: mergedData.isLoader }"
      :width="mergedData.size === 'sm' ? 12 : 20"
      :height="mergedData.size === 'sm' ? 12 : 20"
      viewBox="0 0 20 20"
    >
      <circle
        class="progress-spin__circle"
        cx="10"
        cy="10"
        r="9"
        stroke-width="2"
        :stroke-dasharray="dashArray"
        :stroke-dashoffset="getDashOffset"
      ></circle>
    </svg>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'EProgressSpin',
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
    return { dashArray: 56.548667764616276 }
  },
  computed: {
    mergedData() {
      return Object.assign(
        {
          size: 'md',
          total: 100,
          value: 0,
          isLoader: false,
        },
        this.data,
      )
    },
    getVars() {
      return {
        '--color': this.styleConfig?.color || '#00395C',
      }
    },
    getDashOffset() {
      return this.dashArray - (this.mergedData.value / this.mergedData.total) * this.dashArray
    },
  },
  mounted() {},
  beforeDestroy() {},
  methods: {},
  watch: {},
})
</script>

<style scoped lang="scss">
.progress-spin {
  &__svg {
    color: var(--color);
    stroke: currentColor;
    -webkit-transform: rotate(-90deg);
    transform: rotate(-90deg);
    fill: none;

    &.spinner {
      animation: ProgressSpin-Animate 1.2s linear infinite;
    }
  }
  &__circle {
    -webkit-transition: 0.3s linear;
    transition: 0.3s linear;
  }
}

@keyframes ProgressSpin-Animate {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>

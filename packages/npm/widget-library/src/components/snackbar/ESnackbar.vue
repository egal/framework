<template>
  <div
    class="snackbar"
    id="snackbar"
    :style="getStyleVars"
    :class="[`${mergedData.open ? 'snackbar--open' : 'snackbar--close'}`]"
  >
    <div class="snackbar__countdown" v-if="mergedData.showTimer">
      <svg width="33px" height="33px" viewBox="0 0 42 42" class="donut">
        <circle
          id="c2"
          cx="21"
          cy="21"
          r="15.91549430918954"
          stroke-dasharray="100 0"
          stroke-dashoffset="25"
        ></circle>
        <g class="chart-text">
          <text
            x="50%"
            y="52%"
            dominant-baseline="middle"
            text-anchor="middle"
            id="counterText"
          ></text>
        </g>
      </svg>
    </div>

    <div class="snackbar__icon" v-else-if="mergedData.icon">
      <BootstrapIcon :icon="mergedData.icon" />
    </div>

    <div class="snackbar__content">
      <div class="snackbar__title" v-if="mergedData.header">{{ mergedData.header }}</div>
      <div class="snackbar__body">
        {{ mergedData.text }}
      </div>
      <div class="snackbar__footer">
        <slot name="footer" />
      </div>
    </div>

    <div class="snackbar__close" v-if="mergedData.closeIcon" @click="$emit('close', '')">
      <BootstrapIcon icon="x-lg" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { defineComponent } from 'vue'
import BootstrapIcon from '@dvuckovic/vue3-bootstrap-icons'

export default defineComponent({
  name: 'ESnackbar',
  components: { BootstrapIcon },
  emits: ['close'],
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
          position: {
            left: '',
            right: '10px',
            top: '',
            bottom: '30px',
          },
          header: '',
          text: '',
          icon: '',
          closeIcon: false,
          type: '',
          open: false,
          delay: 0,
          showTimer: false,
        },
        this.data,
      )
    },

    // пределение цвета border в зависимости от типа
    getBorderColor() {
      switch (this.mergedData.type.toLowerCase()) {
        case 'clear':
          return 'transparent'
        case 'warning':
          return '#FFD363'
        case 'danger':
          return '#F16063'
        case 'info':
          return '#3385FF'
        case 'success':
          return '#66CB9F'
        default:
          return '#2D3748'
      }
    },
    getStyleVars() {
      let positions = !Object.keys(this.mergedData.position).length
        ? { bottom: '30px', right: '10px' }
        : this.mergedData.position

      const borderColor = this.styleConfig?.borderColor || this.getBorderColor

      return {
        '--padding': this.styleConfig?.padding || `16px`,
        '--font-family': this.styleConfig?.fontFamily || `Inter`,
        '--font-size': this.styleConfig?.fontSize || `14px`,
        '--header-color': this.styleConfig?.headerColor || `#A0AEC0`,
        '--text-color': this.styleConfig?.textColor || `#A0AEC0`,
        '--border-color': borderColor,
        '--icon-color': this.styleConfig?.iconColor || '#718096',
        '--width': this.styleConfig?.width || '325px',
        ...positions,
      }
    },
  },
  mounted() {},
  beforeDestroy() {
    clearInterval()
  },
  methods: {},
  watch: {
    'mergedData.open'() {
      if (this.mergedData.delay && this.mergedData.open) {
        const snackbar = document.getElementById('snackbar')
        const circle = document.getElementById('c2')
        const counterText = document.getElementById('counterText')

        const duration = this.mergedData.delay / 1000

        const timeout = setTimeout(() => {
          const time = duration
          let i = 1
          let dashLength = (i / duration) * 100
          let dashGap = 100 - dashLength
          i++

          if (this.mergedData.showTimer) {
            // @ts-ignore
            circle.style.strokeDasharray = [dashGap, dashLength]
            // @ts-ignore
            counterText.innerHTML = duration
          }

          const interval = setInterval(() => {
            // если время вышло:
            if (i > time) {
              // @ts-ignore
              snackbar.className = snackbar.className.replace('snackbar--open', 'snackbar--close')
              if (this.mergedData.showTimer) {
                // @ts-ignore
                circle.style.strokeDasharray = [100, 0]
              }

              this.$emit('close', 'timer')

              clearInterval(interval)
              clearTimeout(timeout)
              return
            }

            dashLength = (i / duration) * 100
            dashGap = 100 - dashLength

            if (this.mergedData.showTimer) {
              // @ts-ignore
              circle.style.strokeDasharray = [dashGap, dashLength]
              // @ts-ignore
              counterText.innerHTML = duration + 1 - i
            }
            i++
          }, 1000)
        }, 0)
      }
    },
  },
})
</script>

<style scoped lang="scss">
@import '@/assets/variables.scss';

.snackbar {
  position: absolute;
  background: white;
  box-shadow: 0px 0px 1px rgba(12, 26, 75, 0.1), 0px 10px 16px rgba(20, 37, 63, 0.06);
  border-radius: 8px;
  padding: 16px;
  font-family: var(--font-family);
  z-index: 5;
  width: var(--width);
  margin-left: calc(var(--width) / 2 * -1);
  font-size: var(--font-size);
  line-height: 120%;
  font-weight: 400;
  font-style: normal;
  display: flex;

  &::before {
    content: '';
    width: 8px;
    background: var(--border-color);
    border-radius: 8px 0 0 8px;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
  }

  &--close {
    visibility: hidden;
    -webkit-animation: fadeout 0.5s;
    animation: fadeout 0.5s;

    .dashboard {
      display: none;
    }

    #c2 {
      display: none;
    }
  }

  &--open {
    visibility: visible;
    -webkit-animation: fadein 0.5s;
    animation: fadein 0.5s;

    .dashboard {
      display: flex;
    }

    #c2 {
      display: flex;
    }
  }

  &--lg {
  }

  &--md {
  }

  &--sm {
  }

  &--xs {
  }

  &__icon {
    .bi {
      width: 24px;
      height: 24px;
      color: var(--icon-color);
    }

    margin-right: 12px;
  }

  &__content {
    display: flex;
    flex-direction: column;
  }

  &__title {
    padding-bottom: 4px;
    font-weight: 700;
  }

  &__body {
  }

  &__footer {
  }

  &__close {
    cursor: pointer;
    width: 20px;
    height: 20px;

    .bi {
      stroke: #2d3748;
      width: 12px;
      height: 12px;
    }
  }

  &__countdown {
    width: 30px;
    height: 30px;
  }
}

/* Animations to fade the snackbar in and out */
@-webkit-keyframes fadein {
  from {
    bottom: 0;
    opacity: 0;
  }
  to {
    bottom: 30px;
    opacity: 1;
  }
}

@keyframes fadein {
  from {
    bottom: 0;
    opacity: 0;
  }
  to {
    bottom: 30px;
    opacity: 1;
  }
}

@-webkit-keyframes fadeout {
  from {
    bottom: 30px;
    opacity: 1;
  }
  to {
    bottom: 0;
    opacity: 0;
  }
}

@keyframes fadeout {
  from {
    bottom: 30px;
    opacity: 1;
  }
  to {
    bottom: 0;
    opacity: 0;
  }
}

.snackbar__countdown {
  margin-right: 12px;

  circle {
    transition: all 1s linear;
  }

  #c2 {
    transition: all 1s linear;
    stroke: var(--icon-color);
    stroke-width: 3;
    stroke-linecap: round;
    fill: transparent;
  }

  #counterText {
    font-weight: 500;
    font-size: 16px;
    color: $gray-800;
  }
}
</style>

<template>
  <div class="stepper-wrapper" :style="getStyleVars" :class="{ vertical: mergedData.vertical }">
    <div
      class="stepper-item"
      :class="[
        {
          completed: mergedData.activeStep > index,
          active: mergedData.activeStep === index,
        },
        `stepper-item--${mergedData.size}`,
      ]"
      v-for="index in mergedData.totalSteps"
      :key="index"
    >
      <div class="step-counter" v-if="mergedData.withNumber">{{ index }}</div>
      <div class="step-counter" v-else-if="mergedData.withIcon">
        <BootstrapIcon :icon="mergedData.icon" />
      </div>
      <!--      <div class="step-counter" v-else-if="mergedData.withLoading">{{ index }}</div>-->
      <div class="step-counter" v-else></div>
      <div class="step-name">
        {{ mergedData.stepTitles.length === 0 ? `Шаг ${index}` : mergedData.stepTitles[index - 1] }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BootstrapIcon from '@dvuckovic/vue3-bootstrap-icons'

export default defineComponent({
  name: 'EProgressStep',
  components: { BootstrapIcon },
  emits: ['complete'],
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
    return {
      isCompleted: false,
    }
  },
  computed: {
    mergedData() {
      return Object.assign(
        {
          totalSteps: 5,
          stepTitles: [],
          icon: '',
          vertical: false,
          activeStep: 1,
          size: 'md',
          withNumber: false,
          withIcon: false,
          // withLoading: false,
        },
        this.data,
      )
    },
    getStyleVars() {
      return {
        '--font-family': this.styleConfig?.fontFamily || `Inter`,
        '--active-color': this.styleConfig?.activeColor || `#0066FF`,
        '--color': this.styleConfig?.color || '#E2E8F0',
        '--icon-color': this.styleConfig?.iconColor || `#2D3748`,
        '--icon-active-color': this.styleConfig?.iconActiveColor || `#fff`,
      }
    },
  },
  async mounted() {},
  methods: {},
  watch: {
    'mergedData.activeStep'(val) {
      console.log(val)
      if (val === this.mergedData.totalSteps + 1) {
        this.$emit('complete')
      }
    },
  },
})
</script>

<style scoped lang="scss">
@import '@/assets/variables.scss';

.bi {
  margin-bottom: 0;
}
.stepper-wrapper {
  font-family: var(--font-family);
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;

  &.vertical {
    flex-direction: column;
    height: 100%;
    width: fit-content;
  }
}

.stepper-item {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;

  @media (max-width: 768px) {
    font-size: 12px;
  }

  &::before,
  &::after {
    position: absolute;
    content: '';
    border-bottom: 6px solid var(--color);
    width: 100%;
    left: -50%;
    z-index: 1;
    transition: all 0.3s ease;
  }

  &:first-child {
    &::after {
      left: 50%;
    }
  }
  .step-counter {
    position: relative;
    z-index: 3;
    display: flex;
    justify-content: center;
    align-items: center;

    border-radius: 50%;
    background: var(--color);
    margin-bottom: 6px;
    font-weight: 700;
    line-height: 130%;
  }
  .step-name {
    font-weight: 400;
  }

  &--xs {
    .step-counter {
      width: 8px;
      height: 8px;
      font-size: 0;
    }
    &::before,
    &::after {
      top: 10%;
      border-width: 2px;
    }

    .bi {
      width: 0;
      height: 0;
    }
  }

  &--sm {
    .step-counter {
      width: 16px;
      height: 16px;
      font-size: 12px;
    }
    &::before,
    &::after {
      top: 15%;
      border-width: 4px;
    }

    .bi {
      width: 10px;
      height: 10px;
    }
  }

  &--md {
    .step-counter {
      width: 24px;
      height: 24px;

      font-size: 14px;
    }
    &::before,
    &::after {
      top: 20%;
      border-width: 6px;
    }

    .bi {
      width: 14px;
      height: 14px;
    }
  }

  &--lg {
    .step-counter {
      width: 32px;
      height: 32px;
      font-size: 16px;
    }
    &::before,
    &::after {
      top: 20%;
      border-width: 8px;
    }

    .bi {
      width: 18px;
      height: 18px;
    }
  }

  &:first-child::before {
    content: none;
  }
  &:last-child::after {
    content: none;
  }
}

/* Vertical styles */
.vertical {
  .stepper-item {
    flex-direction: row;
    height: 100px;
    gap: 8px;

    .step-name {
      margin-bottom: 5px;
    }

    &::before,
    &::after {
      height: 95%;
      top: 50%;
      background-color: var(--color);
    }

    &:last-child {
      &::before {
        height: 0;
        width: 0;
      }
    }

    &--xs {
      &::before,
      &::after {
        height: 125%;
        top: 50%;
        left: 5%;
        width: 2px;
      }
    }
    &--sm {
      &::before,
      &::after {
        top: 50%;
        left: 9%;
        width: 4px;
      }
    }
    &--md {
      &::before,
      &::after {
        left: 12%;
        width: 6px;
      }
    }
    &--lg {
      &::before,
      &::after {
        left: 14%;
        width: 8px;
      }
    }
  }
}

.stepper-item {
  &.completed {
    .step-counter {
      background-color: var(--active-color);
      color: var(--icon-active-color);
    }
    &::after {
      background-color: var(--active-color);
    }
  }
}
</style>

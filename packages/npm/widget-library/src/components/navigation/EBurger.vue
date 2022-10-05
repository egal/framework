<template>
  <div class="burger-menu" :style="getStyleVars">
    <input id="menu__toggle" type="checkbox" v-model="isOpen" />
    <label
      class="menu__btn"
      for="menu__toggle"
      :style="{ position: isOpen ? 'fixed' : 'absolute' }"
    >
      <span></span>
    </label>

    <div class="overlay">
      <div
        class="menu__box"
        :class="[mergedData.isVertical ? '--top-to-bottom' : '--right-to-left']"
      >
        {{ elementHeight }}

        <slot>slot</slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'EBurger',
  components: {},
  emits: ['select'],
  props: {
    data: {
      type: Object,
      default: () => {},
    },
    styleConfig: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  data() {
    return {
      isOpen: false,
      elementHeight: 0,
    }
  },
  computed: {
    mergedData() {
      return Object.assign(
        {
          open: false,
          element: '',
          isVertical: true,
        },
        this.data,
      )
    },
    getStyleVars() {
      return {
        '--bg-color': this.styleConfig?.background || '#edf2f7',
        '--bg-hover-color': this.styleConfig?.backgroundHover || '#e2e8f0',
        '--dash-color': this.styleConfig?.dashColor || '#2d3748',
        '--font-family': this.styleConfig?.fontFamily || 'Inter',
        '--overlay-bg': this.styleConfig?.overlayBackground || '#fff',
      }
    },
    getOffset() {
      if (this.mergedData.element) {
        // @ts-ignore
        const x = document.getElementsByClassName(this.mergedData.element)[0]

        // @ts-ignore
        document.getElementsByClassName('menu__box')[0].style.top = x.offsetHeight + 'px'

        return x
      } else {
        // @ts-ignore
        document.getElementsByClassName('menu__box')[0].style.top = '0'
        return 0
      }
    },
  },
  mounted() {
    const y = this.getOffset
  },
  beforeDestroy() {},
  methods: {
    closeBurger() {
      const menuToggler = document.getElementById('menu__toggle')
      menuToggler?.click()
    },
  },
  watch: {
    'mergedData.open'(val) {
      this.isOpen = val
      if (!val) {
        this.closeBurger()
      }
    },
  },
})
</script>

<style scoped lang="scss">
@import 'src/assets/variables';

.burger-menu {
  z-index: 100;
  display: block;
  font-family: var(--font-family);
}
#menu__toggle {
  opacity: 0;
}

#menu__toggle:checked ~ .menu__btn > span {
  transform: rotate(45deg);
}
#menu__toggle:checked ~ .menu__btn > span::before {
  top: 0;
  transform: rotate(0);
}
#menu__toggle:checked ~ .menu__btn > span::after {
  top: 0;
  transform: rotate(90deg);
}

#menu__toggle:checked ~ .overlay {
  visibility: visible;
  right: 0;
  .menu__box {
    visibility: visible;

    &.--top-to-bottom {
      height: 100%;
    }
    &.--right-to-left {
      right: 0;
    }
  }
}

.menu {
  &__btn {
    display: flex;
    align-items: center;
    top: 11px;
    right: 20px;
    cursor: pointer;
    z-index: 1;
    width: 14px;
    height: 14px;
    background: var(--bg-color);
    border-radius: 4px;
    padding: 9px;

    &:hover {
      background: var(--bg=hover-color);
    }
  }

  &__btn > span,
  &__btn > span::before,
  &__btn > span::after {
    display: block;
    position: absolute;
    width: 14px;
    height: 1px;
    background-color: var(--dash-color);
    transition-duration: 0.25s;
    border-radius: 40px;
  }
  &__btn > span::before {
    content: '';
    top: -5px;
  }
  &__btn > span::after {
    content: '';
    top: 5px;
  }

  &__box {
    display: flex;
    flex-direction: column;
    position: fixed;
    visibility: hidden;
    width: calc(100% - 40px - 40px);
    margin: 0;
    list-style: none;
    background-color: var(--overlay-bg);
    padding: 36px 40px;
    transition-duration: 0.25s;

    &.--top-to-bottom {
      right: 0;
      height: 0;
    }
    &.--right-to-left {
      right: -100%;
      height: 100%;
    }
  }
}

@media (max-width: 375px) {
  .menu__box {
    padding: 36px 20px;
  }
}
</style>

<template>
  <div class="notification" :style="getVars">
    <div class="notification__image" v-if="mergedData.item?.image">
      <img :src="mergedData.item?.image" />
    </div>
    <div class="notification__content" :class="{ unread: !isRead }">
      <div class="header">
        <p class="title">{{ mergedData.item?.title }}</p>
        <div class="dots" @click="toggleDotMenu" v-if="mergedData.dotsMenu">
          <div>. . .</div>
          <div class="dots-menu" v-if="isMenuOpen">
            <slot name="dots-menu" />
          </div>
        </div>
      </div>
      <div class="body">{{ mergedData.item?.text }}</div>
      <div class="footer">{{ mergedData.item?.timeAgo }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ENotification',
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
    return {
      isMenuOpen: false,
    }
  },
  computed: {
    isRead() {
      return this.mergedData.isReadValue
        ? this.mergedData.item[this.mergedData.readPropertyName]
        : !this.mergedData.item[this.mergedData.readPropertyName]
    },
    mergedData() {
      return Object.assign(
        {
          item: {},
          isReadPropertyName: 'isRead',
          isReadValue: true,
          dotsMenu: true,
        },
        this.data,
      )
    },
    getVars() {
      return {
        '--font-family': this.styleConfig?.fontFamily || 'Inter',
      }
    },
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    toggleDotMenu() {
      this.isMenuOpen = !this.isMenuOpen
    },
  },
  watch: {},
})
</script>

<style scoped lang="scss">
@import '@/assets/variables';

.notification {
  font-family: var(--font-family);
  background: #ffffff;
  border-bottom: 1px solid $gray-300;
  box-shadow: $shadow-lg;
  padding: 24px;
  display: flex;

  &:hover {
    background: $gray-100;
  }
  &__image {
    margin-right: 16px;
  }
  &__content {
    display: flex;
    flex-direction: column;
  }
}

.notification__content {
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 6px;
    font-weight: 600;
    font-size: 14px;
    line-height: 150%;
    color: $gray-800;

    .title {
      margin: 0;
    }
    .dots {
      color: #a0aec0;
      position: relative;
      cursor: pointer;

      &:hover {
        color: $gray-800;
      }
    }
  }
  .body {
    margin-bottom: 6px;
    font-weight: 400;
    font-size: 14px;
    line-height: 150%;
    color: $gray-800;
  }
  .footer {
    display: flex;
    justify-content: flex-end;
    font-weight: 400;
    font-size: 12px;
    line-height: 15px;
    text-align: right;
    color: $gray-500;
  }

  &.unread {
    .body {
      font-weight: 600;
    }
  }
}
</style>

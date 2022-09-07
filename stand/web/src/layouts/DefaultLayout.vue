<template>
  <div class="layout-container">
    <div class="page-header">
      <e-button :style-config="styleConfig">
        <BootstrapIcon class="button-icon" icon="bell"></BootstrapIcon>
      </e-button>
      <e-avatar :data="avatarData"></e-avatar>
    </div>
    <e-navbar-left
      :data="navbarData"
      @on:openMenu="openMenu"
      @on:closeMenu="closeMenu"
      :style-config="sidebarStyleConfig"
    ></e-navbar-left>
    <div class="content-container" :class="{ 'menu-open': menuOpen }">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
import BootstrapIcon from '@dvuckovic/vue3-bootstrap-icons'

import { sidebarStyleConfig } from '@/assets/styleTemplates/ESidebar'
export default {
  name: 'DefaultLayout',
  components: {
    BootstrapIcon,
  },
  data() {
    return {
      sidebarStyleConfig: sidebarStyleConfig,
      navbarData: {
        logo: require('@/assets/logo.svg'),
        smallLogo: require('@/assets/logo-sm.svg'),
        links: [
          { name: 'home', to: '/', icon: 'house' },
          { name: 'link 1', to: '/link-1', icon: 'balloon-heart' },
          { name: 'link 2', to: '/link-2', icon: 'boombox' },
          { name: 'link 3', to: '/link-3', icon: 'bug' },
          {
            name: 'link 4',
            to: '/link-4',
            icon: 'camera',
            links: [
              { name: 'link 1', to: '/link-1', icon: 'balloon-heart' },
              { name: 'link 2', to: '/link-2', icon: 'boombox' },
              {
                name: 'link 3',
                to: '/link-3',
                icon: 'bug',
                links: [
                  { name: 'link 1', to: '/link-1', icon: 'balloon-heart' },
                  { name: 'link 2', to: '/link-2', icon: 'boombox' },
                  { name: 'link 3', to: '/link-3', icon: 'bug' },
                ],
              },
            ],
          },
        ],
      },
      avatarData: {
        name: 'user name',
        bgColor: '#A0AEC0',
        isOnline: true,
      },
      buttonData: {
        size: 'sm',
        rounded: true,
      },
      styleConfig: {
        backgroundColor: '#fff',
        hover: {
          backgroundColor: '#fff',
        },
        active: {
          backgroundColor: '#fff',
        },
        disabled: {
          backgroundColor: '#fff',
        },
      },
      menuOpen: true,
    }
  },
  computed: {},
  methods: {
    openMenu() {
      this.menuOpen = true
    },
    closeMenu() {
      this.menuOpen = false
    },
  },
}
</script>

<style scoped lang="scss">
@import 'src/assets/variables';

.layout-container {
  width: 100%;
  height: 100vh;

  .page-header {
    width: 100%;
    height: 80px;
    border-bottom: 1px solid $gray-200;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-right: 20px;

    .button-icon {
      width: 14px;
      height: 16px;
      color: $gray-800;
    }
  }

  .content-container {
    margin-left: 66px;
    transition: all 0.3s ease-in-out;
  }

  .content-container.menu-open {
    margin-left: 250px;
  }
}
</style>

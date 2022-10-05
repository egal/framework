<template>
  <div v-if="sortable" class="sort">
    <BootstrapIcon v-if="showOrderUp && !showOrderDown" icon="sort-up"></BootstrapIcon>
    <BootstrapIcon v-else-if="showOrderDown && !showOrderUp" icon="sort-down"></BootstrapIcon>
    <!--                todo sort arrows -->
    <BootstrapIcon v-else icon="filter"></BootstrapIcon>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BootstrapIcon from '@dvuckovic/vue3-bootstrap-icons'

export default defineComponent({
  name: 'Sorting',
  components: { BootstrapIcon },
  props: {
    sortable: {
      type: Boolean,
      default: false,
    },
    showOrderUp: {
      type: Boolean,
      default: false,
    },
    showOrderDown: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['sort'],
  data() {
    return {}
  },
  computed: {},
  mounted() {},
  beforeDestroy() {},
  methods: {},
  watch: {},
})
</script>

<style scoped lang="scss">
@import 'src/assets/variables';

.bi {
  margin-bottom: 0;
  width: 16px;
  height: 16px;
  color: #a0aec0;
}
.sort {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 24px;
  height: 24px;
  border-radius: 4px;
  cursor: pointer;
  margin: -8px 0 -8px 10px;
  &:hover {
    background: $gray-200;
  }

  &:active {
    background: $gray-300;
  }
}
</style>

<template>
  <div @click="$emit('order-by')">
    {{ label }}
    <Sorting :sortable="sortable" :show-order-up="showOrderUp" :show-order-down="showOrderDown" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Sorting from '@/components/tables/table3/components/Sorting.vue'

export default defineComponent({
  name: 'HeaderCell',
  components: { Sorting },
  props: {
    label: {
      type: String,
      default: '',
    },
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

<style scoped lang="scss"></style>

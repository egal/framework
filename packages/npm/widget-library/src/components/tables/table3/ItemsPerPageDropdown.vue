<template>
  <select :class="['v-datatable-light-items-per-page', css.select]" @change="onUpdate">
    <option
      v-for="item in listItemsPerPage"
      :key="item"
      :value="item"
      :selected="itemsPerPage === item"
    >
      {{ item }}
    </option>
  </select>
</template>

<script>
export default {
  name: 'ItemsPerPageDropdown',
  props: {
    listItemsPerPage: {
      type: Array,
      default: () => [10, 30, 50],
    },
    itemsPerPage: {
      type: Number,
      default: 10,
    },
    css: {
      type: Object,
      default: () => ({
        select: '',
      }),
    },
  },
  methods: {
    onUpdate: function (event) {
      this.$emit('on-update', event.target.value)
    },
  },
}
</script>

<style>
/* ITEMS PER PAGE DROPDOWN CSS */
.item-per-page-dropdown {
  background-color: transparent;
  min-height: 30px;
  border: 1px solid #337ab7;
  border-radius: 5px;
  color: #337ab7;
}
.item-per-page-dropdown:hover {
  cursor: pointer;
}
/* END ITEMS PER PAGE DROPDOWN CSS */
</style>

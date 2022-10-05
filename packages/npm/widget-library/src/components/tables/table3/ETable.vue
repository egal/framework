<template>
  <div class="table-pagination-wrapper">
    <MobileTable
      v-if="mobile"
      :style="getVars"
      :is-header="mergedData.useMobileHeader"
      :items="mergedData.items"
      :headers="mergedData.headerFields"
    ></MobileTable>
    <div
      v-if="!mobile"
      :style="{ ...getVars, ...containerStyle }"
      class="table-wrapper"
      id="tableWrapper"
    >
      <table id="v-etable" :class="['v-etable', `${mergedData.template}-template`]" ref="v-etable">
        <thead :style="theadStyle" id="theader" :class="{ 'add-shadow': isScrolling }">
          <tr :class="['row', 'row--header']">
            <!-- отступ у хедера слева -->
            <div v-if="mergedData.items && mergedData.items.find((i) => i.expandable)">
              <span :style="{ width: '10px' }" />
            </div>

            <td
              v-for="(item, columnIndex) in headers"
              :key="item.label"
              :class="headerItemClass(item, [`header-item`])"
              :style="getColumnWidth(item)"
            >
              <!-- header -->
              <HeaderCell
                v-if="!isFieldSpecial(item.name)"
                :class="['th-wrapper', `header-column-${columnIndex}`]"
                @order-by="orderBy(item.name)"
                :label="item.label"
                :sortable="item.sortable"
                :show-order-up="showOrderArrow(item, 'desc')"
                :show-order-down="showOrderArrow(item, 'asc')"
              />
              <!-- end header -->

              <!-- especial field -->
              <div
                v-if="
                  isFieldSpecial(item.name) &&
                  extractArgs(item.name) === 'checkboxes' &&
                  mergedData.headerCheckbox
                "
              >
                <slot name="checkbox" :checked="checkedAll" :click="() => checkAll()"></slot>
              </div>

              <!-- end especial field -->

              <!-- actions field -->
              <div v-if="isFieldSpecial(item.name) && extractArgs(item.name) === 'actions'">
                {{ extractLabel(item.name) }}
              </div>
              <!-- end actions field -->
            </td>
          </tr>
        </thead>

        <tbody class="table__body" :style="{ ...tbodyStyle }">
          <template v-if="mergedData.isLoading">
            <div class="loader-container">
              <slot name="loader" />
            </div>
          </template>

          <!-- table rows -->
          <template v-else-if="mergedData.items && mergedData.items.length > 0">
            <template
              v-for="(item, index) in mergedData.items"
              :key="index"
              :style="{ display: 'flex', flexDirection: 'column' }"
            >
              <tr
                @click="(ev) => clickRow(ev, item, 'row')"
                :class="[
                  `row-${index}`,
                  'row',
                  'row--body',
                  { selected: isRowExpanded(item) },
                  { 'no-bottom-border': isScrolling },
                ]"
              >
                <td
                  v-for="(key, columnIndex) in headers"
                  :key="`${index}-${key.name}`"
                  :class="[`column-${columnIndex}`, 'tr-wrapper']"
                  :style="getColumnWidth(key)"
                >
                  <BootstrapIcon v-if="key.icon" :icon="key.icon" class="row-icon" />
                  <slot
                    v-if="isFieldSpecial(key.name) && extractArgs(key.name) === 'actions'"
                    :name="extractActionID(key.name)"
                    :item="item"
                    :row-index="index"
                  />

                  <div
                    v-if="isFieldSpecial(key.name) && extractArgs(key.name) === 'expand'"
                    class="arrow"
                  >
                    <BootstrapIcon
                      v-show="isFieldSpecial(key.name) && extractArgs(key.name) === 'expand'"
                      class="expand-arrow"
                      :icon="isRowExpanded(item) ? 'chevron-down' : 'chevron-up'"
                    />
                  </div>

                  <div v-if="isFieldSpecial(key.name) && extractArgs(key.name) === 'checkboxes'">
                    <slot
                      name="checkbox"
                      :checked="checkedAll || isCheckedItem(item)"
                      :click="() => checkItem(item)"
                    ></slot>
                  </div>

                  <slot
                    v-if="key.customElement"
                    :item="item"
                    :row-index="index"
                    :name="customElementName(key)"
                  />
                  <template v-else-if="key.format">{{ key.format(item[key.name]) }}</template>
                  <template v-else>{{ item[key.name] }}</template>
                  <div
                    v-if="isFieldSpecial(key.name) && extractArgs(key.name) === 'menu'"
                    :class="['menu', mergedData.menuVisible ? 'visible' : 'hidden']"
                  >
                    <slot name="menu" :item="item" :row-index="index"></slot>
                  </div>
                </td>
              </tr>

              <!--            expand slot -->
              <Transition :name="mergedData.useTransition ? 'fade' : ''">
                <tr v-if="isRowExpanded(item)">
                  <td colspan="10">
                    <slot name="row-slot" :item="item" :row-index="index"></slot>
                  </td>
                </tr>
              </Transition>
            </template>
          </template>
          <!-- end table rows -->

          <!-- table not found row -->
          <template v-else>
            <div class="empty-table">
              {{ mergedData.notFoundMessage }}
            </div>
          </template>
          <!-- end table not found row -->
        </tbody>
      </table>
    </div>

    <div class="table__footer" v-if="hasSlots">
      <!--      <div class="footer">-->
      <slot name="ItemsPerPage" />
      <slot name="pagination" />
      <!--      </div>-->
    </div>
  </div>
</template>

<script lang="ts">
import BootstrapIcon from '@dvuckovic/vue3-bootstrap-icons'

import { defineComponent } from 'vue'
import Sorting from '@/components/tables/table3/components/Sorting.vue'
import HeaderCell from '@/components/tables/table3/components/HeaderCell.vue'
import MobileTable from '@/components/tables/table3/MobileTable.vue'

enum StyleTemplate {
  Default = 'default',
  Zebra = 'zebra',
}

interface HeaderField {
  name: string
  label: string
  sortable: boolean
  icon: string
  customElement: boolean | string
  format: Function
  width: string
}

type HeaderTypes = [string, HeaderField]
const mobileWidth = 550

export default defineComponent({
  name: 'ETable',
  components: { HeaderCell, Sorting, BootstrapIcon, MobileTable },
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
  emits: ['on-update', 'on-check-all', 'on-unchecked-item', 'on-checked-item'],
  data() {
    return {
      sortedField: '',
      sortedDir: '',
      checkedAll: false,
      itemsChecked: [] as any,
      expandedRows: [] as any,
      isScrolling: false,
      mobile: window.innerWidth <= mobileWidth,
    }
  },
  created() {
    window.addEventListener('resize', this.onResize, { passive: true })
  },
  mounted() {
    this.sortedField = this.mergedData.sortField
    this.sortedDir = this.mergedData.sort

    if (this.mergedData.fixedHeader) {
      //@ts-ignore
      document.getElementById('tableWrapper').addEventListener('scroll', this.onScroll)
    }
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.onResize)

    if (this.mergedData.fixedHeader) {
      //@ts-ignore
      document.getElementById('tableWrapper').removeEventListener('scroll', this.onScroll)
    }
  },
  computed: {
    mergedData() {
      return Object.assign(
        {
          template: StyleTemplate.Default,
          items: [],
          defaultColumnWidth: 150,
          trackBy: 'id',
          notFoundMessage: '',
          headerFields: [] as HeaderTypes[],
          isLoading: false,
          sortField: '',
          sort: '',
          fixedHeight: '',
          fixedHeader: false,
          headerCheckbox: false,
          expandOnIcon: true,
          oneExpand: true,
          useMobileHeader: true,
          menuVisible: true,
          clickableRow: false,
          useTransition: true,
        },
        this.data,
      )
    },
    getVars() {
      return {
        '--font-family': this.styleConfig?.fontFamily || 'Inter',
        '--font-size': this.styleConfig?.fontSize || '14px',
        '--row-hover-bg': this.styleConfig?.rowHoverBg || '#edf2f7',
        '--row-select-bg': this.styleConfig?.rowSelectBg || '#edf2f7',
        '--zebra-color': this.styleConfig?.zebraRowBg || '#f7fafc',
        '--row-bg': this.styleConfig?.rowBg || '#fff',
        '--text-justify': this.styleConfig?.justify || 'flex-start',
        '--border-radius': this.styleConfig?.borderRadius || '16px',
        '--row-clickable': this.mergedData?.clickableRow ? 'pointer' : 'default',
        '--font-color': this.styleConfig?.fontColor || '#2D3748',
      }
    },

    hasSlots() {
      return this.$slots.pagination !== undefined || this.$slots.ItemsPerPage !== undefined
    },
    headers() {
      if (
        this.mergedData.headerFields &&
        this.mergedData.headerFields.constructor === Array &&
        this.mergedData.headerFields.length
      ) {
        return Object.keys(this.mergedData.headerFields).map((key) => {
          const field = this.mergedData.headerFields[key]

          if (typeof field === 'string') {
            return { label: this.extractLabel(field), name: field }
          }

          return field
        })
      }
      return []
    },

    // other styles
    tbodyStyle() {
      let borderR = this.styleConfig?.borderRadius || '16px'

      if (!this.mergedData.fixedHeader) {
        return null
      }

      if (this.mergedData.isLoading || (this.mergedData.items && !this.mergedData.items.length)) {
        return { position: 'relative', borderRadius: `0 0 ${borderR} ${borderR}` }
      }

      return this.mergedData.fixedHeight ? { borderRadius: `0 0 ${borderR} ${borderR}` } : null
    },

    theadStyle() {
      return this.mergedData.fixedHeader
        ? { position: 'sticky', top: '0', width: 'fit-content' }
        : null
    },
    containerStyle() {
      return { overflow: 'auto', height: this.mergedData.fixedHeight }
    },
  },

  methods: {
    onResize() {
      this.mobile = innerWidth <= mobileWidth
    },
    onScroll(ev) {
      if (this.mergedData.fixedHeader) {
        this.isScrolling = !!ev.target.scrollTop
      }
    },
    isRowExpanded(row) {
      if (!this.expandedRows.length) {
        return false
      }
      return this.expandedRows.find(
        (i) => i[this.mergedData.trackBy] === row[this.mergedData.trackBy],
      )
    },
    clickRow(ev, row, element: 'arrow' | 'row') {
      const allowTagNames = ['DIV', 'TD', 'use', 'svg']
      const openOnIcon = this.mergedData.expandOnIcon && element === 'arrow'

      const openOnRow =
        !this.mergedData.expandOnIcon &&
        element === 'row' &&
        allowTagNames.includes(ev.target.tagName)
      if (openOnIcon || openOnRow) {
        const isExist = this.isRowExpanded(row)
        if (this.mergedData.oneExpand) {
          this.expandedRows = isExist ? [] : [row]
        } else if (isExist) {
          this.expandedRows = this.expandedRows.filter(
            (item) => item[this.mergedData.trackBy] !== row[this.mergedData.trackBy],
          )
        } else {
          this.expandedRows.push(row)
        }
      } else {
        return false
      }
    },

    // sort callback
    sortCb(arr, prop, order) {
      return [...arr].sort((a, b) => {
        let acc = 0
        const [p1, p2] = order && order === 'desc' ? [b[prop], a[prop]] : [a[prop], b[prop]]
        acc = p1 > p2 ? 1 : p1 < p2 ? -1 : 0
        return acc
      })
    },

    updateData() {
      const params = {
        sortField: this.sortedField,
        sort: this.sortedDir,
        sortCb: this.sortCb,
      }

      this.$emit('on-update', params)
    },

    orderBy(field) {
      if (this.isFieldSortable(field)) {
        if (this.sortedField === field) {
          this.sortedDir = this.sortedDir === 'asc' ? 'desc' : 'asc'
        } else {
          this.sortedDir = 'desc'
          this.sortedField = field
        }
        this.updateData()
      }
    },

    checkAll() {
      this.checkedAll = !this.checkedAll
      if (this.checkedAll) {
        this.itemsChecked = this.mergedData.items
      } else {
        this.itemsChecked = []
      }
      this.$emit('on-check-all', this.itemsChecked)
    },

    checkItem(item) {
      const found = this.itemsChecked.find(
        (itemChecked) => itemChecked[this.mergedData.trackBy] === item[this.mergedData.trackBy],
      )
      if (found) {
        this.itemsChecked = this.itemsChecked.filter(
          (itemChecked) => itemChecked[this.mergedData.trackBy] !== item[this.mergedData.trackBy],
        )
        this.$emit('on-unchecked-item', item)
      } else {
        this.itemsChecked = [...this.itemsChecked, item]
        this.$emit('on-checked-item', item)
      }
    },

    isCheckedItem(item) {
      return !!this.itemsChecked.find(
        (itemChecked) => itemChecked[this.mergedData.trackBy] === item[this.mergedData.trackBy],
      )
    },

    isFieldSortable(field) {
      const foundHeader = this.mergedData.headerFields.find(
        (item: any) => item.name === field,
      ) as any
      return foundHeader && foundHeader.sortable
    },

    headerItemClass(item, className = []) {
      const classes = className.join(' ')
      return item && item.sortable ? classes : `${classes}`
    },

    isFieldSpecial: (field) => field.indexOf('__') > -1,

    extractArgs: (string) => string.split(':')[1],
    extractLabel: (string) => string.split(':')[2],

    extractActionID: (string) => {
      const list = string.split(':')
      return list.length === 3 ? list[2] : 'actions'
    },

    getColumnWidth(item) {
      let columnsAmount = this.mergedData.headerFields.length

      if (item.name === '__slot:checkboxes') {
        columnsAmount -= 1
        return { width: '25px' }
      }

      if (item.name === '__slot:expand') {
        columnsAmount -= 1
        return { width: '10px' }
      }

      if (item.name === '__slot:menu') {
        columnsAmount -= 1
        return { width: '20px' }
      }

      if (item.name.includes('__slot:actions')) {
        return { width: '80px' }
      }

      return { width: item.width || `${this.mergedData.defaultColumnWidth}px` }
    },

    customElementName: ({ customElement, name }) =>
      typeof customElement === 'string' ? customElement : name,

    showOrderArrow(item, sortDir) {
      return (
        this.sortedField !== item.name ||
        (this.sortedField === item.name && this.sortedDir === sortDir)
      )
    },
  },
})
</script>

<style scoped lang="scss">
@import 'src/assets/variables';
$border: 1px solid #e2e8f0;

.table-pagination-wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.table-wrapper {
  border: $border;
  border-radius: var(--border-radius);
}
#v-etable {
  font-family: var(--font-family);
  font-weight: 400;
  font-size: var(--font-size);
  line-height: 120%;
  color: var(--font-color);
  width: 100%;
  overflow: auto;
  border-collapse: collapse;
}

.table {
  &__body {
    height: 100%;
  }
}

thead {
  border-bottom: $border;

  &.add-shadow {
    filter: drop-shadow(0px 4px 10px rgba(12, 26, 75, 0.1));
  }
}

/* rows start */
.row {
  background-color: var(--row-bg);

  td {
    padding: 23px 20px;
  }

  &--header {
    font-weight: 700;
    border-radius: var(--border-radius);
  }

  &--body {
    border-top: $border;
    border-bottom: $border;

    &.no-bottom-border {
      &:last-child {
        border-bottom: none;
      }
    }

    &:hover {
      background-color: var(--row-hover-bg);
      cursor: var(--row-clickable);

      .menu.hidden {
        visibility: visible;
      }
    }
  }

  &.selected {
    background-color: var(--row-select-bg);
  }
  &-icon {
    margin-right: 8px;
  }
}

.bi {
  margin-bottom: 0;
  width: 16px;
  height: 16px;
  color: #a0aec0;
}

/* start expand arrow */
.arrow {
  width: 24px;
  height: 24px;
  border-radius: 4px;
  cursor: pointer;
  margin: -8px -8px -8px 0;
  display: flex;
  justify-content: center;
  align-items: center;

  .bi {
    color: $gray-800;
  }
  &:hover {
    background: $gray-300;
  }

  &:active {
    background: $gray-400;
  }
}
/* end expand arrow */

/* zebra style start */
.zebra-template {
  .row--body {
    &:nth-child(2n) {
      background: var(--zebra-color);
    }

    &:hover {
      background-color: var(--row-hover-bg);
    }
  }
}
/* zebra style end */

.th-wrapper {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: var(--text-justify);
  align-items: center;
}

// expand row transition
.fade-enter-active {
  transition: opacity 0.5s ease;
}
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

// menu slot
.menu {
  &.visible {
    visibility: visible;
  }
  &.hidden {
    visibility: hidden;
  }
}

// loader
.loader-container {
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
}

// empty table
.empty-table {
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  text-align: center;
}
</style>

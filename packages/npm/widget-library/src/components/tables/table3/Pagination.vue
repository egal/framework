<template>
  <ul
    class="v-datatable-light-pagination"
    :class="css.paginaton"
    :style="{ display: 'flex', flexDirection: 'row' }"
  >
    <li v-if="moveFirstPage" :class="[css.paginationItem, css.moveFirstPage]">
      <button :disabled="isActionDisabled('firstPage')" :class="css.pageBtn" @click="changePage(1)">
        &lt;&lt;
      </button>
    </li>
    <li v-if="movePreviousPage" :class="[css.paginationItem, css.movePreviousPage]">
      <button
        :disabled="isActionDisabled('previousPage')"
        :class="css.pageBtn"
        @click="changePage(currPage - 1)"
      >
        &lt;
      </button>
    </li>
    <li v-for="pageNr in qntPages" :key="pageNr" :class="pageClass(pageNr)">
      <template v-if="pageNr !== currPage">
        <button :class="[css.pageBtn, css.pageNumber]" @click="changePage(pageNr)">
          {{ pageNr }}
        </button>
      </template>
      <template v-else>
        {{ pageNr }}
      </template>
    </li>
    <li v-if="moveNextPage" :class="[css.paginationItem, css.moveNextPage]">
      <button
        :disabled="isActionDisabled('nextPage')"
        :class="css.pageBtn"
        @click="changePage(currPage + 1)"
      >
        &gt;
      </button>
    </li>
    <li v-if="moveLastPage" :class="[css.paginationItem, css.moveLastPage]">
      <button
        :disabled="isActionDisabled('lastPage')"
        :class="css.pageBtn"
        @click="changePage(lastPage)"
      >
        &gt;&gt;
      </button>
    </li>
  </ul>
</template>
<script>
export default {
  name: 'Pagination',
  props: {
    totalItems: {
      type: Number,
      required: true,
    },
    itemsPerPage: {
      type: Number,
      default: 10,
    },
    page: {
      type: Number,
      default: 1,
    },
    moveLastPage: {
      type: Boolean,
      default: true,
    },
    moveFirstPage: {
      type: Boolean,
      default: true,
    },
    moveNextPage: {
      type: Boolean,
      default: true,
    },
    movePreviousPage: {
      type: Boolean,
      default: true,
    },
    css: {
      type: Object,
      default: () => ({
        paginationItem: 'pagination-item',
        moveFirstPage: 'move-first-page',
        movePreviousPage: 'move-previous-page',
        moveNextPage: 'move-next-page',
        moveLastPage: 'move-last-page',
        pageNumber: 'page-number',
        pageBtn: 'page-btn',
      }),
    },
  },
  data: function () {
    return {
      perPage: this.itemsPerPage,
      currPage: this.page,
    }
  },
  computed: {
    qntPages() {
      const nrPages = this.lastPage
      if (nrPages > 4) {
        if (this.currPage <= 3) {
          return Array.apply(null, { length: 5 }).map((_, index) => index + 1)
        } else if (this.currPage + 2 >= nrPages) {
          return Array.apply(null, { length: nrPages })
            .map((_, index) => index + 1)
            .slice(nrPages - 5, nrPages)
        } else {
          return Array.apply(null, { length: nrPages })
            .map((_, index) => index + 1)
            .slice(this.currPage - 3, this.currPage + 2)
        }
      } else {
        return Array.apply(null, { length: nrPages }).map((_, index) => index + 1)
      }
    },
    lastPage() {
      return Math.ceil(this.totalItems / this.perPage)
    },
  },
  watch: {
    page(newPage) {
      this.currPage = newPage
    },
    itemsPerPage(newItemsPerPage) {
      this.perPage = newItemsPerPage
      this.checkCurrentPageExist()
    },
  },
  methods: {
    pageClass(currentPage) {
      return this.currPage === currentPage
        ? `${this.css.paginationItem} selected`
        : this.css.paginationItem
    },
    changePage(pageToMove) {
      if (pageToMove <= this.lastPage && pageToMove >= 1 && pageToMove !== this.currPage) {
        this.$emit('on-update', pageToMove)
      }
    },
    isActionDisabled(action) {
      switch (action) {
        case 'firstPage':
          return this.currPage === 1
        case 'previousPage':
          return this.currPage === 1
        case 'lastPage':
          return (
            this.currPage === this.lastPage ||
            !this.totalItems ||
            this.currPage * this.itemsPerPage >= this.totalItems
          )
        case 'nextPage':
          return (
            this.currPage === this.lastPage ||
            !this.totalItems ||
            this.currPage * this.itemsPerPage >= this.totalItems
          )
      }
    },
    checkCurrentPageExist() {
      if (this.qntPages.indexOf(this.currPage) === -1) {
        const nextPage = this.qntPages.length ? this.qntPages.length : 0
        this.$emit('update-current-page', nextPage)
      }
    },
  },
}
</script>

<style>
/* Pagination CSS */
#v-datatable-light-pagination {
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 0;
  padding: 0;
  width: 300px;
  height: 30px;
}

#v-datatable-light-pagination .pagination-item {
  width: 30px;
  margin-right: 5px;
  font-size: 16px;
  transition: color 0.15s ease-in-out;
}

#v-datatable-light-pagination .pagination-item.selected {
  color: #ed9b19;
}

#v-datatable-light-pagination .pagination-item .page-btn {
  background-color: transparent;
  outline: none;
  border: none;
  color: #337ab7;
  transition: color 0.15s ease-in-out;
}

#v-datatable-light-pagination .pagination-item .page-btn:hover {
  color: #ed9b19;
}

#v-datatable-light-pagination .pagination-item .page-btn:disabled {
  cursor: not-allowed;
  box-shadow: none;
  opacity: 0.65;
}
/* END PAGINATION CSS */
</style>

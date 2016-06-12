<template>
  <div id="app">
    <v-table :columns="columns" :rows="items" :pager="pager" :config="config" 
        :checklist.sync="checklist"
        @row-click="rowClick" 
        @cell-callback="cellCallback"
        @page-change="pageChange">
    </v-table>
  </div>
</template>

<script>

import vTable from './components/btTable.vue'

export default {
  components: {
    vTable
  },
  data () {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      checklist: [],
      columns: [
                {
                    title: 'id',
                    field: 'id',
                    visible: true,
                    sortable: true,
                },
                {
                    title: 'name',
                    field: 'name',
                    visible: true,
                    sortable: true,
                },
                {
                    title: 'edit',
                    field: 'edit',
                    visible: true,
                    formatter: '<a class="btn btn-xs btn-success" @click=callback("edit")>edit</a>',
                },
      ],
      items: [
                { id: 1, name: 'name1' },
                { id: 2, name: 'name2' },
                { id: 3, name: 'name3' },
            ],
            pager:{
                page_no: 1,
                page_size: 10,
                sort_name: 'id',
                is_desc: true,
                total_result: 100,             
            },
    }
  },
  methods: {
    rowClick (item, index) {
      console.log('row clicked', item, index)
    },
    cellCallback () {
      console.log('cellCallback')
    },
    pageChange () {
      console.log('pageChange')
      this.$log('pager')
    }
  }
}
</script>

<style>
  body {
    font-family: Helvetica, sans-serif;
  }
</style>
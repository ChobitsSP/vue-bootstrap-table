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
    data() {
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
                    formatter: '<div><a class="btn btn-xs btn-success" @click.stop=callback("edit")>edit</a><a class="btn btn-xs btn-danger" @click.stop=callback("remove")>remove</a></div>',
                },
            ],
            items: [],
            pager: {
                page_no: 1,
                page_size: 10,
                sort_name: 'id',
                is_desc: true,
                total_result: 100,
            },
        }
    },
    ready() {
        for (var i = 0; i < 100; i++) {
            this.items.push({ id: i, name: 'name' + i })
        }
    },
    methods: {
        rowClick(item, index) {
            console.log('row clicked', item, index)
        },
        cellCallback(row, args) {
            console.log('cellCallback', row, args)
        },
        pageChange() {
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
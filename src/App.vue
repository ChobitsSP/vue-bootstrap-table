<template>
    <div id="app">
        <v-table :columns="columns" :rows="items" :pager="pager" :config="config" 
            :checklist.sync="checklist" @row-click="rowClick"
            @cell-callback="cellCallback" @sort-change='pageChange' @page-change="pageChange">
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
                    formatter: '<a class="btn btn-xs btn-success" @click.stop=callback("edit")>edit</a><a class="btn btn-xs btn-danger" @click.stop=callback("remove")>remove</a>',
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
            config: {
                loading: true,
            },
            current_item: {},
        }
    },
    ready() {
        this.pageChange()
    },
    methods: {
        rowClick(item, index) {
            console.log('row clicked', item, index)
        },
        cellCallback(row, args) {
            if(args[0] === 'remove') {
                this.items.$remove(row)
            }
            else {
                this.current_item = row
                this.$log('current_item')
            }
        },
        pageChange() {
                    var psot_data = {
                        sort: this.pager.sort_name + '|' + (this.pager.is_desc ? 'desc' : 'asc'),
                        page: this.pager.page_no,
                        per_page: this.pager.page_size,
                    }
                    this.config.loading = true
                    this.$http.get('http://vuetable.ratiw.net/api/users', psot_data).then(rsp => {
                        this.pager.total_result = rsp.data.total
                        this.items = rsp.data.data
                        this.checklist = []
                        this.config.loading = false
                    })
        },
        sortChange() {
            console.log('sortChange')
            this.$log('pager')
        },
    }
}
</script>

<style>
    body {
        font-family: Helvetica, sans-serif;
    }
</style>
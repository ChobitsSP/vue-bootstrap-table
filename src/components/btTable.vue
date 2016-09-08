<template>
    <div class="bootstrap-table">
        <slot name="toolbar"></slot>
        <div class="fixed-table-container">
            <div class="fixed-table-body">
                <table class="table table-striped table-hover table-bordered dataTable no-footer" ng-cloak>
                    <thead>
                        <tr role="row">
                            <th class="bs-checkbox" style="text-align: center; vertical-align: middle; width: 36px;" v-if="checklist">
                                <div class="th-inner">
                                    <input type="checkbox" v-select-all="checklist" :array="items" />
                                </div>
                            </th>
                            <th style="text-align: center;" v-for="col in columns" v-show="col.visible">
                                <bt-col :column='col' :pager.sync='pager'></bt-col>
                            </th>
                        </tr>
                    </thead>
                    <tbody v-show="!config.loading" v-cloak>
                        <tr v-for="row in items" track-by="$index" :class="rowClass(row, $index)" @click="row_click(row, $index)">
                            <td style="text-align: center;" class="bs-checkbox" v-if="checklist">
                                <input type="checkbox" v-model="checklist" :value="row" class="checkbox" />
                            </td>
                            <td style="text-align: center;" v-for="col in columns" v-show="col.visible">
                                <bt-cell :row='row' :column='col' @cell-callback="cell_callback"></bt-cell>
                            </td>
                        </tr>
                        <tr class="no-records-found" v-if="items.length === 0">
                            <td colspan="999" class="text-center">没有找到匹配的记录</td>
                        </tr>
                    </tbody>
                    <tbody v-if="config.loading">
                        <tr>
                            <td colspan="999" class="text-center">正在加载数据 ... </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div v-if="config.show_pager">
                <bt-pager :page-no.sync="pager.page_no" :page-size.sync="pager.page_size" :total-result="pager.total_result">
                </bt-pager>
            </div>
        </div>
    </div>
</template>

<script>
    module.exports = {
        props: ['columns', 'rows', 'pager', 'config', 'checklist'],
        created () {
            this.config = this.config || {
                no_records_text: '没有找到匹配的记录',
                loading_text: '正在加载数据 ... ',
            }
        },
        beforeCompile () {
            // this.columns.forEach(col => {
            //     if(col.formatter){
            //         Vue.partial(col.field, col.formatter)
            //     }
            //     else{
            //         Vue.partial(col.field, '<div>{{row.' + col.field + '}}</div>')
            //     }
            // })
        },
        ready() {

        },
        methods: {
            rowClass() {
                return '';
            },
            row_click(row, index) {
                if (this.checklist) {
                    if (!this.checklist.some(t => t === row)) {
                        this.checklist.push(row)
                    }
                    else {
                        this.checklist.$remove(row)
                    }
                }
                this.$emit('row-click', row, index)
            },
            cell_callback(row, args) {
                this.$emit('cell-callback', row, args)
            },
        },
        computed: {
            is_client_pager() {
                var total = this.rows.length
                return this.pager && (this.pager.total_result === total) && this.pager.page_size < total
            },
            items() {
                return this.rows
                //if (this.is_client_pager) {
                //    var sql = 'rows'
                //    if (this.searchQuery) {
                //        sql += ' | filterBy searchQuery'
                //    }
                //    sql += ' | orderBy pager.sort_name ' + (this.pager.is_desc ? -1 : 1)
                //    var offset = (this.pager.page_no - 1) * this.pager.page_size
                //    offset = Math.max(0, offset)
                //    sql += ' | limitBy pager.page_size ' + offset
                //    return this.$eval(sql)
                //}
                //else {
                //    return this.rows
                //}
            }
        },
        components: {
            btPager: require('components/btPager.vue'),
            btCol: require('components/btCol.vue'),
            btCell: require('components/btCell.vue'),
        },
        directives: {
            selectAll: require('directives/selectAll.js'),
        }
    }
</script>
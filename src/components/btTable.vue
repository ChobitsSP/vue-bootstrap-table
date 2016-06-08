<template>
    <div class="bootstrap-table">
        <div class="fixed-table-toolbar">
            <div class="bars pull-left">
                <slot name="toolbar-left"></slot>
            </div>
            <div class="columns columns-right btn-group pull-right">
                <slot name="toolbar-right"></slot>
            </div>
        </div>
        <div class="fixed-table-container" style="padding-bottom: 0px;">
            <div class="fixed-table-body">
                <table class="table table-striped table-hover table-bordered dataTable no-footer" ng-cloak>
                    <thead>
                        <tr role="row">
                            <th class="bs-checkbox" v-if="config.checkbox">
                                <div class="th-inner">
                                    <input type="checkbox" v-select-all="checklist" :array="rows" />
                                </div>
                            </th>
                            <th v-for="col in columns" v-show="col.visible" bt-col="col" pager="pager">
                                <div class="th-inner" :class="{ 'sortable both' : col.sortable }">
                                    {{col.title}}
                                </div>
                                <div class="fht-cell">
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody v-show="!loading" v-cloak>
                        <tr v-for="item in rows" track-by="$index" :class="rowClass(item, $index)" @click="row_click(item, $index)">
                            <td class="bs-checkbox" v-if="config.checkbox">
                                <input type="checkbox" v-model="checklist" :value="item" class="checkbox" />
                            </td>
                            <td v-for="col in columns" v-show="col.visible" bt-row="item" column="col" callback="tdCallback(args, item, $parent.$index)">
                                <partial :name="col.field"></partial>
                            </td>
                        </tr>
                        <tr class="no-records-found" v-show="rows.length == 0">
                            <td colspan="999" class="text-center">没有找到匹配的记录</td>
                        </tr>
                    </tbody>
                    <tbody v-show="loading">
                        <tr>
                            <td colspan="999" class="text-center">正在加载数据 ... </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div v-if="pager">
            <bt-pager :page-no.sync="pager.page_no" :page-size.sync="pager.page_size" :total-result="pager.total_result">
            </bt-pager>
        </div>
    </div>
</template>

<script>

import Vue from 'vue'
import btPager from './vue-pager.vue'
import { directive as selectAll } from './selectAll.js'

export default {
    components: {
        btPager
    },
    directives: {
        selectAll: selectAll,
           'gridcell':function(html){
                var cell=$.parseHTML(html)[0];
                this.vm.$compile(cell)
                this.el.appendChild(cell);
            }
    },
    filters: {
        'btRow': function (col, row) {

            if(col.formatter){
                return col.formatter;
            }
            else{
                return '<div>{{item.' + col.field + '}}</div>';
            }


        },
    },
    props: ['columns', 'rows', 'pager', 'config'],
    created () {
        this.config = this.config || {}
    },
    beforeCompile () {

        

        this.columns.forEach(col => {

            if(col.formatter){

                Vue.partial(col.field, col.formatter)
            }
            else{

                Vue.partial(col.field, '<div>{{item.' + col.field + '}}</div>')
            }

            
        })
    },
    ready() {
        



    },
    methods: {
        rowClass() {
            return '';
        },
        row_click(item, index) {
            if (this.config.checkbox) {
                if (!this.checklist.some(t => t === item)) {
                    this.checklist.push(item)
                }
                else {
                    this.checklist.$remove(item)
                }
            }
            this.$emit('row-click', item, index)
        },
        checkAllChange() {
            var selectall = this.toggleAll

            this.checklist = []

            if (!selectall) {
                this.rows.forEach(t => this.checklist.push(t))
            }
        },
        callback() {

            this.$emit('cell-callback')

        },
    },
    compouted: {
        toggleAll() {
            return this.checklist.length == this.rows.length
        }
    },
    data() {
        return {
            checklist: [],
        }
    }
}
</script>
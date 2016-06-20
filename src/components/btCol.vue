<template>
    <div class="th-inner" :class="sort_class" @click="change_sort()" @keypress.enter="change_sort()">
        {{column.title}}
    </div>
    <div class="fht-cell">
    </div>
</template>

<script>
export default {
    props: ['column', 'pager'],
    methods: {
        change_sort() {
            if (!this.sortable) {
                return
            }
            if (this.pager.sort_name === this.column.field) {
                this.pager.is_desc = !this.pager.is_desc
            }
            else {
                this.pager.is_desc = false
                this.pager.sort_name = this.column.field
            }
        }
    },
    computed: {
        sortable() {
            return this.column.sortable && this.pager
        },
        sort_class() {
            if (!this.sortable) {
                return ''
            }

            let class_str = 'sortable '

            if (this.pager.sort_name === this.column.field) {
                class_str += this.pager.is_desc ? 'desc' : 'asc'
            } else {
                class_str += 'both'
            }

            return class_str
        }
    }
}
</script>
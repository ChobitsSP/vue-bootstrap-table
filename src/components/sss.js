
import btPager from './vue-pager.vue'
import { directive as selectAll } from './selectAll.js'

export default {
    components: {
        btPager
    },
    directives: {
        selectAll: selectAll,
    },
    props: ['columns', 'rows', 'pager', 'config'],
    ready() {
        this.config = this.config || {}
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
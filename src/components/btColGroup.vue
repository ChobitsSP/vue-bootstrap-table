<template>
    <div v-el:dropdown class="keep-open btn-group" @blur="show=false" :class="{ 'open': show }">
        <button type="button" class="btn btn-default dropdown-toggle" @click="show=!show">
            <i class="glyphicon glyphicon-th icon-th"></i>
            <span class="caret"></span>
        </button>
        <ul class="dropdown-menu" v-show="show">
            <li v-for="col in columns">
                <label>
                    <input type="checkbox" v-model="col.visible"> {{ col.title }}
                </label>
            </li>
        </ul>
    </div>
</template>

<script>
    let $ = require('../utils/NodeList.js')

    module.exports = {
        props: ['columns'],
        data: function () {
            return {
                show: false,
            }
        },
        computed: {
            classes () {
                return [{ open: this.show, disabled: this.disabled }, this.class]
            },
            menu () {
                return !this.$parent || this.$parent.navbar
            },
            submenu () {
                return this.$parent && (this.$parent.menu || this.$parent.submenu)
            },
            slots () {
                return this._slotContents
            }
        },
        methods: {
            blur () {
                this.unblur()
                this._hide = setTimeout(() => {
                    this._hide = null
                    this.show = false
                }, 100)
            },
            unblur () {
                if (this._hide) {
                    clearTimeout(this._hide)
                    this._hide = null
                }
            }
        },
        ready () {
            const $el = $(this.$els.dropdown)
            $el.onBlur((e) => { this.show = false })
        },
        beforeDestroy () {
            const $el = $(this.$els.dropdown)
            $el.offBlur()
        }
    }
</script>
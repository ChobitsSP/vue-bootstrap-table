<template>
    <div></div>
</template>

<script>
    function htmlToElement(html) {
        var template = document.createElement('template');
        template.innerHTML = html;
        return template.content;
    }

    module.exports = {
        props: ['row', 'column'],
        ready() {
            if (this.column.formatter) {
                var cell = htmlToElement(this.column.formatter)
                this.$compile(cell)
                this.$el.appendChild(cell)
            }
            else {
                var cell = htmlToElement('<div>{{row.' + this.column.field + '}}</div>')
                this.$compile(cell)
                this.$el.appendChild(cell)
            }
        },
        methods: {
            callback() {
                this.$emit('cell-callback', this.row, arguments)
            }
        }
    }
</script>
<template>
  <div></div>
</template>

<script>

        function htmlToElement(html) {
            var template = document.createElement('template');
            template.innerHTML = html;
            return template.content.firstChild;
        }

export default {
  props: ['row', 'col'],
  ready() {
    if (this.col.formatter) {
      var cell = htmlToElement(this.col.formatter)
      this.$compile(cell)
      this.$el.appendChild(cell)
    }
    else {
      var cell = htmlToElement('<div>{{row.' + this.col.field + '}}</div>')
      this.$compile(cell)
      this.$el.appendChild(cell)
    }
  },
  methods: {
    callback() {
      this.$emit('callback', this.row)
    },
  },
  data() {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      msg: 'Hello Vue!'
    }
  }
}
</script>

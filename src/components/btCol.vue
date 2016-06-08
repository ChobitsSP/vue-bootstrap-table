<template>
    <div class="th-inner {{sort_class}}" @click="change_sort()" :class="{ 'sortable both' : column.sortable }">
        {{column.title}}
    </div>
    <div class="fht-cell">
    </div>
</template>

<script>
export default {
  props: ['column', 'pager'],
  data () {
    return {
      sort_class: ''
    }
  }
  methods: {
    change_sort() {
      
      
    }




  }
}
</script>
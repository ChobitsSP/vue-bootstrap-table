'use strict';

var vue = require('vue');

var directive = {
    params: ['array'],
    twoWay: true,
    bind: function () {
        this.handler = function () {
            var arr = []
            if (this.el.checked) {
                this.params.array.forEach(function (item) {
                    arr.push(item)
                })
            }
            this.set(arr)
        }.bind(this)

        this.el.addEventListener('click', this.handler)
    },
    update: function (newVal) {
        var checked = newVal.length === this.params.array.length
        this.el.checked = checked
        this.el.indeterminate = !checked && newVal.length > 0
    },
    unbind: function () {
        this.el.removeEventListener('click', this.handler)
    }
}

var mixin = {
  directives: { selectAll: directive },
};

exports.directive = directive;
exports.mixin = mixin;
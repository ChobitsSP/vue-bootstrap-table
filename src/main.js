import btTable from 'components/btTable'
import btPager from 'components/btPager'
import btCol from 'components/btCol'
import btCell from 'components/btCell'
import btColGroup from 'components/btColGroup'

let VueStrapTable = {
    btTable,
    btColGroup
};

window.VueStrapTable = VueStrapTable;

if (typeof define === 'function' && define.amd) {
    define(function () {
        return VueStrapTable
    })
} else if (typeof module === 'object' && module.exports) {
    module.exports = VueStrapTable
} else {
    window.VueStrapTable = VueStrapTable
}
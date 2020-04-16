import { VueConstructor } from 'vue';

import int from './int';
import intArr from './int.arr';
import float from './float';
import tableSticky from './table.sticky';
import stickyFooter from './sticky.footer';

export default {
  install(Vue: VueConstructor) {
    /* 仅允许输入数字的输入框 */
    Vue.directive('int', int);
    /* 仅允许输入浮点数的输入框 */
    Vue.directive('float', float);
    /* 仅允许输入数字，且可输入多个的输入框，用Util.blankToComma */
    Vue.directive('intArr', intArr);
    // 用在el-table上，sticky表头
    Vue.directive('tableSticky', tableSticky);
    // sticky底部
    Vue.directive('stickyFooter', stickyFooter);
  },
};

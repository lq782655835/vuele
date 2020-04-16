import { VueConstructor } from 'vue';
import {
  date, datetime, currency, percent, placeholder,
} from './filter';

export default {
  install(Vue: VueConstructor) {
    const vm = Vue;
    Vue.filter('date', date);
    Vue.filter('datetime', datetime);

    Vue.filter('currency', currency);
    Vue.filter('percent', percent);
    Vue.filter('placeholder', placeholder);
    vm.prototype.$formatter = {
      date, datetime, currency, percent, placeholder,
    };
  },
};

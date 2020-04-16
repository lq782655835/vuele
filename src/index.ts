import './styles/index.scss';

import BaseComponents from './components/base';
import CompositeComponents from './components/composite';
import UnitElementComponents from './components/element';
import UnitComponents from './components/unit';

import authMixin from './mixins/auth';
import listMixin from './mixins/list';
import selectMixin from './mixins/select';
import validateMixin from './mixins/validate';

import * as Utils from './utils';

import Directives from './directives';

import Filters from './filters';

const install = (Vue, options?: any) => {
  if ((install as any).installed) return;

  // 按需引入
  Vue.use(UnitComponents);
  Vue.use(UnitElementComponents);
  Vue.use(BaseComponents);
  Vue.use(CompositeComponents);
  Vue.use(Filters);
  Vue.use(Directives);
  Object.defineProperty(Vue, '$VUELE', {
    configurable: false,
    enumerable: false,
    writable: false,
    value: options,
  });
};

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default { install };
// 懒加载
export const utils = Utils;
export const AuthMixin = authMixin;
export const ListMixin = listMixin;
export const SelectMixin = selectMixin;
export const ValidateMixin = validateMixin;

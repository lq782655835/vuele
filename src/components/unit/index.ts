import { VueConstructor } from 'vue';
import ULayout from './u-layout.vue';

const components = {
  ULayout,
};

const install = (Vue: VueConstructor) => {
  Object.values(components).forEach((component: any) => {
    Vue.component(component.componentName || component.name, component);
  });
};

export default {
  install,
  ...components,
};

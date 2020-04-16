import { VueConstructor } from 'vue';
import UElCheckboxGroup from './u-el-checkbox-group.vue';
import UElDate from './u-el-date.vue';
import UElDialog from './u-el-dialog.vue';
import UElDropdown from './u-el-dropdown.vue';
import UElInputNumber from './u-el-input-number.vue';
import UElInput from './u-el-input.vue';
import UElRadioGroup from './u-el-radio-group.vue';
import UElSelect from './u-el-select.vue';
import UElTooltip from './u-el-tooltip.vue';

const components = {
  UElCheckboxGroup,
  UElDate,
  UElDialog,
  UElDropdown,
  UElInputNumber,
  UElInput,
  UElRadioGroup,
  UElSelect,
  UElTooltip,
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

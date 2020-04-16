import { VueConstructor } from 'vue';
import KSDetailHeader from './KSDetailHeader/index.vue';
import KSError from './KSError/index.vue';
import KSResult from './KSResult/index.vue';
import KSOperationLog from './KSOperationLog/index.vue';
import KSLeftTree from './KSLeftTree/index.vue';
import KSOperationCard from './KSOperationCard/index.vue';
import KSLabel from './KSLabel/index.vue';
import KSExportFile from './KSExportFile/index.vue';
import KSRouterInfo from './KSRouterInfo/index.vue';
import KSProcess from './KSProcess/index.vue';
import KSArrange from './KSArrange/index.vue';

const components = {
  KSDetailHeader,
  KSError,
  KSResult,
  KSOperationLog,
  KSLeftTree,
  KSOperationCard,
  KSRouterInfo,
  KSLabel,
  KSExportFile,
  KSProcess,
  KSArrange,
};

const install = (Vue: VueConstructor) => {
  Object.values(components).forEach((component: any) => {
    Vue.component(component.componentName, component);
  });
};

export default {
  install,
  ...components,
};

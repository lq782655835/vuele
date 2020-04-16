import { VueConstructor } from 'vue';
import VueClipboard from 'vue-clipboard2';
import { $dialog } from './KSDialog';
import KSDivider from './KSDivider/index.vue';
import KSImagePreview from './KSImagePreview/index.vue';
import KSImportFile from './KSImportFile/index.vue';
import KSSearch from './KSSearch/index.vue';
import KSSelect from './KSSelect/index.vue';
import KSText from './KSText/index.vue';
import KSTreeSelect from './KSTreeSelect/index.vue';
import KSValidation from './KSValidation/index.vue';
import KSClipboard from './KSClipboard/index.vue';
import KSMultiCascader from './KSMultiCascader/index.vue';
import KSSourceProvider from './KSSourceProvider';
import KSAuthProvider from './KSAuthProvider';
import KSAuth from './KSAuthProvider/KsAuth';
import KSRemoteSelect from './KSRemoteSelect/index.vue';
import KSUpload from './KSUpload/index.vue';

const components = {
  KSDivider,
  KSImagePreview,
  KSImportFile,
  KSSearch,
  KSSelect,
  KSText,
  KSTreeSelect,
  KSValidation,
  KSMultiCascader,
  KSSourceProvider,
  KSClipboard,
  KSAuthProvider,
  KSAuth,
  KSRemoteSelect,
  KSUpload,
};

const install = (Vue: VueConstructor) => {
  Object.values(components).forEach((component: any) => {
    Vue.component(component.componentName, component);
  });

  /* eslint no-param-reassign: 0 */
  Vue.prototype.$preview = (KSImagePreview as any).preview;

  Vue.prototype.$dialog = $dialog;

  Vue.prototype.$import = KSImportFile;

  Vue.use(VueClipboard);
};

export default {
  install,
  ...components,
};

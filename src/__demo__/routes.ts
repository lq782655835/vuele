import remoteSelect from './views/remoteSelect.vue';
import test from './views/test.vue';
import cascader from './views/cascader.vue';
import sourceProvider from './views/sourceProvider.vue';
import upload from './views/upload.vue';
import authProvider from './views/authProvider.vue';
import ai from './views/ai.vue';

export default [
  {
    name: 'test',
    path: '/test',
    component: test,
  },
  {
    name: 'remoteSelect',
    path: '/remoteSelect',
    component: remoteSelect,
  },
  {
    name: 'cascader',
    path: '/cascader',
    component: cascader,
  },
  {
    name: 'sourceProvider',
    path: '/sourceProvider',
    component: sourceProvider,
  },
  {
    name: 'upload',
    path: '/upload',
    component: upload,
  },
  {
    name: 'authProvider',
    path: '/authProvider',
    component: authProvider,
  },
  {
    name: 'ai',
    path: '/ai',
    component: ai,
  },
];

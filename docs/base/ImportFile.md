# 文件导入

:::demo
```vue
<template>
  <div>
    <el-button type="primary" @click="importFileModalVisible=true">导入</el-button>
    <ks-import-file
      :visible.sync="importFileModalVisible"
      :importUrl="importUrl"
      :templateUrl="templateUrl"
      :tips="importFileTips"
      :onLoadInterceptor="onLoadInterceptor"/>
  </div>
</template>
<script>
export default {
    data() {
      return {
        importFileModalVisible: false,
        importUrl: 'http://seven-kl.netease.com/docs/27432/',
        templateUrl: 'https://haitao.nos.netease.com/98b338f0-fdca-4502-9c69-1cbf4556a6a7.key',
        importFileTips: ['hello', 'tip'],
      }
    },
    methods: {
      onLoadInterceptor(e) {
        console.log(e)
      }
    }
}
</script>
```
:::
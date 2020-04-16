# 弹窗

:::demo
```vue
<template>
  <div>
    <el-button @click="showDialog">JS API 打开弹窗</el-button>
    <el-button @click="showImportDialog">打开ImportFile弹窗</el-button>
  </div>
</template>
<script>

export default {
    methods: {
      showDialog() {
        const $modal = this.$dialog({
          title: '哈乐',
          content: 'this is demo',
          fullscreen: false,
          data: {
            item: {
              test: 123,
            },
          },
          width: '200px',
          customClass: 'hale-test',
        });

        $modal.$on('ok', (params) => {
          console.log(params);
        });
      },
      showImportDialog() {
        this.$import.show({
          importUrl: '',
          templateUrlApi: '/importTemplateUrl',
          onLoadInterceptor(e) {},
        });
      },
    }
}
</script>
```
:::
# 图片预览

:::demo
```vue
<template>
  <el-button @click="onPreviewClick">图片预览</el-button>
</template>
<script>
export default {
  data() {
    return {
      imageList: [{
        name: 'Kaola.jpeg',
        src: 'http://haitao.nos.netease.com/9b73692b3a6b46d2be1de7d3be893834.jpg',
      }, {
        name: 'Music.jpg',
        src: 'http://haitao.nos.netease.com/7dfd9aa492694493be0fc1458d558536.jpg',
      }]
    };
  },
  methods: {
    onPreviewClick() {
      this.$preview(this.imageList);
    }
  }
};
</script>
```
:::
<template>
    <ks-upload
        listType="card"
        v-model="fileList"
        :multiple="true"
        action="https://nos.kaolafed.com/upload"
        accept=".xls,.xlsx,.jpg"
        :limit="5"
        maxSize="4g"
        :responseHandler="responseHandler"
        @change="onChange"
     />
</template>

<script>
export default {
  data() {
    return {
      fileList: [{
        name: 'Game.jpg',
        url: 'http://haitao.nos.netease.com/906f417c7c964c0798adf9d0bf1b5c8c.jpg',
      }, {
        name: 'Kaola.jpg',
        url: 'http://haitao.nos.netease.com/9b73692b3a6b46d2be1de7d3be893834.jpg',
      }, {
        name: 'IMG_3927.jpg',
        url: 'https://haitao.nos.netease.com/6bb09e32-8184-4b89-92bb-a40a11bf3566.jpg',
      }, {
        name: 'a489adbf-d48f-4f5f-b0e9-3d9b58a16e78.xlsx',
        url: 'https://haitao.nos.netease.com/69cf12cd-17bf-4d71-ba46-54b0c6f854a8.xlsx',
      }],
    };
  },
  methods: {
    onChange(e) {
      console.log(e); // eslint-disable-line
    },
    responseHandler(res) {
      const { name, url } = res;
      return { name, url };
    },
  },
};
</script>

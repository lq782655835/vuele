<template>
  <div>
    <!-- <ks-remote-select v-model="condition.supplierId"
      prefix="qc-complaint"
      skey="supplierList"></ks-remote-select> -->
    <ks-remote-select v-model="supplierId1"
      skey="test"></ks-remote-select>
    <ks-remote-select placeholder="请输入关键字搜索" size="large" multiple v-model="supplierId2"
    skey="first" :ajax-fn="getUrl" />
      <ks-divider :longer="20" dashed />
        <ks-divider>text</ks-divider>
        <ks-divider align="left">text</ks-divider>
        <ks-divider align="right" dashed>text</ks-divider>

        <ks-divider>
            <el-button>aaa</el-button>
        </ks-divider>
  </div>
</template>

<script>
import { jsonApi } from '../../request';

export default {
  data() {
    return {
      supplierId1: '',
      supplierId2: [],
    };
  },
  methods: {
    getUrl() {
      return params => jsonApi.get('https://api.jsonbin.io/b/5d4850c0f090a4338579b7ea', { params });
    },
  },
};
</script>

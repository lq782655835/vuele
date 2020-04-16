# 审核

:::demo
```vue
<template>
  <ks-detail-header
    header="多元修复关节 缓解疼痛 汤臣倍健 升级版氨糖软骨素钙片 120片/瓶"
    status="待考拉审核"
    desc="复杂业务的页面，可以在页面标题下，添加简单文字描述页面功能">
    <template slot="operation">
        <el-button >审核驳回</el-button>
        <el-button type="primary" >审核通过</el-button>
    </template>
    <template slot="operation-more">
        <el-dropdown-item>黄金糕</el-dropdown-item>
    </template>
  </ks-detail-header>
</template>
```
:::
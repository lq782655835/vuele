<template>
  <el-tooltip effect="dark" content="点击复制" placement="top">
    <i class="ks-clipboard el-icon-document"
       v-clipboard:copy="content"
       v-clipboard:success="onCopy"
       v-clipboard:error="onError"
    ></i>
  </el-tooltip>
</template>

<script lang="ts" src="./index.ts"></script>
<style scoped lang="scss" src="./index.scss"></style>

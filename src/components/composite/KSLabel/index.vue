<template>
    <el-form-item :label="labelName">
      <span class="ks-label__text">{{labelValue}}</span>
      <slot name="content"/>
    </el-form-item>
</template>
<script lang="ts" src="./index.ts"></script>
<style scoped lang="scss" src="./index.scss"></style>

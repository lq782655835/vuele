<template>
  <div class="ks-result">
    <div v-if="type == 'success'" class="ks-result__icon">
      <i class="el-icon-circle-check"/>
    </div>
    <div v-else class="ks-result__icon">
      <i class="el-icon-circle-close"/>
    </div>
    <div class="ks-result__title">{{ title || type == 'success' ? '提交成功' : '提交失败'}}</div>
    <div :class="{'ks-result__description': $slots.description}">
      <slot name="description"/>
    </div>
    <div :class="{'ks-result__extra': $slots.extra}">
      <slot name="extra"/>
    </div>
    <div :class="{'ks-result__actions': $slots.actions}">
      <slot name="actions"/>
    </div>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>
<style scoped lang="scss" src="./index.scss"></style>

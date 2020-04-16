<template>
  <div class="ks-divider"
       :class="[
        'ks-divider--' + type,
        hasChild ? 'ks-divider-text--' + align : '',
        {'ks-divider-text': hasChild, 'ks-divider-text--dashed':
        dashed&&hasChild, ' ks-divider--dashed': dashed},
    ]"
       :style="longer ? longerStyle : null">
    <div v-if="hasChild" class="ks-divider-inner-text">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>
<style scoped lang="scss" src="./index.scss"></style>

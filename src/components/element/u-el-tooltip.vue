<template>
    <el-tooltip
        :placement="placement"
        v-bind="$attrs"
        v-on="$listeners"
        class="u-el-tooltip"
    >
        <slot><i class="el-icon-question"/></slot>
    </el-tooltip>
</template>

<script>
export default {
  name: 'u-el-tooltip',
  props: {
    placement: { type: String, default: 'top' }, /* 默认定位top */
  },
};
</script>

<style lang="scss" scoped>
$text-color: #666666;
.u-el-tooltip {
    color: $text-color;
}
</style>

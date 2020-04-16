<template>
    <div class="u-el-input-number">
        <el-input-number v-model="num" :min="min" v-bind="$attrs" v-on="$listeners" />
        {{ suffix }}
    </div>
</template>

<script>
export default {
  name: 'u-el-input-number',
  props: {
    value: Number,
    suffix: String,
    min: { type: Number, default: 0 }, /* 默认下限为0 */
  },
  computed: {
    num: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val);
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.u-el-input-number {
    display: inline-block;
    position: relative;
}
</style>

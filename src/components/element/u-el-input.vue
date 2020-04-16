<template>
    <el-input v-model="inputValue" v-bind="$attrs" v-on="$listeners" class="u-el-input">
        <template v-if="prepend" slot="prepend">{{prepend}}</template>
        <template v-if="append" slot="append">{{append}}</template>
    </el-input>
</template>

<script>
export default {
  name: 'u-el-input',
  props: {
    value: [String, Number],
    prepend: String,
    append: String,
  },
  computed: {
    inputValue: {
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

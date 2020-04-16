<template>
    <div>
        {{value}}
        {{item.test}}
        <el-input v-model="item.test"></el-input>
    </div>
</template>


<script>
export default {
  props: {
    value: {},
  },
  data() {
    return {
      item: JSON.parse(JSON.stringify(this.value.item)),
    };
  },
  methods: {
    async validate() {
      return true;
    },

    async ok() {
      this.$message('ok success');

      this.$emit('ok', {
        value: '123',
      });
    },

    async beforeClose() {
      this.$message('interrupt close');
      return true;
    },
  },
};
</script>

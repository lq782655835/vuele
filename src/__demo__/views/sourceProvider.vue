<template>
  <div>
    <ks-source-provider :throttle-time="150">
      <el-form label-width="150px" label-position="left">
        <el-form-item label="原有用法">
          <ks-select :source="source"/>
        </el-form-item>
        <el-form-item label="固定key: test">
          <ks-select source-key="test" :limit="3"/>
        </el-form-item>
        <el-form-item :label="`动态key: ${firstKey}`">
          <ks-select :source-key="firstKey"/>
        </el-form-item>
        <el-form-item v-for="k in keys" :key="k" :label="`新增下拉key: ${k}`">
          <ks-select :source-key="k"/>
        </el-form-item>
      </el-form>
    </ks-source-provider>

    <ks-divider/>

    <div>
      <p>点击前打开控制台观察Network</p>
      <el-button @click="onChangeKeyClick">修改动态key</el-button>
      <el-button @click="onAddClick">动态增加三个下拉</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      firstKey: 'first',
      keys: [],
      source: [{ id: 1, name: 'name' }],
    };
  },
  methods: {
    onChangeKeyClick() {
      this.firstKey = (+new Date()).toString();
    },
    onAddClick() {
      // eslint-disable-next-line
      for (let i = 0; i < 3; ++i) {
        this.keys.push(`${Math.floor(Math.random() * 1000)}`);
      }
    },
  },
};
</script>

<style scoped>
</style>

# v-int/v-float

:::demo
```vue
<template>
  <div class="f-mt20">
    <p>只能输入数字</p>
    <el-form ref="form" :model="obj" :rules="rules">
      <el-form-item prop="test1">
          <el-input v-model="obj.test1" v-int maxlength="3" />
      </el-form-item>
      <el-form-item prop="test2">
          <el-input v-model="obj.test2" v-float:3 />
      </el-form-item>
    </el-form>
    <el-button @click="getValue">取值</el-button>
    <el-button @click="setValue">设值</el-button>
  </div>
</template>
<script>
export default {
    data() {
      return {
        obj: {
          test1: 'hahaha',
          test2: 'wwwwwww',
          test3: 'dasdfdrgra',
        },
        rules: {
          test1: [{ required: true, message: '请输入' }],
        },
      }
    },
    methods: {
      getValue() {
        console.log(this.obj.test1, this.obj.test2);
      },
      setValue() {
        this.$refs.form.resetFields();
        this.obj.test1 = '';
        this.obj.test2 = '';
      },
    }
}
</script>
```
:::
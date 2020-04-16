# 操作日志

:::demo
```vue
<template>
  <ks-operation-log :list="logList">
      <template v-slot:extend>
        <el-button size="sm">备注</el-button>
      </template>
    </ks-operation-log>
</template>
<script>
export default {
    data() {
      return {
        logList: Array(10).fill('').map(s => ({
            author: '张三',
            date: '15年8月11日 11:23',
            content: '总裁审批：批准',
            remark: '我觉得很好我觉得很好我觉得很好我觉得很好我觉得很好我觉得很好我觉得很好',
          }))
      }
    }
}
</script>
```
:::
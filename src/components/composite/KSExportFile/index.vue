<template>
  <el-dialog
    :title="title"
    :visible="visible"
    :close-on-click-modal="false"
    width="680px"
    append-to-body
    @close="close"
  >
    <div v-if="type==='confirm'">
      <p class="ks-export-confirm__item">您确认要导出当前查询条件下的所有数据吗？</p>
      <p class="ks-export-confirm__item">确认导出后，数据将以邮件的形式发送到您的工作邮箱</p>
    </div>

    <div v-if="type==='rangeCheck'">
      <p>请选择导出范围</p>
      <el-radio-group v-model="range" class="ks-export-range">
        <el-radio :label="1">当前筛选条件下所有数据</el-radio>
        <el-radio :label="2">当前页选中数据</el-radio>
      </el-radio-group>
    </div>

    <div slot="footer" class="f-tac">
      <el-button @click="close">取消</el-button>
      <el-button type="primary" @click="exportFile">确认导出</el-button>
    </div>
  </el-dialog>
</template>

<script lang="ts" src="./index.ts"></script>
<style scoped lang="scss" src="./index.scss"></style>

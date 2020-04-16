<template>
  <div class="ks-router-info-block">
    <el-table
      :data="list"
      :cell-class-name="setCellClassName"
      max-height="500"
      empty-text="暂无信息"
      class="ks-router-table"
      row-class-name="ks-router-table__row"
      header-cell-class-name="ks-router-table__header-cell"
    >
      <el-table-column key="router-step" v-if="columns.length" width="40">
        <template>
          <div class="ks-router-table-step">
            <span class="ks-router-table-step__line ks-router-table-step__line--up"/>
            <span class="ks-router-table-step__line ks-router-table-step__line--down"/>
          </div>
          <span class="ks-router-table-step__radio"/>
        </template>
      </el-table-column>
      <el-table-column v-for="(column, index) in columns" :key="index" v-bind="column">
        <template slot-scope="scope">
          <table-column-template :scope="scope" :column="column"/>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>
<style scoped lang="scss" src="./index.scss"></style>

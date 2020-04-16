<template>
  <el-card class="ks-card" :class="{collapse: !active}">
    <template slot="header">
      <span>{{header}}</span>
      <span class="ks-card__subHeader">{{subHeader}}</span>
      <div class="ks-card-operation">
        <slot name="operation"></slot>
        <el-button
          v-if="collapse"
          type="text"
          class="ks-card-operation__collapse"
          @click="active = !active"
        >
          {{active ? '收起' : '展开'}}
          <i v-if="active" class="el-icon-arrow-up"></i>
          <i v-else class="el-icon-arrow-down"></i>
        </el-button>
      </div>
    </template>
    <slot v-if="active"/>
  </el-card>
</template>

<script lang="ts" src="./index.ts"></script>
<style scoped lang="scss" src="./index.scss"></style>

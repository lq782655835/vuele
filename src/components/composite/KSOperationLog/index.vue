<template>
  <div class="ks-log-block">
    <div v-if="format==='oneline'" class="ks-log-ctn">
      <el-row v-for="(item, index) in list" :key="index" class="ks-log-row ks-log-row--oneline">
        <el-col :span="4">
          <span class="log__author ks-log-font--grey">{{ item[model.author] }}</span>
        </el-col>
        <el-col :span="14">
          <el-row>
            <span :title="item.content">{{ item[model.content] }}</span>
            <span
              v-if="item.remark"
              :title="item.remark"
              class="ks-log__remark ks-log-font--grey"
            >备注：{{ item[model.remark] }}</span>
          </el-row>
          <el-row><slot name="extend" :item="item"></slot></el-row>
        </el-col>
        <el-col :span="6" align="right">
          <span v-if="timestamp" class="ks-log-font--grey">{{item[model.date] | datetime}}</span>
          <span v-else class="ks-log-font--grey">{{item[model.date]}}</span>
        </el-col>
      </el-row>
    </div>
    <div v-else class="ks-log-ctn">
      <el-row v-for="(item, index) in list" :key="index" class="ks-log-row">
        <el-col :span="12">
          <span class="log__author ks-log-font--grey">{{ item[model.author] }}</span>
        </el-col>
        <el-col :span="12" align="right">
          <span v-if="timestamp" class="ks-log-font--grey">
            {{ item[model.date] | datetime }}
          </span>
          <span v-else class="ks-log-font--grey">{{ item[model.date] }}</span>
        </el-col>
        <el-col :span="24">
          <span class="log__content">{{ item[model.content] }}</span>
        </el-col>
        <el-col v-if="item.remark" :span="24">
          <span
            :title="item.remark"
            class="log__remark ks-log-font--grey"
          >备注：{{ item[model.remark] }}</span>
        </el-col>
      </el-row>
    </div>
    <div v-if="!list || !list.length">暂无日志</div>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>
<style scoped lang="scss" src="./index.scss"></style>

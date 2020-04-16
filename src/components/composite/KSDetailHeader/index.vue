<template>
  <div class="ks-header">
    <el-card shadow="hover">
      <div class="ks-header-title">
        <el-row>
          <el-col :span="16">
            <el-row>
              <el-col :span="subHeader ? 12 : 24">
                <span class="ks-header-title">{{header}}</span>
              </el-col>
              <el-col v-if="subHeader" :span="12">
                <span class="ks-header-title">{{subHeader}}</span>
              </el-col>
              <el-col v-if="desc" :span="24">
                <span class="ks-header-desc">{{desc}}</span>
              </el-col>
              <el-col v-if="status" :span="24">
                <el-tag class="ks-header__status" size="small">
                  {{status}}
                  <i class="el-icon-info"></i>
                </el-tag>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="8" align="right">
            <el-dropdown class="ks-header-operation__more" v-if="showMore">
              <el-button type="primary">更多</el-button>
              <el-dropdown-menu slot="dropdown">
                <slot name="operation-more"/>
              </el-dropdown-menu>
            </el-dropdown>
            <slot name="operation"/>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24" v-if="showDetail">
            <ks-divider :longer="24" />
            <slot name="detail"/>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>
<script lang="ts" src="./index.ts"></script>
<style scoped lang="scss" src="./index.scss"></style>

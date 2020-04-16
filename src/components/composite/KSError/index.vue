<template>
  <div class="ks-error-page">
    <div class="ks-error-ctn">
      <div
        class="ks-error-img"
        :class="{'ks-error-img--notfind': code === 404}"
        :style="{ backgroundImage: `url(${error.imgSrc})` }"
      ></div>
      <div class="ks-error-notice">
        <p class="ks-error-notice__title">{{ error.msg }}</p>
        <p class="ks-error-notice__desc">{{ error.subMsg }}</p>
        <el-button v-if="code !== 402" type="primary" @click="handleGotoIndex">返回首页</el-button>
        <!-- <router-link name="" :to="indexPath" v-if="code !== 402" > -->
        <!-- <el-button v-if="code !== 402" type="primary" >返回首页</el-button> -->
        <!-- </router-link> -->
        <el-button v-else type="primary" @click="createNew">新建内容</el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>
<style scoped lang="scss" src="./index.scss"></style>

<template>
  <el-dialog
          ref="dialog"
          visible
          :width="width"
          :custom-class="customClass"
          :title="title"
          :fullscreen="fullscreen"
          :close-on-click-modal="false"
          :close-on-press-escape="false"
          :before-close="beforeClose"
          @close="close">

    <div v-if="html" v-html="html" ref="content"></div>
    <component v-else
               v-model="data"
               :is="dialogContent"
               ref="content"></component>

    <div v-if="showFooter" slot="footer">
      <el-button
              :disabled="disableCancel"
              @click="cancel"
              v-if="cancelButton">
        {{ cancelButton }}
      </el-button>

      <el-button
              :disabled="disableOk"
              type="primary"
              v-if="okButton"
              @click="ok">
        {{ okButton }}
      </el-button>
    </div>
  </el-dialog>
</template>

<script lang="ts" src="./index.ts"></script>
<style scoped lang="scss" src="./index.scss"></style>

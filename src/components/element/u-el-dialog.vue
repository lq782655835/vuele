<template>
    <el-dialog
        :visible.sync="show"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        v-bind="$attrs"
        v-on="$listeners"
        class="u-el-dialog"
    >
        <slot></slot>
        <div class="footer" v-if="$slots.footer"><slot name="footer"></slot></div>
    </el-dialog>
</template>

<script>
export default {
  name: 'u-el-dialog',
  props: {
    visible: Boolean,
  },
  computed: {
    show: {
      get() {
        return this.visible;
      },
      set(newValue) {
        this.$emit('update:visible', newValue);
      },
    },
  },
};
</script>

<style lang="scss" scoped>
$base-top: 24px;
.u-el-dialog {
    /deep/ .el-dialog {
        padding: $base-top 32px;

        .el-dialog__header {
            padding: 0;
            padding-bottom: $base-top;
            .el-dialog__title {
                font-size: 16px;
                color: #666;
            }

            .el-dialog__headerbtn {
                font-size: 18px;
                right: $base-top + 2px;
                top: $base-top;
            }
        }

        .el-dialog__body {
            padding: 0;
        }
    }
    .footer {
        display: flex;
        justify-content: flex-end;
        margin-top: $base-top;
    }
}
</style>

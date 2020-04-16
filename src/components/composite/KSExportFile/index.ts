import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class KsExportFile extends Vue {
  public static componentName = 'KsExportFile';

  range = 1;

  @Prop({ type: String, default: '导出' })
  public title!: string;

  // confirm: 二次提示 | rangeCheck: 导出范围选择
  @Prop({ type: String, default: 'confirm' })
  public type!: string;

  @Prop({ type: Boolean, default: false })
  public visible!: boolean;

  close() {
    this.$emit('close');
    // 父组件直接直接通过visible.sync进行双向绑定
    this.$emit('update:visible', false);
  }

  async exportFile() {
    this.$emit('export', {
      range: this.range,
    });
    this.close();
  }
}

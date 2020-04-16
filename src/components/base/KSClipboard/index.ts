import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class KsClipboard extends Vue {
  public static componentName = 'KsClipboard';

  @Prop({ type: String, default: '' })
  public content!: string;

  public onCopy() {
    (this as any).$message({
      message: '复制成功',
      type: 'success',
    });
  }

  public onError() {
    (this as any).$message({
      message: '复制失败',
      type: 'error',
    });
  }
}

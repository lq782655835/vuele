import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class KsDivider extends Vue {
  public static componentName = 'KsDivider';

  /* 分割线类型 horizontal/vertical */
  @Prop({ type: String, default: 'horizontal' })
  public type!: string;

  /* 文本位置 left/center/right */
  @Prop({ type: String, default: 'center' })
  public align!: string;

  /* 是否虚线 */
  @Prop({ type: Boolean, default: false })
  public dashed!: boolean;

  /* longer,两边加长的长度 */
  @Prop({ type: Number, default: 0 })
  public longer!: number;

  get hasChild() {
    return this.$slots.default;
  }

  get longerStyle() {
    const style: any = {};
    style.width = 'auto';
    style['margin-left'] = `-${this.longer}px`;
    style['margin-right'] = `-${this.longer}px`;
    return style;
  }
}

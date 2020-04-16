import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class KsLabel extends Vue {
  public static componentName = 'KsLabel';

  // 标签名
  @Prop({ type: String, default: '' })
  private labelName!: string;

  // 标签值
  @Prop({ type: [String, Number], default: '' })
  public labelValue!: string | number;
}

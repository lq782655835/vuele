import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class KsResult extends Vue {
  public static componentName = 'KsResult';

  // 结果的标题
  @Prop({ type: String, default: '' })
  public title!: string;

  // 结果的类型 success error
  @Prop({ type: String, default: 'success' })
  public type!: string;
}

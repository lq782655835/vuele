import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class KsOperationCard extends Vue {
  public static componentName = 'KsOperationCard';

  active = true;

  // 结果的标题
  @Prop({ type: String, default: '' })
  public header!: string;

  @Prop({ type: String, default: '' })
  public subHeader!: string;

  @Prop({ type: Boolean, default: false })
  public collapse!: boolean;
}

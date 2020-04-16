import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class KsDetailHeader extends Vue {
  public static componentName = 'KsDetailHeader';

  @Prop({ type: String, default: '' })
  public header!: string;

  @Prop({ type: String, default: '' })
  public subHeader!: string;

  @Prop({ type: String, default: '' })
  public status!: string;

  @Prop({ type: String, default: '' })
  public desc!: string;

  @Prop({ type: Boolean, default: false })
  public showDetail!: boolean;

  @Prop({ type: Boolean, default: false })
  public showMore!: boolean;
}

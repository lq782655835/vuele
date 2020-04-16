import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class KsOperationLog extends Vue {
  public static componentName = 'KsOperationLog';

  @Prop({ type: String, default: 'oneline' })
  public format!: string;

  @Prop({ type: Array, default: () => [] })
  public list!: any[];

  @Prop({
    type: Object,
    default: () => ({
      author: 'author',
      date: 'date',
      content: 'content',
      remark: 'remark',
    }),
  })
  public model!: object;

  @Prop({ type: Boolean, default: false })
  public timestamp!: boolean;
}

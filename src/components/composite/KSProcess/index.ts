import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class KsProcess extends Vue {
  public static componentName = 'KsProcess';

    // 当前进度节点
    @Prop({ type: Number, default: 0 })
    public active!: number;

    // 数据源
    @Prop({ type: Array, default: () => [] })
    public source!: any;

    // 模块命名
    @Prop({ type: String, default: '流程进度' })
    public name!: string;

    // 数据源替换key
    @Prop({
      type: Object,
      default: () => ({
        title: 'title',
        operator: 'operator',
        status: 'status',
        beginTime: 'beginTime',
        endTime: 'endTime',
        reason: 'reason',
        remark: 'remark',
        link: 'link',
        linkName: 'linkName',
        description: 'description',
        id: 'id',
      }),
    })
    public model!: object;
}

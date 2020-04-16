import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class Mixin extends Vue {
  // value
  @Prop({ default: () => [] }) value!: any;

  // 每行展示个数
  @Prop({ type: Number, default: 4 }) numPerLine!: number;

  // upload类型，取值list或card
  @Prop({ type: String, default: 'list' }) listType!: string;

  // fileList
  // @Prop({ type: Array, default: () => [] }) fileList!: any;

  // 是否支持多选上传
  @Prop({ type: Boolean, default: false }) multiple!: boolean;

  // 是否携带cookie
  @Prop({ type: Boolean, default: false }) withCredentials!: boolean;

  // 设置上传的请求头部
  @Prop({ type: Object, default: () => {} }) headers!: any;

  // 上传文件键值
  @Prop({ type: String, default: 'file' }) name!: string;

  // 文件过滤
  @Prop({ type: String, default: '*' }) accept!: string;

  // 额外数据
  @Prop({ type: Object, default: () => {} }) data!: any;

  // 上传地址
  @Prop({ type: String, default: '' }) action!: string;

  // 自定义上传响应处理器
  @Prop({ type: Function, default: () => true }) responseHandler!: any;

  // 文件个数限制
  @Prop({ type: Number, default: Infinity }) limit!: number;

  // 单个文件大小限制
  @Prop({ type: String, default: 'G' }) maxSize!: string;

  @Prop({ type: Boolean, default: false }) readonly!: boolean;

  @Prop({ type: Boolean, default: true }) autoUpload!: boolean;

  // mode=1: 上传到nos，后端需返回name: String, url: String, success: Boolean
  // mode=2: 单纯上传文件到后端，对响应无要求，直接emit success和数据
  // @Prop({ type: Number, default: 1 }) mode!: number;

  // flag标记增删模式：flag: 0, 新增的文件; 1, 已经上传未被删除的文件，2，已经上传被删除的文件
  @Prop({ type: Boolean, default: false }) flagMode!: boolean;

  private get params() {
    return {
      fileList: this.value,
      numPerLine: this.numPerLine,
      multiple: this.multiple,
      name: this.name,
      accept: this.accept,
      data: this.data,
      action: this.action,
      responseHandler: this.responseHandler,
      limit: this.limit,
      maxSize: this.maxSize,
      readonly: this.readonly,
      autoUpload: this.autoUpload,
      // mode: this.mode,
      flagMode: this.flagMode,
    };
  }
}

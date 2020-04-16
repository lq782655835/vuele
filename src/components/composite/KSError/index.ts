import { Vue, Component, Prop } from 'vue-property-decorator';

const resourceMap = {
  401: {
    msg: '无权限访问',
    subMsg: '抱歉，你无权访问该页面',
    imgSrc: '//haitao.nos.netease.com/fefb55b9-4b26-4354-9a1e-39d586570297.jpeg',
  },
  402: {
    msg: '空页面',
    subMsg: '当前页面是空的',
    imgSrc:
      '//haitao.nos.netease.com/43d679d6-d4ff-4bae-be2d-5a14f6745045_389_388.png',
  },
  404: {
    msg: '404！出错了',
    subMsg: '抱歉，您访问的页面不存在',
    imgSrc: '//haitao.nos.netease.com/1858af16-d826-4903-a408-1232d2859119.jpeg',
  },

  500: {
    msg: '服务器出错',
    subMsg: '抱歉，服务器出错了',
    imgSrc: '//haitao.nos.netease.com/23e5b723-0325-4962-9e21-cf08048b0bb7.jpeg',
  },
};

@Component
export default class KsError extends Vue {
  public static componentName = 'KsError';

  // 首页路径
  @Prop({ type: String, default: '/' })
  public indexPath!: string;

  // 报错码 401 402 404 500
  @Prop({
    type: Number,
    default: 401,
    // validator: (errorCode: any) => Object.keys(resourceMap).indexOf(parseInt(errorCode)) === -1
  })
  public code!: number | string;

  error = resourceMap[this.code];

  // 新建内容
  createNew() {
    this.$emit('createNewPage');
  }

  // 回到主页
  handleGotoIndex() {
    window.location.href = `${window.location.origin}${this.indexPath}`;
  }
}

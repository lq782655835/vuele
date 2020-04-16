import { Vue, Component, Prop } from 'vue-property-decorator';
import axios from 'axios';

import { jsonApi } from '../../../request';

@Component
export default class KsImportFile extends Vue {
  public static componentName = 'KsImportFile';

  @Prop({ type: String, default: '导入' })
  public title!: string;

  @Prop({ type: String, default: '.xlsx,.xls' })
  public accept!: string;

  @Prop({ type: Object, default: () => ({}) })
  public extraData!: object;

  @Prop({ type: String, default: '' })
  public templateUrl!: string;

  @Prop({ type: String, default: '' })
  public templateUrlApi!: string;

  @Prop({ type: String, default: '' })
  public importUrl!: string;

  @Prop({ type: Boolean, default: false })
  public visible!: boolean;

  @Prop({ type: Function, default: res => (res.data || {}) })
  public onLoadInterceptor!: any;

  @Prop({ type: String, default: 'resultUrl' })
  public urlKey!: string;

  @Prop({ type: Array, default: () => ([]) })
  public tips!: string[];

  /* data */
  public status: string = 'init';

  public uploadingPercent: number = 0;

  public uploadingInterval: any = '';

  public resultMessage: string = '';

  public resultUrl: string = '';

  public files: any[] = [];

  public async created() {
    if (this.templateUrlApi) {
      const resp: any = await jsonApi.get(this.templateUrlApi, {});
      const data = resp.result || resp.data || {};
      this.templateUrl = data.downloadUrl || data.url || '';
    }
  }

  get hasFile() {
    return this.files && this.files.length;
  }

  public resetComponent() {
    this.status = 'init';
    this.resultMessage = '';
    this.resultUrl = '';
    this.uploadingPercent = 0;
    this.uploadingInterval = '';
    this.files = [];
  }

  public close() {
    // 父组件直接直接通过visible.sync进行双向绑定
    this.$emit('update:visible', false);
    this.$emit('close');
  }

  public selectFile() {
    const { inputNode } = this.$refs;
    (inputNode as any).click();
  }

  public onFileSelectChange(e) {
    const { files } = e.currentTarget;
    this.files.push(...files);
    (this.$refs.inputNode as any).value = '';
  }

  public onRemoveFile(index) {
    this.files.splice(index, 1);
  }

  public importFile() {
    if (!this.files.length) {
      this.$message.error('请选择文件');
      return;
    }

    const formData = this.createFormData();
    // 系统内可以改成自己的api方式
    const FormAPI = axios.create({
      timeout: 50000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'multipart/form-data',
      },
    });
    FormAPI.interceptors.response.use(
      this.successInterceptor,
      this.errorInterceptor,
    );
    this.status = 'uploading';
    this.uploadingInterval = window.setInterval(() => {
      this.uploadingPercent += 1;
      if (this.uploadingPercent === 100) {
        this.resetTimer();
      }
    }, (60 * 1000) / 100);
    FormAPI.post(this.importUrl, formData);
  }

  public createFormData() {
    const formData = new FormData();
    for (let index = 0; index < this.files.length; index += 1) {
      const file = this.files[index];
      formData.append('file', file);
    }
    Object.entries(this.extraData).forEach(([key, value]) => {
      formData.append(key, value);
    });
    return formData;
  }

  public successInterceptor(response): any {
    this.resetTimer();
    window.setTimeout(() => {
      // 留时间给进度条动画走完
      this.onSuccess(response);
    }, 500);
  }

  public errorInterceptor(e) {
    this.resetTimer();
    window.setTimeout(() => {
      // 留时间给进度条动画走完
      this.onError(e);
    }, 500);
  }

  public resetTimer() {
    window.clearInterval(this.uploadingInterval);
    this.uploadingInterval = '';
    // 重新设置定时器，快速走完进度条
    this.uploadingPercent = 100;
  }

  public onSuccess(response) {
    // 取决于接口的格式
    let res = response;
    res = this.onLoadInterceptor(res);
    const data = res.data || res.result || {};
    if (res.code === 200) {
      this.status = 'success';
      this.resultMessage = res.message || '导入成功';
    } else {
      this.status = 'fail';
      this.resultMessage = res.message || '导入失败，请检查文档内容，修改后重新导入';
      this.resultUrl = data[this.urlKey] || data.url || res[this.urlKey];
    }
  }

  public onError(e) {
    this.status = 'fail';
    this.resultMessage = '导入失败，请检查文档内容，修改后重新导入';
    // 交互验收，需要查看  下载报错文档 按钮  , 下面代码使用时删除
    this.resultUrl = '';
  }

  destroyed() {
    const { $el } = this;
    const { parentNode: $parent } = $el;

    if ($parent) {
      $parent.removeChild($el);
    }
  }

  public static show(options: any = {}) {
    const el = document.createElement('div');
    document.body.appendChild(el);

    const instance: any = new KsImportFile({
      el,
      propsData: {
        visible: true,
        ...options,
      },
    });

    instance.$on('close', () => {
      instance.visible = false;
      instance.$destroy();
    });

    return instance;
  }
}

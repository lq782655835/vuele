import {
  Component, Prop, Vue, Watch,
} from 'vue-property-decorator';
import { jsonApi } from '../../../request';

const throttle = (fn : any, wait = 300) => {
  let timer: any = null;
  return (...args: any) => {
    if (!timer) {
      timer = setTimeout(() => {
        fn(...args);
        timer = null;
      }, wait);
    }
  };
};

@Component
export default class RemoteSelect extends Vue {
  public static componentName = 'KsRemoteSelect';

  @Prop({ default: '请搜索' }) public placeholder!: string;

  @Prop({ default: '' }) public skey!: string;

  @Prop({ default: '' }) public value!: any;

  @Prop({ default: '' }) public size!: string;

  @Prop({ default: false }) public multiple!: boolean;

  @Prop() public ajaxFn!: Function;

  public selectValue: any = null;

  public list: any[] = [];

  public _getFuzzySource: any;

  @Watch('value', { immediate: true })
  public onSelectValueChange(newValue, oldValue) {
    if (this.selectValue === newValue) {
      return;
    }

    this.selectValue = newValue;

    let id = newValue;
    if (Array.isArray(newValue)) {
      id = newValue.join(',');
    }
    this.getFuzzySource(null, id);
  }

  public getRemoteSelectApi() {
    const { remoteSelectUrl = null } = Vue.ksvue || {};

    let remoteSelectApi;
    if (remoteSelectUrl) {
      remoteSelectApi = (data: any) => jsonApi.get(remoteSelectUrl(), { params: data });
    }

    if (this.ajaxFn) {
      remoteSelectApi = this.ajaxFn();
    }

    if (!remoteSelectUrl && !this.ajaxFn) {
      throw new Error('请设置remoteSelectUrl 或者 ajaxFn');
    }

    return remoteSelectApi;
  }

  public created() {
    // 判断是否是函数

    this._getFuzzySource = throttle(this.getFuzzySource.bind(this), 20);
  }

  resolveResponse(response) {
    const { resolveCommonReturn = null } = Vue.ksvue || {};
    if (resolveCommonReturn) {
      return resolveCommonReturn(response);
    }
    return response;
  }

  public async getFuzzySource(name: any = '', id = '') {
    const { skey: key } = this;

    if (!key) { return []; }

    const remoteAPI = this.getRemoteSelectApi();

    const response = (await remoteAPI({ key, name, id }) as any);

    const { result } = this.resolveResponse(response);

    if (result) {
      this.list = result.slice(0, 100);
    }
    return this.list;
    // result && (this.list = result.slice(0, 100));
  }

  public onChange() {
    this.$emit('input', this.selectValue);

    this.$nextTick(() => {
      const $selected = (this.$refs.select as any).$data.selected || [];
      let name: any = '';
      if ($selected instanceof Array) {
        name = $selected.map(item => item.$props.label);
      } else {
        name = $selected.$props.label;
      }

      this.$emit('change', {
        name,
        value: this.selectValue,
        ctx: this,
      });
    });
  }
}

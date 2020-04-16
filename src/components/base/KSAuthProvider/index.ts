import {
  Component,
  Prop,
  Provide,
  Emit, Vue,
} from 'vue-property-decorator';

import KsBaseProvider from '../KSBaseProvider';
import { jsonApi } from '../../../request';

export interface AuthItem {
  displayLinkUrl: boolean;
  requestUrl?: string;
  urlKey: string;
}

export interface AuthParam {
  urlKey: string;
  requestUrl: string;
}

@Component
export default class KsAuthProvider extends KsBaseProvider {
  public static componentName = 'KsAuthProvider';

  private isReady = false;

  @Provide('authMaps')
  private authMaps = new Map<string, Map<string, AuthItem>>();

  @Prop({ type: Array, default: (): AuthParam[] => [] })
  private authParam;

  @Prop({ type: String, default: '' })
  private dataAuthUrl;

  @Prop({ type: Object, default: () => {} })
  private dataAuthParam: any;

  @Emit('ready')
  onReady(authUrls) {
    return authUrls;
  }

  async created() {
    try {
      const { dataAuthUrl } = this;
      if (dataAuthUrl) {
        // Step1: 先看是否有查看该页面数据的权限，如果没有跳转无权限页面
        await this.hasPageDataAuth();
      }

      // Step2: 如果可以进入页面，那么加载页面全部的操作权限
      await this.authUrls();
    } catch (e) {
      // 403: 无权限访问
      if (Number(e.code) === 403) {
        window.location.href = Vue.ksvue.unauthorizedUrl;
      } else {
        console.error(e);
      }
    }
  }

  async hasPageDataAuth() {
    const { dataAuthUrl, dataAuthParam } = this;

    try {
      await jsonApi.get(dataAuthUrl, { params: dataAuthParam });
    } catch (e) {
      throw e;
    }
  }

  async authUrls() {
    const {
      authUrl,
      transferAuthResult,
    } = Vue.ksvue;

    if (!authUrl) {
      throw new Error('【KSVUE】缺少参数 >>> 请配置authUrl参数');
    }

    const { authParam } = this;
    const res: any = await jsonApi.post(authUrl, { displayRequestUrls: authParam });
    const result = res.result || {};

    const authUrls = transferAuthResult ? transferAuthResult(result) : result;
    const authItems = new Map<string, AuthItem>(authUrls.map(el => [el.urlKey, el]));

    this.onReady(authUrls);
    this.authMaps.set(window.location.pathname, authItems);
    this.isReady = true;
  }

  render() {
    if (!this.isReady) {
      return null;
    }
    // @ts-ignore
    return KsBaseProvider.options.render.call(this);
  }
}

import { Component, Inject, Prop } from 'vue-property-decorator';

import KsBaseProvider from '../KSBaseProvider';
import { jsonApi } from '../../../request';
import { AuthItem } from './index';

@Component
export default class KsAuthProvider extends KsBaseProvider {
  public static componentName = 'KsAuth';

  private authorized = false;

  @Inject({
    from: 'authMaps',
    default: new Map<string, Map<string, AuthItem>>(),
  })
  private authMaps!: Map<string, Map<string, AuthItem>>;

  @Prop({ type: String, default: '' })
  private urlKey!: string;

  @Prop({ type: String, default: '' })
  private dataOpUrl!: string;

  @Prop({ type: Object, default: () => {} })
  private dataOpParam: any;

  async created() {
    const { urlKey } = this;
    const authUrls = this.authMaps.get(window.location.pathname);
    if (!authUrls) {
      return;
    }

    // Step1: 先看操作是否有权限；
    const authItem = authUrls.get(urlKey);
    this.authorized = authItem ? authItem.displayLinkUrl : false;

    if (this.authorized && this.dataOpUrl) {
      try {
        // Step2: 如果配置了数据操作权限， 需要检查是否有数据操作权限
        await this.authDataOp();
      } catch (e) {
        // 403: 无权限访问
        if (Number(e.code) === 403) {
          this.authorized = false;
        } else {
          console.error(e);
        }
      }
    }
  }

  authDataOp() {
    const { dataOpUrl, dataOpParam } = this;
    jsonApi.get(dataOpUrl, dataOpParam);
  }

  render() {
    if (!this.authorized) {
      return null;
    }
    // @ts-ignore
    return KsBaseProvider.options.render.call(this);
  }
}

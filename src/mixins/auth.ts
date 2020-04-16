import { Vue, Component } from 'vue-property-decorator';

import { jsonApi } from '../request';

@Component
export default class AuthMixin extends Vue {
  public authParams: string[] = [];

  public authMaps: { [key: string]: boolean } = {};

  public async created() {
    // 由于sc-desk后端返回的multi写成了mutil,此处增加兼容
    const { authUrl = '', transferAuthResult = data => (data.mutilDisplayRequestUrl || {}).displayRequestUrls || [] } = Vue.ksvue || {};

    if (!authUrl) {
      return console.error('【KSVUE】缺少参数 >>> 使用AuthMixin请配置authUrl参数'); // eslint-disable-line
    }

    if (this.authParams.length) {
      const json: any = await jsonApi.post(authUrl, {
        displayRequestUrls: this.authParams,
      });
      const data = json.result || json.data || {};
      const urls = transferAuthResult(data) || [];
      urls.forEach((item) => {
        this.$set(this.authMaps, item.urlKey, item.displayLinkUrl || item.url);
      });
    }
    return true;
  }
}

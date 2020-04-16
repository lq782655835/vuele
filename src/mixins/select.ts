import { Vue, Component } from 'vue-property-decorator';

import { jsonApi } from '../request';

@Component
export default class SelectMixin extends Vue {
  public sourceKeys: string[] = [];

  public source: { [key: string]: any[] } = {};

  public created() {
    this.getSourceByKeys(this.sourceKeys);
  }

  public onSourceFetched(): any {
    return 'override this method if needed';
  }

  public async getSourceByKeys(sourceKeys: string[]) {
    const { selectUrl = null } = Vue.ksvue || {};

    if (!selectUrl) {
      return console.error('【KSVUE】缺少参数 >>> 使用selectMixin请配置selectUrl参数'); // eslint-disable-line
    }

    try {
      const keys = sourceKeys.join(',');
      let res: any = await jsonApi.get(selectUrl(), { params: { keys } });

      const { resolveCommonReturn = null } = Vue.ksvue || {};
      if (resolveCommonReturn) {
        res = resolveCommonReturn(res);
      }

      res = res && (res.result || res.data || {});

      sourceKeys.forEach((key) => {
        const result = res[`${key}`] || [];
        this.$set(this.source, key, [...result]);
      });

      this.onSourceFetched();
      this.$forceUpdate();
      return true;
    } catch (e) {
      console.error(e); // eslint-disable-line
      return false;
    }
  }
}

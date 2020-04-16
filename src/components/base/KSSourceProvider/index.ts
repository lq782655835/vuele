import {
  Vue,
  Prop,
  Provide,
  Emit,
  Component,
} from 'vue-property-decorator';

import KsBaseProvider from '../KSBaseProvider';
import { jsonApi } from '../../../request';

export interface SourceItem {
  id?: any;
  name?: any;
  children?: SourceItem[] | null;
}

export interface Sources {
  [key: string]: SourceItem[]
}

@Component
export default class KsSourceProvider extends KsBaseProvider {
  public static componentName = 'KsSourceProvider';

  @Prop({ type: Number, default: 150 })
  public throttleTime!: number;

  @Prop({ type: String, default: '' })
  public service!: string;

  @Prop({ type: Array, default: () => [] })
  public extraKeys!: string[];

  @Provide('provideSources')
  public sources: Sources = {};

  public queue: Set<string> = new Set();

  public throttleId: number | null = null;

  created() {
    if (this.extraKeys && this.extraKeys.length) {
      this.getSourceByKeys(this.extraKeys);
    }
  }

  @Emit('fetched')
  onSourceFetched(source: Sources) {}

  @Emit('fetch-failed')
  onSourceFetchFailed(e: Error) {}

  @Provide('setSourceKey')
  setSourceKey(key: string) {
    if (this.sources[key]) {
      return;
    }

    if (this.throttleId) {
      clearTimeout(this.throttleId);
    }
    this.queue.add(key);
    this.throttleId = window.setTimeout(async () => {
      try {
        const keys = Array.from(this.queue.values());
        await this.getSourceByKeys(keys);
        this.queue.clear();
      } finally {
        this.throttleId = null;
      }
    }, this.throttleTime);
  }

  public async getSourceByKeys(sourceKeys: string[]) {
    const { selectUrl, resolveCommonReturn } = Vue.ksvue;

    try {
      if (!selectUrl && !this.service) {
        throw new Error('【KSVUE】缺少参数 >>> 请配置selectUrl参数');
      }

      // @ts-ignore
      const url = this.service || selectUrl();
      const keys = sourceKeys.join(',');
      let res: any = await jsonApi.get(url, { params: { keys } });

      if (resolveCommonReturn) {
        res = resolveCommonReturn(res);
      } else {
        res = res && (res.result || res.data || {});
      }

      sourceKeys.forEach((key) => {
        const result = res[`${key}`] || [];
        this.$set(this.sources, key, [...result]);
      });

      this.onSourceFetched(this.sources);
      this.$forceUpdate();
    } catch (e) {
      // eslint-disable-next-line
      console.error(e);
      this.onSourceFetchFailed(e);
    }
  }
}

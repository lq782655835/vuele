import {
  Vue,
  Component,
  Prop,
  Inject,
  Watch,
} from 'vue-property-decorator';

import { SourceItem, Sources } from '../components/base/KSSourceProvider';

@Component
export default class SourceProviderMixin extends Vue {
  @Prop({ type: String })
  protected sourceKey!: string;

  @Prop({ type: Array, default: () => [] })
  protected source!: SourceItem[];

  @Inject({
    from: 'provideSources',
    default: {},
  })
  protected readonly provideSources!: Sources;

  @Inject({
    from: 'setSourceKey',
    default: () => () => {},
  })
  protected setProviderSourceKey!: (key: string) => {};

  @Watch('sourceKey')
  onSourceKeyChange(newVal: string) {
    if (newVal) {
      this.setProviderSourceKey(newVal);
    }
  }

  get computedSource() {
    if (this.sourceKey && this.provideSources && this.provideSources[this.sourceKey]) {
      return this.provideSources[this.sourceKey];
    }
    return this.source;
  }

  created() {
    if (this.sourceKey) {
      this.setProviderSourceKey(this.sourceKey);
    }
  }
}

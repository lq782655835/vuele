import {
  Component,
  Prop,
  Mixins,
} from 'vue-property-decorator';

import { SourceItem } from '../KSSourceProvider';
import SourceProviderMixin from '../../../mixins/sourceProvider';

@Component
export default class KsSelect extends Mixins(SourceProviderMixin) {
  public static componentName = 'KsSelect';

  @Prop({ type: String, default: '请选择' }) placeholder!: String;

  @Prop({ default: '' }) value;

  @Prop({ type: Boolean, default: false }) multiple!: Boolean;

  @Prop({ type: Boolean, default: true }) filterable!: Boolean;

  @Prop({ type: Number, default: 0 }) limit!: number;

  @Prop({ type: String, default: 'small' }) size!: String;

  @Prop({ type: String, default: 'id' }) valueKey!: String;

  @Prop({ type: String, default: 'name' }) labelKey!: string;

  @Prop({ type: Boolean, default: true }) clearable!: Boolean;

  @Prop({ type: Boolean, default: false }) disabled!: Boolean;

  protected filterInput: any = '';

  protected get filteredSource() {
    if (!this.filterInput) {
      return this.computedSource;
    }
    const input = String(this.filterInput).replace(/[|\\{}()[\]^$+*?.]/g, '\\$&');
    const regexp = new RegExp(input, 'i');
    return this.computedSource.filter(item => regexp.test(item[this.labelKey]));
  }

  protected get limitedSource() {
    if (this.limit) {
      return this.filteredSource && this.filteredSource.slice(0, this.limit);
    }
    return this.filteredSource;
  }

  public onFilterSource(val) {
    this.filterInput = val;
  }


  onInputFn(val) {
    this.$emit('input', val);
  }

  onChange(val) {
    this.$emit('change', val);
  }
}

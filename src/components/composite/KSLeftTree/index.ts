import {
  Vue, Component, Prop, Watch,
} from 'vue-property-decorator';

@Component
export default class KsLeftTree extends Vue {
  public static componentName = 'KsLeftTree';

  list = [];

  filterText = '';

  currentName = '';

  @Prop({ type: Array, default: () => [] })
  public source!: any[];

  @Prop({ type: Number })
  public value!: Number;

  @Watch('source', { immediate: true, deep: true })
  onSourceChange(value: any[]) {
    this.list = JSON.parse(JSON.stringify(value));
    this.filter();
  }

  filter() {
    this.list.forEach((item: any) => {
      const text = this.filterText;
      this.$set(item, '_display', true);
      if (text && item.name.indexOf(text) === -1) {
        this.$set(item, '_display', false);
      }
    });
  }

  onItemClick({ id, name }) {
    if (this.value === id) {
      return;
    }
    this.currentName = name;
    this.$emit('input', id);
    this.$emit('change', {
      id,
      name: this.currentName,
    });
  }
}

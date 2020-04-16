import { Vue, Component, Prop } from 'vue-property-decorator';
@Component
export default class TableColumnTemplate extends Vue {
  public static componentName = 'TableColumnTemplate';

  @Prop({ type: Object, default: () => ({}) })
  public scope!: any;

  @Prop({ type: Object, default: () => ({}) })
  public column!: any;

  render(h) {
    const row = this.scope.row || {};
    const { column } = this;
    if (column.render && typeof column.render === 'function') {
      return column.render(row);
    }
    return h('span', row[column.prop]);
  }
}

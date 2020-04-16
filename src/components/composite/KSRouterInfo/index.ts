import { Vue, Component, Prop } from 'vue-property-decorator';
import TableColumnTemplate from './tableColumn/index.vue';

@Component({
  components: { TableColumnTemplate },
})
export default class KsRouterInfo extends Vue {
  public static componentName = 'KsRouterInfo';

  @Prop({ type: Array, default: () => [] })
  public list!: any[];

  @Prop({ type: Array, default: () => [] })
  public columns!: any[];

  setCellClassName({ row, rowIndex, columnIndex }) {
    const unreached = `${
      row.__unreached ? 'ks-router-table__cell--unreached' : ''
    }`;
    const step = `${columnIndex === 0 ? 'ks-router-table-step-ctn' : ''}`;
    const stepFirst = `${
      rowIndex === 0 ? 'ks-router-table-step-ctn--first' : ''
    }`;
    const stepLast = `${
      rowIndex === this.list.length - 1 ? 'ks-router-table-step-ctn--last' : ''
    }`;
    const turn = `${
      !row.__unreached
      && this.list[rowIndex + 1]
      && this.list[rowIndex + 1].__unreached
        ? 'ks-router-table-step-ctn--turn'
        : ''
    }`;
    return `ks-router-table__cell ${unreached} ${step} ${stepFirst} ${stepLast} ${turn}`;
  }
}

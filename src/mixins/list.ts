import { Vue, Component } from 'vue-property-decorator';

import { filterEmpty } from '../utils';

@Component
export default class ListMixin extends Vue {
  public listService: any = null;

  public list: any[] = [];

  public total: number = 0;

  public pageNo: number = 1;

  public pageSize: number = 10;

  public condition: { [key: string]: any } = {};

  public selecteds: any[] = [];

  public selectedIds: any[] = [];

  public loading: boolean = false;

  public mounted() {
    if (this.shouldUpdateList()) {
      this.__getList();
    }
  }

  public shouldUpdateList() {
    // override this method if needed
    return true;
  }

  public async beforeUpdateListHandler() {
    // override this method if needed
    return new Promise((resolve) => {
      resolve();
    });
  }

  public afterUpdateListHandler(data: any) {
    // override this method if needed
    return data;
  }

  public async __getList() {
    try {
      await this.beforeUpdateListHandler();

      this.loading = true;
      const param = this.getListParam();
      const data = await this.listService(filterEmpty(param));
      const result = data && (data.result || data.data || {});
      this.list = (result && result.list) || (result instanceof Array && result) || [];
      this.total = (result.pagination && result.pagination.total) || result.total;

      this.afterUpdateListHandler(data);
    } catch (err) {
      console.error(err); // eslint-disable-line
    } finally {
      this.loading = false;
    }
  }

  public async refresh() {
    this.pageNo = 1;
    await this.__getList();
  }

  public getListParam() {
    const param = this.getExtraParam();
    const { pageNo, pageSize } = this;
    return { ...param, pageNo, pageSize };
  }

  public getExtraParam() {
    return this.condition;
  }

  public handleSizeChange(pageSize: number) {
    this.pageSize = pageSize;
    this.__getList();
  }

  public handleCurrentChange(pageNo: number) {
    this.pageNo = pageNo;
    this.__getList();
  }

  public reset() {
    const { queryForm } = this.$refs;
    if (queryForm) {
      (queryForm as any).resetFields();
    }
  }

  handleSelectionChange(selected: any[]) {
    this.selectedIds = [];
    this.selecteds = [];
    selected.forEach((x) => {
      this.selecteds.push(x);
      this.selectedIds.push(x.id);
    });
  }
}

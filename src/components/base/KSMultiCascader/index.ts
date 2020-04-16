// https://github.com/Charming2015/el-cascader-multi
/* eslint-disable */
import {
  Vue, Component, Prop, Watch,
} from 'vue-property-decorator';
import TreeStore from './lib/tree';
import renderList from './modules/renderList/index';
import _find from 'lodash.find';

@Component({
  components: {
    renderList,
  },
})
export default class KSMultiCascader extends Vue {
  public static componentName = 'KsMultiCascader';

  @Prop({ type: Array, default: () => [], required: true }) data

  @Prop({ type: Array, default: () => [], required: true }) value

  @Prop({ type: String, default: '-' }) separator!: string

  @Prop({ type: Boolean, default: false }) filterable

  @Prop({ type: Function }) filterMethod

  @Prop({ type: String, default: '' }) popperClass

  @Prop({ type: Boolean, default: true }) reserveKeyword!: boolean

  @Prop({ type: String, default: 'id' }) valueKey!: string

  @Prop({ type: String, default: 'name' }) labelKey!: string

  @Prop({ type: Boolean, default: false }) showRoot!: boolean

  @Prop({ type: String, default: 'children' }) childrenKey!: string

  @Prop({ type: String, default: 'click' }) expandTrigger!: string

  @Prop({ type: Number, default: Infinity }) limit!: number

  @Prop({ type: String }) size!: string


  selectedLabels = [];

  selectedIds = [];

  selectedNodes = [];

  activeClass = 'floor-width-1';

  store = {};

  root = [];

  maxLevellist: any = [];

  showData = {};

  activeList = [];

  searchText = '';

  searchResult = [];

  get isSearching() {
    return !(this.searchText.trim() === '');
  }

  get innerPopperClass() {
    return `${this.popperClass} multi-cascader
      ${this.isSearching ? '' : 'multi-cascader-style'} ${this.activeClass}`;
  }

  @Watch('data', { deep: true })
  onDataChange() {
    this.init();
  }

  @Watch('value', { deep: true })
  onValueChange(newValue, oldValue) {
    if (!this.value || !this.value.length) {
      this.init();
      this.activeClass = 'floor-width-1';
    } else {
      this.updateSelect(newValue, true, true);
    }
  }

  @Watch('selectedNodes')
  onSelectedNodesChange() {
    this.$emit('change', this.selectedNodes.map(o => o[this.valueKey]));
    this.$emit('changeName', this.selectedNodes.map(item => item[this.labelKey]));
  }

  mounted() {
    this.init();
  }

  visibleChange(v) {
    if (!v) {
      this.searchText = '';
    }
    this.$emit('visible-change', v);
  }

  handleBlur(e) {
    this.searchText = '';
    this.$emit('blur', e);
  }

  handleFocus(e) {
    this.$emit('focus', e);
  }

  handleClear() {
    this.$emit('clear');
  }

  selectOne(item) {
    item.checked = !item.checked;
    this.handleCheck(item);
  }

  changeLabel(v) {
    this.$emit('change', v);
  }

  innerFilterMethod(v) {
    this.searchText = v;
    let tempResult = (this.store as any).nodeList;
    if (v.trim() !== '') {
      this.activeClass = '';
      if (typeof this.filterMethod === 'function') {
        this.searchResult = this.filterMethod(tempResult, v);
      } else {
        tempResult = tempResult.filter(o => o.isLeaf);
        tempResult = tempResult.filter(o => o.showLabel.includes(v));
        this.searchResult = tempResult;
      }
    } else {
      this.activeClass = 'floor-width-1';
    }
  }

  getKey() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      // tslint:disable-next-line
      let r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  handleClick(node, levelIndex, level) {
    if (this.maxLevellist[level - 1]) {
      (this.maxLevellist[level - 1] as any).rendered = true;
    }
    this.activeClass = `floor-width-${node.isLeaf ? level : level + 1}`;
    const tempList = [...this.activeList];
    if (level < tempList.length) {
      tempList.splice(level);
    }
    (tempList as any)[level - 1] = node.id;
    this.showData[level] = node.childNodes;
    this.activeList = tempList;
  }

  handleCheck(node) {
    node.check(node.checked);
    this.selectedIds = (this.store as any).selectedIds;
    this.updateSelect((this.store as any).selectedIds);
    this.$emit('input', this.selectedNodes.map(o => o[this.valueKey]));
  }

  removeOne(v) {
    const targetNode: any = this.selectedNodes.find(o => (o as any).showLabel === v) || {};
    targetNode.checked = false;
    this.handleCheck(targetNode);
    this.$emit('remove-tag', v);
  }

  updateSelect(data = [], needCheckNode = false, setValue = false) {
    const tempSelectedNodes = [];
    const tempSelectedLabels = [];
    const tempSelectedIds = [];

    (data || []).forEach(o => {
      let targetNode;
      if (setValue) {
        const findObj = {};
        findObj[this.valueKey] = o;
        targetNode = _find((this.store as any).nodeList, findObj);
        if (targetNode) {
          (tempSelectedIds as any).push(targetNode.id);
        } else {
          console.warn(`data中不存在value值`);
        }
      } else {
        targetNode = (this.store as any).nodesMap[o];
        (tempSelectedIds as any).push(o);
      }
      if (targetNode) {
      needCheckNode && targetNode.check(true);
        (tempSelectedNodes as any).push(targetNode);
        (tempSelectedLabels as any).push(targetNode.showLabel);
      }
    });
    this.selectedNodes = tempSelectedNodes;
    this.selectedLabels = tempSelectedLabels;
    this.selectedIds = tempSelectedIds;
  }

  init() {
    this.store = new TreeStore({
      data: this.data,
      separator: this.separator,
      valueKey: this.valueKey,
      labelKey: this.labelKey,
      childrenKey: this.childrenKey,
      showRoot: this.showRoot,
    });
    this.root = (this.store as any).root;
    this.maxLevellist = Array.from({ length: (this.store as any).maxLevel - 1 }, (v, i) => {
      this.showData[i + 1] = [];
      return {
        id: i + 1,
        rendered: false,
      };
    });
    this.updateSelect(this.value, true, true);
  }
}

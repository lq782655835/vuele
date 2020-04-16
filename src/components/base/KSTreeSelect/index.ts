import {
  Component,
  Prop,
  Watch,
  Mixins,
} from 'vue-property-decorator';

import SourceProviderMixin from '../../../mixins/sourceProvider';

@Component
export default class KsTreeSelect extends Mixins(SourceProviderMixin) {
  public static componentName = 'KsTreeSelect';

  /* 选中的id值 */
  @Prop({ type: Array, default: () => [] })
  public value!: any[];

  /** 默认的source数据源结构为id, name, children
   * id可以通过idKey配置
   * name可以通过nameKey配置
   * children可以通过childrenKey配置
   */
  @Prop({ type: String, default: 'id' })
  public idKey!: string;

  @Prop({ type: String, default: 'name' })
  public nameKey!: string;

  @Prop({ type: String, default: 'children' })
  public childrenKey!: string;

  /* 过滤输入框的placeholder */
  @Prop({ type: String, default: '输入关键字搜索' })
  public placeholder!: string;

  /* 是否显示左侧操作按钮 */
  @Prop({ type: Boolean, default: true })
  public showButtons!: boolean;

  /* 三种模式，
  * normal: 只要选中就传id
  * leaf: 抹平，只传叶子结点
  * merge: 合并，子选项全部选中，只传父id
  * */
  @Prop({ type: String, default: 'merge' })
  public mode!: string;

  /* 是否提供过滤功能 */
  @Prop({ type: Boolean, default: true })
  public canSearch!: boolean;

  /* 过滤结果最多显示条数 */
  @Prop({ type: Number, default: 200 })
  public filterLimit!: number;

  /* 是否提供勾选框进行多选 */
  @Prop({ type: Boolean, default: true })
  public multiple!: boolean;

  /* 在显示复选框的情况下，是否严格的遵循父子不互相关联的做法，默认为 false，开启之后只能用于普通提交 */
  @Prop({ type: Boolean, default: false })
  public checkStrictly!: boolean;

  @Prop({ type: Number, default: 10 })
  public showSelectedCount!: number;

  @Prop({ type: Boolean, default: true })
  public canEdit!: boolean;

  /* data */
  public filterText: string = '';

  public filterName: string = '';

  public defaultProps: any = {
    label: this.nameKey || 'name',
    children: this.childrenKey || 'children',
  };

  public defaultCheckedKeys: any[] = [];

  public checkedKeys: any[] = [];

  public checkedNames: any[] = [];

  public checkedNamesShow: any[] = [];

  public relatedMap: object = {};

  public showAllSelected: boolean = false;

  public dropdownVisible: boolean = false;

  @Watch('filterText')
  onFilterTextChanged(val: string) {
    if ((this as any).filterValid(val)) {
      (this as any).customFilter(val);
    }
  }

  @Watch('filterName')
  onFilterNameChanged(val: string) {
    (this as any).syncCheckedNameShow();
  }

  @Watch('source', {
    deep: true,
    immediate: true,
  })
  onSourceChanged(val: string) {
    if (!val) {
      return;
    }
    if (this.$refs.tree) {
      (this.$refs.tree as any).store.setData(JSON.parse(JSON.stringify(val)));
    }
    (this as any).buildRelatedMap((this as any).relatedMap, this.source, {});
    (this as any).checkedKeys = this.value;
  }

  @Watch('value.length', { immediate: true })
  onValueLengthChanged(val: string) {
    if (!this.source.length) {
      return false;
    }
    /* 试图通过改变父组件的v-model来同步勾选情况，此处需要合理处理tree node的状态此处只处理了重置 */
    if (!val) {
      (this as any).checkAll(false);
    }
    //  else {
    // 如果value有值，需要逐个同步勾选，暂时不支持
    // todo
    // }
    (this as any).checkedKeys = this.value;
    return true;
  }

  @Watch('checkedKeys', {
    immediate: true,
    deep: true,
  })
  onCheckedKeysChanged(val: string) {
    (this as any).syncCheckedNameById();
    this.$emit('input', (this as any).checkedKeys);
    this.$emit('change-name', (this as any).checkedNames);
  }

  get defaultExpandedKeys() {
    return this.showButtons ? [] : this.value;
  }

  get accordion() {
    return this.showButtons;
  }

  get filteredCheckedNamesShow() {
    if ((this as any).showAllSelected) {
      return (this as any).checkedNamesShow;
    }
    return (this as any)
      .checkedNamesShow.filter((item, index) => index < (this as any).showSelectedCount);
  }

  get checkedNamesShowStr() {
    return (this as any).checkedNames.join(',');
  }

  public customFilter(value) {
    const { store } = (this.$refs.tree as any);
    let resultNum = 0;
    const lazy = false;
    const limit = value ? this.filterLimit : Infinity;
    const filterNodeMethod = (this as any).filterNode;

    const traverse = function traverse(leafnode) {
      const node = leafnode;
      const childNodes = node.root ? node.root.childNodes : node.childNodes;

      childNodes.forEach((item) => {
        const child = item;
        child.visible = resultNum > limit
          ? false : filterNodeMethod.call(child, value, child.data, child);
        if (child.visible) {
          resultNum += 1;
        }
        traverse(child);
      });

      let allHidden: boolean = true;
      if (!node.visible && childNodes.length) {
        childNodes.forEach((child) => {
          if (child.visible) {
            allHidden = false;
          }
        });

        if (node.root) {
          node.root.visible = !allHidden;
        } else {
          node.visible = !allHidden;
        }
      }
      if (!value) {
        return;
      }
      if (node.visible && !allHidden && !node.isLeaf && !lazy) {
        node.expand();
      }
    };
    traverse(store);
  }

  public filterNode(value, data) {
    if (!value) {
      return true;
    }
    const key = (this as any).defaultProps.label;
    return data[key].indexOf(value) !== -1;
  }

  public onFilterFocus() {
    if (this.filterValid((this as any).filterText)) {
      this.$nextTick(() => {
        this.customFilter((this as any).filterText);
      });
    }
  }

  public filterValid(arg: any) {
    return true;
  }

  /* 建立父子节点映射，用于查找某个id的父节点，优化后续查找性能 */
  public buildRelatedMap(map, source, parent) {
    const mapping = map;
    if (!source) {
      return;
    }
    source.forEach((item) => {
      mapping[item[this.idKey]] = {
        self: item,
        parentId: parent[this.idKey],
        name: item[this.nameKey],
        isLeaf: item[this.childrenKey] !== false,
      };
      this.buildRelatedMap(mapping, item[this.childrenKey], item);
    });
  }

  public onCheck(item, checkedNode) {
    this.setCheckedKeys(checkedNode.checkedKeys);
    // this.$emit('input', this.checkedKeys);
  }

  public onCheckChange() {
    // todo
  }

  public onCurrentChange() {
    // todo
  }

  public onNodeExpand() {
    // todo
  }

  public onNodeClick() {
    // todo
  }

  public setCheckedKeys(checkedKeys) {
    switch (this.mode) {
      case 'merge': {
        this.setCheckedKeysByMerge(checkedKeys);
        break;
      }
      case 'leaf': {
        this.setCheckedKeysByLeaf(checkedKeys);
        break;
      }
      case 'normal': {
        this.setCheckedKeysByNormal(checkedKeys);
        break;
      }
      default: {
        this.setCheckedKeysByNormal(checkedKeys);
      }
    }
  }

  public setCheckedKeysByMerge(checkedKeys) {
    const set = new Set(checkedKeys);
    (this as any).checkedKeys = checkedKeys.filter((id) => {
      // 如果选中节点的父节点被选中，则过滤掉这个节点
      const { parentId } = (this as any).relatedMap[id] || {} as any;
      if (!parentId) {
        // 顶级节点直接选中
        return true;
      }
      if (set.has(parentId)) {
        return false;
      }
      return true;
    });
  }

  public setCheckedKeysByLeaf(checkedKeys) {
    (this as any).checkedKeys = checkedKeys.filter((id) => {
      // 如果不是叶子节点，则过滤掉这个节点
      const parent = (this as any).relatedMap[id] || {};
      return parent.isLeaf;
    });
  }

  public setCheckedKeysByNormal(checkedKeys) {
    (this as any).checkedKeys = checkedKeys.filter(() => true);
  }

  public syncCheckedNameById() {
    (this as any).checkedNames = [];
    (this as any).checkedKeys.forEach((id) => {
      const item = (this as any).relatedMap[id];
      if (!item) {
        console.warn(`Can not find id: ${id} from current source.`); // eslint-disable-line
        return;
      }
      if (item.name) {
        (this as any).checkedNames.push(item.name);
      }
    });
    this.syncCheckedNameShow();
  }

  public syncCheckedNameShow() {
    if (this.canEdit) {
      return false;
    }
    (this as any).checkedNamesShow = (this as any)
      .checkedNames.filter(item => item.indexOf((this as any).filterName) !== -1);
    return true;
  }

  public checkReverse() {
    const tree = this.$refs && this.$refs.tree;
    Object.keys((this as any).relatedMap).forEach((id) => {
      const node = (tree as any).getNode(id);
      if (node.indeterminate) {
        // 不处理半选
        return false;
      }
      node.checked = !node.checked;
      return true;
    });
    this.setCheckedKeys((tree as any).getCheckedKeys());
  }

  public checkAll(checked) {
    const tree = this.$refs && this.$refs.tree;
    if (!tree) {
      return;
    }
    Object.keys((this as any).relatedMap).forEach((id) => {
      const node = (tree as any).getNode(id);
      node.checked = checked;
      node.indeterminate = false;
    });
    // this.$nextTick(() => {});
    this.setCheckedKeys((tree as any).getCheckedKeys());
  }

  singleSelect(event, node, data) {
    if (event) {
      event.stopPropagation();
    }
    let id = data[this.idKey];
    (this as any).checkedKeys = [];
    if (this.mode === 'merge' || this.mode === 'leaf') {
      (this as any).checkedKeys = [id];
    } else {
      while ((this as any).relatedMap[id]) {
        (this as any).checkedKeys.push(id);
        id = (this as any).relatedMap[id].parentId;
      }
      (this as any).checkedKeys.reverse();
    }
    if (this.$refs.dropdown) {
      (this.$refs.dropdown as any).hide();
    }
  }
}

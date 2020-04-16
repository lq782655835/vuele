/* eslint-disable */
import _uniq from 'lodash.uniq';
import _clonedeep from 'lodash.clonedeep';
import _get from 'lodash.get';

let nodeIdSeed = 0;
export default class Node {
  id: number;
  data: any;
  parent: any;
  isLeaf: boolean;
  checked: boolean;
  level: number;
  childNodes: any[];
  totalLabel: any;
  store: any;
  showLabel: any;
  label: any;
  disabled: any;
  constructor(options) {
    this.id = nodeIdSeed++;
    this.data = null;
    this.parent = null;
    this.isLeaf = true;
    this.checked = false;
    for (const option in options) {
      if (options.hasOwnProperty(option)) {
        this[option] = options[option];
      }
    }
    const { store } = this;
    this[store.valueKey] = options[store.valueKey] || null;
    this.level = 0;
    this.childNodes = [];
    if (this.parent) {
      this.level = this.parent.level + 1;
      store.maxLevel = Math.max(store.maxLevel, this.level);
      this.showLabel = (this.parent.showLabel && !(this as any).showRoot)
        ? `${this.parent.showLabel}${this.store.separator}${this[store.labelKey]}`
        : this[store.labelKey];
    }
    this.setData(this.data);
  }

  setData(data) {
    let store = this.store;
    this.data = data;
    this.childNodes = [];
    let children;
    if (this.level === 0 && this.data instanceof Array) {
      children = this.data;
    } else {
      children = _get(this, store.childrenKey) || [];
      this.isLeaf = children.length === 0;
      this.store.nodesMap[this.id] = this;
      this.store.nodeList.push(this);
      this[store.valueKey] = this[store.valueKey];
    }
    children.forEach(child => {
      this.insertChild(child);
    });
  }

  insertChild(child) {
    child = Object.assign(child, {
      parent: this,
      showRoot: (this as any).showRoot,
      store: this.store,
    });
    child = new Node(child);
    this.childNodes.push(child);
  }

  check(checked) {
    if (this.disabled) { return false; }
    this.checked = checked;
    this.updateSelectIds(checked, this.id);
    if (this.childNodes) {
      this.childNodes.forEach(child => {
        child.check(checked);
      });
    }
    if (this.parent && this.level !== 1) {
      this.parent.checkedAll();
    }
  }
  checkedAll() {
    if (this.childNodes) {
      this.checked = this.childNodes.every(child => child.checked);
      this.updateSelectIds(this.checked, this.id);

      if ((this as any).showRoot && this.checked && this.level != 0) {
        let store = this.store;
        let tempList = _clonedeep(store.selectedIds);
        let childIds = this.childNodes.map(child => child.id);
        tempList = tempList.filter(id => {
          return !childIds.includes(id);
        });
        tempList.push(this.id);
        tempList = _uniq(tempList);
        store.selectedIds = tempList;
      }
    }
    if (this.parent) {
      if ((this as any).showRoot && !this.checked) {
        let store = this.store;
        let tempList = _clonedeep(store.selectedIds);
        this.parent.childNodes.forEach(child => {
          if (child.checked) {
            tempList.push(child.id);
          }
        });
        tempList = _uniq(tempList);
        store.selectedIds = tempList;
      }

      this.parent.checkedAll();
    }
  }

  updateSelectIds(checked, id) {
    let store = this.store;
    if (checked) {
      if (this.isLeaf) {
        let tempList = _clonedeep(store.selectedIds);
        tempList.push(id);
        tempList = _uniq(tempList);
        store.selectedIds = tempList;
      }
    } else {
      let tempList = _clonedeep(store.selectedIds);
      let index = tempList.findIndex(o => o === id);
      if (index >= 0) {
        tempList.splice(index, 1);
      }
      tempList = _uniq(tempList);
      store.selectedIds = tempList;
    }
  }
}

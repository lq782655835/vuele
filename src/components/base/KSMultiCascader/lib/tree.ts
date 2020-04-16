/* eslint-disable */
import Node from './node';

export default class TreeStore {
  nodesMap: {};
  nodeList: any[];
  selectedIds: any[];
  maxLevel: number;
  root: Node;
  data: any;
  constructor(options) {
    for (let option in options) {
      if (options.hasOwnProperty(option)) {
        this[option] = options[option];
      }
    }
    this.nodesMap = {};
    this.nodeList = [];
    this.selectedIds = [];
    this.maxLevel = 0;
    this.root = new Node({
      data: this.data,
      showRoot: (this as any).showRoot,
      store: this,
    });
  }
}

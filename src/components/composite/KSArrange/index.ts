import {
  Vue, Component, Prop, Emit,
}
  from 'vue-property-decorator';
import { VNode } from 'vue';

@Component({
  name: 'KsArrange',
})
export default class KsArrange extends Vue {
  public static componentName = 'KsArrange';

  /* row props */
  @Prop({ type: Number, default: 24 })
  public gutter!: number;

  @Prop({ type: String, default: '' })
  public type!: string;

  @Prop({ type: String, default: 'start' })
  public justify!: string;

  @Prop({ type: String, default: 'end' })
  public align!: string;

  @Prop({ type: String, default: 'div' })
  public tag!: string;

  /* submit props */
  // row上的class
  @Prop({ type: Array, default: () => [] })
  public classes!: string[];

  // col的span属性
  @Prop({ type: Number, default: 4 })
  public colSpan!: number;

  // 文字提示
  @Prop({ type: String, default: '' })
  public tip!: string;

  // 用于包裹按钮的tag名称
  @Prop({ type: String, default: 'el-form-item' })
  public formItemTag!: string;

  // 是否显示默认的查询和重置按钮
  @Prop({ type: Boolean, default: true })
  public submitAble!: boolean;

  // 是展示还是操作表单
  @Prop({ type: Boolean, default: true })
  public showDetail!: boolean;

  @Emit('submit')
  handleSubmit() {}

  @Emit('reset')
  handleReset() {}

  render(h: Function): VNode {
    // 去除文本节点
    let children: VNode[] = [];
    if (this.$slots.default) {
      children = this.$slots.default.filter(el => !!el.tag);
    }
    const extraBtns = (this.$slots.buttons && this.$slots.buttons[0].children) || [];

    const {
      colSpan, tip, classes, submitAble,
      ...props
    } = this.$props;
    const span = parseInt(colSpan, 10);
    if (Number.isNaN(span)) {
      throw new Error(`colSpan expected a number but got ${JSON.stringify(colSpan)}`);
    }

    const maxColSpan = 24;

    // 栅格排列，用来判断行数
    // 子组件外层带上 is-long 属性，就自动占两格
    const spanArr = children.map((el) => {
      const data = el.data || {};
      // 支持item可自定义span
      const itemSpan = parseInt((data.attrs || {}).span, 10);
      return itemSpan || span;
    });
    let displayElements: any[] = [];

    displayElements = children.map((el, index) => h('el-col', {
      props: { span: spanArr[index] },
      class: `ks-submit-col ${this.showDetail ? 'ks-submit-col__detail' : ''}`,
    }, [el]));

    // 提交+重置按钮
    const submitAndResetButtons = (submitAble ? [
      h('el-button', {
        props: { type: 'primary' },
        on: { click: () => this.handleSubmit() },
      }, ['查询']),
      h('el-button', { on: { click: this.handleReset } }, ['重置']),
    ] : []).concat(extraBtns);

    // 提示
    submitAndResetButtons.push(h('div', {
      class: 'ks-submit-tip ks-submit-tip__text',
    }, [tip]));

    if (submitAble || extraBtns.length > 0) {
      displayElements.push(h('el-col', {
        key: 'ks-submit-buttons-col',
        props: { span: maxColSpan },
        class: 'ks-submit-buttons',
      }, [
        h(this.formItemTag, null, submitAndResetButtons),
      ]));
    }

    return h('el-row', {
      props,
      class: ['ks-submit-row'].concat(classes).join(' '),
    }, displayElements);
  }
}

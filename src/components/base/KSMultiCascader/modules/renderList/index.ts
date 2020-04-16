/* eslint-disable */
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';

@Component({
  directives: {
    toolTip: {
      inserted(el) {
        /* eslint-disable-next-line no-param-reassign */
        el.title = el.scrollWidth > el.offsetWidth ? el.innerText : '';
      },
    },
  }
})
export default class RenderList extends Vue {
  @Prop({ type: Array, default: () => [] }) activeList

  @Prop({ type: Array, default: () => [] }) list

  @Prop({ type: [Number, String] }) level

  @Prop({ type: String, default: 'label' }) labelKey

  @Prop({ type: String, default: 'click' }) expandTrigger

  @Prop({ type: Number, default: Infinity }) limit

  handleMouseEnter(node, levelIndex, level) {
    if (this.expandTrigger === 'hover') {
      this.$emit('handle-click', node, levelIndex, level);
    }
  }

  handleClick(node, levelIndex, level) {
    if (this.expandTrigger === 'click') {
      this.$emit('handle-click', node, levelIndex, level);
    }
  }

  handleCheck(v, node) {
    node.checked = v;
    this.$emit('handle-check', node);
  }

  getKey(node) {
    return node.level + node.id;
  }
}
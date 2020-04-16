import { Vue, Component } from 'vue-property-decorator';

/**
 * 基础 provider 组件，其他 provider 在这之上封装，不直接使用
 */
@Component
export default class KsBaseProvider extends Vue {
  public static componentName = 'KsBaseProvider';

  render() {
    if (!this.$slots.default) {
      return null;
    }

    if (this.$slots.default.length > 1) {
      console.error(
        'Provider only support single child, first node will be rendered.',
        `<${(<typeof KsBaseProvider> this.constructor).componentName}>`,
      );
    }
    return this.$slots.default[0];
  }
}

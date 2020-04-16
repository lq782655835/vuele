import { Vue, Component } from 'vue-property-decorator';

@Component
export default class ValidateMixin extends Vue {
  public mounted() {
    let parent: any = this;
    do {
      parent = parent.$parent;
    } while (!(parent.$options._componentTag === 'ks-validation') && parent.$parent);

    if (parent && parent.$options._componentTag === 'ks-validation') {
      parent.controls.push(this);

      this.$on('destroy', () => {
        const index = parent.controls.indexOf(this);
        parent.controls.splice(index, 1);
      });
    }
  }

  public validate() {
    // override this method if needed
    return new Promise((resolve) => {
      resolve({ valid: true });
    });
  }
}

import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class KsValidation extends Vue {
  public static componentName = 'KsValidation';

  public controls: any[] = [];

  public async validate() {
    try {
      await Promise.all(this.controls.map(control => new Promise(async (resolve, reject) => {
        if (!control || !control.validate) {
          return;
        }

        const { valid, message } = await control.validate();
        if (!valid) {
          reject({ valid, message }); // eslint-disable-line
        }
        resolve();
      })));
      return { valid: true };
    } catch (err) {
      return { valid: false, message: err.message };
    }
  }
}

import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class KsDialog extends Vue {
  public static componentName = 'KsDialog';

  @Prop({ type: String, default: '提示' })
  public title!: string;

  @Prop({ type: Boolean, default: false })
  public fullscreen!: boolean;

  @Prop({ type: Object, default: () => ({}) })
  public data!: any;

  @Prop({ type: String, default: '560px' })
  public width!: string;

  @Prop({ type: [String, Boolean], default: '确定' })
  public okButton!: string | boolean;

  @Prop({ type: [String, Boolean], default: '取消' })
  public cancelButton!: string | boolean;

  @Prop({ type: Boolean, default: false })
  public disableOk!: boolean;

  @Prop({ type: Boolean, default: false })
  public disableCancel!: boolean;

  @Prop({ type: Boolean, default: true })
  public showFooter!: boolean;

  @Prop({ type: String, default: '' })
  public customClass!: string;

  @Prop({ type: String, default: '' })
  public html!: any;

  public dialogContent: string = '';

  public async beforeClose(done) {
    const { beforeClose } = (this.$refs.content as any);

    try {
      if (beforeClose && !await beforeClose()) {
        throw Error('interrupt close');
      }

      done();
      this.close();
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  }

  public async ok() {
    const { validate, ok } = (this.$refs.content as any);
    try {
      if (validate && !await validate()) {
        throw Error('invalidate');
      }

      if (ok) {
        (this.$refs.content as any).$on('ok', (params) => {
          this.$emit('ok', params);
        });

        await ok();
      } else {
        this.$emit('ok');
      }

      this.close();
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  }

  public async cancel() {
    await this.beforeClose(() => {
      this.close();
    });
  }

  public async close() {
    this.$destroy();
  }

  destroyed() {
    const { $el } = this;
    const { parentNode: $parent } = $el;

    if ($parent) {
      $parent.removeChild($el);
    }
  }
}

interface DialogOption extends KsDialog {
  content: any
}

export const $dialog = (option: DialogOption) => {
  const el = document.createElement('div');
  document.body.appendChild(el);

  const options: any = {
    el,
    propsData: option,
  };

  if (option.content && typeof option.content !== 'string') {
    options.components = {
      dialogContent: option.content,
    };

    options.data = {
      dialogContent: 'dialog-content',
    };
  } else {
    options.propsData.html = option.content || 'content';
  }

  return new KsDialog(options);
};

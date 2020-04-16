import { Component, Mixins } from 'vue-property-decorator';
import BaseMixin from '../mixins/base';
import PropMixin from '../mixins/prop';

@Component
export default class UploadCard extends Mixins(BaseMixin, PropMixin) {
  /* computed */
  private get fileCount() {
    return (this as any).getFileCount();
  }

  private get entryFile() {
    const fileList = [...(this as any).fileList];
    return fileList.reverse().find(file => file.status === 'success') || {};
  }
}

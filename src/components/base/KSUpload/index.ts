import { Component, Mixins } from 'vue-property-decorator';
// Mixins
import PropMixin from './mixins/prop';
// modules
import uploadCard from './uploadCard/index.vue';
import uploadList from './uploadList/index.vue';

@Component({
  name: 'ks-upload',
  components: { uploadCard, uploadList },
})
export default class KSUpload extends Mixins(PropMixin) {
  public static componentName = 'ks-upload';
}

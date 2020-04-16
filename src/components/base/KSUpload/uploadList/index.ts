import { Component, Mixins } from 'vue-property-decorator';
import BaseMixin from '../mixins/base';
import PropMixin from '../mixins/prop';

@Component
export default class UploadList extends Mixins(BaseMixin, PropMixin) {

}

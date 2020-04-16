import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

import vuele from '../../../src/index.ts';

export default ({ Vue }) => {
    Vue.use(ElementUI)
    Vue.use(vuele)
}

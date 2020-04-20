# 快速开始

基于ElementUI上的业务组件库

## Install

vuele业务组件库依赖ElementUI，需要一并安装

``` bash
# 安装
npm i element-ui vuele -S

```

## Usage(全局)

``` javascript
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)

import vuele from 'vuele';
import 'vuele/dist/vuele.css';
Vue.use(vuele, {
    // 传入项目级配置
    selectUrl() {
        return './test'; // 通用下拉url配置函数，需返回字符串类型
    },
    resolveCommonReturn(res) {
        // 处理通用下拉接口的返回函数，更多使用可参见KSSelectMixin
    },
    remoteSelectUrl() {
        return '/remote'; // 远程搜索下拉组件的通用url配置函数，需返回字符串类型
    },
    authUrl: '', // 系统级的获取权限接口，更多使用可参见KSAuthMixin文档
    unauthorizedUrl: '', // 系统级的无权限页
    transferAuthResult() {
        // 权限接口返回值的处理函数，更多使用可参见KSAuthMixin文档
    }
})
```

## Usage(按需引用)

``` javascript
// mixins在页面级使用
import { listMixin as list } from 'vuele';

export default {
    //...
    mixins: [list],
    //...
}

```

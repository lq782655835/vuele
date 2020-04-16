<template>
  <div>
    <el-button @click="showDialog">打开弹窗</el-button>
    <el-button @click="showImportDialog">打开弹窗</el-button>
    <p>
      this is a paragaph <ks-clipboard content="hale" />
    </p>

    <el-button @click="onPreviewClick">图片预览</el-button>


    <div class="tree-demo">
      <el-card>
        <p>模式一： 提交最高级节点， 比如选中了北京下所有区，只会提交北京市；用于数据归并场景</p>
        <ks-tree-select :source="source" v-model="value1" mode="merge" />

        <p class="f-mt20">模式二： 提交叶子节点， 比如选中了北京市，会提交北京市下所有的区；用于数据抹平场景</p>
        <ks-tree-select :source="source" v-model="value2" mode="leaf" />

        <p class="f-mt20">模式三： 普通提交， 选中什么提交什么</p>
        <ks-tree-select :source="source" v-model="value3" :checkStrictly="true" mode="normal" />

        <p class="f-mt20">详情页面展示</p>
        <ks-tree-select :source="source" v-model="value4" :canEdit=false mode="leaf" />

        <p class="f-mt20">无操作按钮</p>
        <ks-tree-select :source="source" v-model="value5" :showButtons=false />

        <p class="f-mt20">无过滤功能</p>
        <ks-tree-select :source="source" v-model="value6" :canSearch=false />

         <!-- <div v-stickyFooter>
          <el-button type="primary" @click="importFileModalVisible=true">导入</el-button>
        </div> -->

        <p class="f-mt20">单选模式一： 记录选中节点</p>
        <ks-tree-select :source="source" v-model="value7" :multiple=false />

        <p class="f-mt20">单选模式二： 记录选中节点的路径</p>
        <ks-tree-select :source="source" v-model="value8" mode="normal" :multiple=false />

        <div class="f-mt20">
          <p>测试指令用</p>
          <el-form ref="form" :model="obj" :rules="rules">
            <el-form-item prop="test1">
                <el-input v-model="obj.test1" v-int maxlength="3" />
            </el-form-item>
            <el-form-item prop="test2">
                <el-input v-model="obj.test2" v-float:3 />
            </el-form-item>
          </el-form>
          <el-button @click="getValue">取值</el-button>
          <el-button @click="setValue">设值</el-button>
        </div>
      </el-card>
    </div>

    <el-button v-sticky-footer type="primary" @click="importFileModalVisible=true">导入</el-button>

    <ks-import-file
      :visible.sync="importFileModalVisible"
      :importUrl="importUrl"
      :templateUrl="templateUrl"
      :tips="importFileTips"
      :onLoadInterceptor="onLoadInterceptor"/>

      <ks-detail-header
        header="多元修复关节 缓解疼痛 汤臣倍健 升级版氨糖软骨素钙片 120片/瓶"
        status="待考拉审核"
        desc="复杂业务的页面，可以在页面标题下，添加简单文字描述页面功能">
        <template slot="operation">
            <el-button >审核驳回</el-button>
            <el-button type="primary" >审核通过</el-button>
        </template>
        <template slot="operation-more">
            <el-dropdown-item>黄金糕</el-dropdown-item>
        </template>
      </ks-detail-header>
    <!-- <ks-error :code="401" />  -->
    <!-- <el-card>
      <el-form>
        <ks-label :spanCount="12" labelName="测试1:" :labelValue="obj.test1" />
        <ks-label :spanCount="12" labelName="测试2:" :labelValue="obj.test2" />
        <ks-label :spanCount="12" labelName="测试3:" :labelValue="obj.test3" />
      </el-form>
    </el-card>
    <el-card><el-button type="primary" @click="exportFileVisible=true">导出</el-button></el-card>
    <ks-export-file :visible.sync="exportFileVisible" type="confirm"
      @export="$exportByEmail('/ils-api/export', {data: 1})"/> -->
    <!-- <el-card header="路由信息">
        <ks-router-info :columns="routerColumns" :list="routeList"></ks-router-info>
    </el-card> -->
    <ks-process
      :model="modelKey"
      :active="activeNode"
      :source="processSource"
      name="流程进度">
    </ks-process>
    <!-- <ks-export-file :visible.sync="exportFileVisible" type="rangeCheck"
      @export="$exportByEmail('/ils-api/export', {data: 1})"/>
    <ks-divider :longer="24" />
    <el-form ref="queryForm" label-width="100px">
      <ks-arrange tip="搜索时，可能响应时间较慢，请不要重复操作" :submitAble="true" :gutter="10"
      :colSpan="6" :showDetail="false" @submit="submit" @reset="reset">
        <el-form-item label="输入文本">
            <el-input v-model="condition.input" size="mediumW" />
        </el-form-item>
        <el-form-item label="日期选择" is-long>
            <el-date-picker v-model="condition.date" size="mediumW" />
        </el-form-item>
        <el-form-item label="输入测试">
            <el-input v-model="condition.testa" size="mediumW" />
        </el-form-item>
        <el-form-item label="输入文本">
            <el-input v-model="condition.input" size="mediumW" />
        </el-form-item>
        <el-form-item label="日期选择" is-long>
            <el-date-picker v-model="condition.date" size="mediumW" />
        </el-form-item>
        <el-form-item label="输入测试">
            <el-input v-model="condition.testa" size="mediumW" />
        </el-form-item>
        <el-form-item label="输入文本">
            <el-input v-model="condition.input" size="mediumW" />
        </el-form-item>
        <el-form-item label="日期选择" is-long>
            <el-date-picker v-model="condition.date" size="mediumW" />
        </el-form-item>
        <el-form-item label="输入测试">
            <el-input v-model="condition.testa" size="mediumW" />
        </el-form-item>
        <div slot="buttons">
            <el-button type="primary" >提交</el-button>
            <el-button >保存</el-button>
        </div>
      </ks-arrange>
    </el-form> -->
    <!-- <el-form ref="queryForm" label-width="100px">
      <ks-arrange tip="搜索时，可能响应时间较慢，请不要重复操作" :gutter="10" :colSpan="24"
        @submit="submit" @reset="reset" >
        <ks-label labelName="输入文本:" labelValue="123123" />
        <ks-label labelName="输入文本" labelValue="123123" />
        <ks-label labelName="输入文本" labelValue="123123" />
        <ks-label labelName="输入文本" labelValue="123123" />
        <ks-label labelName="输入文本" labelValue="123123" />
        <ks-label labelName="输入文本" labelValue="123123" />
        <ks-label labelName="输入文本" labelValue="123123" />
        <ks-label labelName="输入文本" labelValue="123123" />
        <ks-label labelName="输入文本" labelValue="123123" />
        <ks-label labelName="输入文本" labelValue="123123" />
        <ks-label labelName="输入文本" labelValue="123123" />
        <ks-label labelName="输入文本" labelValue="123123" />
        <ks-label labelName="输入文本" labelValue="123123" />
        <ks-label labelName="输入文本" labelValue="123123" />
        <ks-label labelName="输入文本" labelValue="123123" />
        <ks-label labelName="输入文本" labelValue="123123" />
        <ks-label labelName="输入文本" labelValue="123123" />
        <ks-label labelName="输入文本" >
          <template slot="content">
            <div>
                <a
                    href="#"
                    style="color: #39f; text-decoration: none;">
                    https://goods.kaola.com/product/2689519.html?ri=newArrival&zid=339218&zp=1-%E7%B2%BE%E9%80%89%E6%96%B0%E5%93%81-2&zn=live
                </a>
            </div>
            <div>
                <a
                    href="#"
                    style="color: #39f; text-decoration: none;">
                    https://goods.kaola.com/product/2689519.html?ri=newArrival&zid=339218&zp=1-%E7%B2%BE%E9%80%89%E6%96%B0%E5%93%81-2&zn=live
                </a>
            </div>
            <div>
                <a
                    href="#"
                    style="color: #39f; text-decoration: none;">
                    https://goods.kaola.com/product/2689519.html?ri=newArrival&zid=339218&zp=1-%E7%B2%BE%E9%80%89%E6%96%B0%E5%93%81-2&zn=live
                </a>
            </div>
            <div>
                <a
                    href="#"
                    style="color: #39f; text-decoration: none;">
                    https://goods.kaola.com/product/2689519.html?ri=newArrival&zid=339218&zp=1-%E7%B2%BE%E9%80%89%E6%96%B0%E5%93%81-2&zn=live
                </a>
            </div>
          </template>
        </ks-label>
      </ks-arrange>
    </el-form> -->
    <!-- <el-button type="primary" @click="exportFileVisible=true">导出</el-button>
    <el-button type="primary" @click="importFileModalVisible=true">导入</el-button>
    <ks-import-file
      :visible.sync="importFileModalVisible"
      :importUrl="importUrl"
      :templateUrl="templateUrl"
      :onLoadInterceptor="onLoadInterceptor"/>
    <ks-detail-header
        :showDetail="true"
        header="多元修复关节 缓解疼痛 汤臣倍健 升级版氨糖软骨素钙片 120片/瓶"
        status="待考拉审核"
        desc="复杂业务的页面，可以在页面标题下，添加简单文字描述页面功能">
        <template slot="operation">
            <el-button >审核驳回</el-button>
            <el-button type="primary" >审核通过</el-button>
        </template>
        <template slot="operation-more">
            <el-dropdown-item>黄金糕</el-dropdown-item>
        </template>
        <template slot="detail">
          <el-form :inline="true" class="ks-header-detail__style">
            <ks-Arrange :submitAble="false" :gutter="10" :colSpan="8">
              <ks-label labelName="输入文本:" labelValue="123123" />
              <ks-label labelName="输入文本:" labelValue="123123" />
              <ks-label labelName="输入文本:" labelValue="123123" />
              <ks-label labelName="输入文本:" labelValue="" />
              <ks-label labelName="输入文本:"  >
                <template slot="content">
                    <a href="https://axure.yixin.im/view?id=9106&pid=156&mid=647#%E4%B8%89%E5%88%97%E8%AF%A6%E6%83%85">
                      https://axure.yixin.im/view?id=9106&pid=156&mid=647#%E4%B8%89%E5%88%97%E8%AF%A6%E6%83%85
                    </a>
                </template>
              </ks-label>
              <ks-label labelName="输入文本:" labelValue="123123" />
              <ks-label labelName="输入文本:" labelValue="123123" />
              <ks-label labelName="输入文本:" labelValue="123123" />
            </ks-Arrange>
          </el-form>
        </template>
    </ks-detail-header> -->
    <ks-operation-log :list="logList">
      <template v-slot:extend>
        <el-button size="sm">备注</el-button>
      </template>
    </ks-operation-log>
  </div>
</template>

<script>
// import Utils from './utils';
import vuele from '../../index';

import { source, sourceList } from '../mock/treeSelect';

import A from './a.vue';

export default {
  data() {
    return {
      processSource: [{
        title1: '发起申请',
        operator1: '张丹丹(H77766)',
        beginTime1: '2018-01-11 12:11',
        endTime1: null,
        reason1: '就想通过没什么',
        status1: '通过',
        remark1: 'ok，做得很好做得很好做得很好做得很好',
        id1: '1551323948557',
        description1: '张丹丹(H77766) 发起 2018-01-11 12:11',
        link1: '#',
        linkName1: '查看细节',
      }, {
        title1: '关务审核',
        operator1: '张二狗，张三狗，张二狗，张三狗',
        beginTime1: null,
        endTime1: '2018-12-12 截止',
        reason1: '就想通过没什么',
        status1: '驳回',
        remark1: null,
        id1: '1551323948558',
        link1: null,
        linkName1: null,
      }, {
        title1: '服务商审核',
        operator1: '张圣兽(H77766)',
        beginTime1: '2018-01-11 12:11',
        endTime1: null,
        reason1: '就想通过没什么',
        status1: '通过',
        remark1: null,
        id1: '1551323948559',
        link1: null,
        linkName1: null,
      }, {
        title1: '主管审核',
        operator1: null,
        beginTime1: null,
        endTime1: null,
        reason1: null,
        status1: null,
        remark1: null,
        id1: '1551323948560',
        link1: null,
        linkName1: null,
      }, {
        title1: '供应链审核',
        operator1: null,
        beginTime1: null,
        endTime1: null,
        reason1: null,
        status1: null,
        remark1: null,
        id1: '1551323948561',
        link1: null,
        linkName1: null,
      }, {
        title1: '完成',
        operator1: null,
        beginTime1: null,
        endTime1: null,
        reason1: null,
        status1: null,
        remark1: null,
        id1: '1551323948562',
        link1: null,
        linkName1: null,
      }],
      activeNode: 3,
      test: '   1 234',
      adb: '',
      imageList: [{
        name: 'Kaola.jpeg',
        src: 'http://haitao.nos.netease.com/9b73692b3a6b46d2be1de7d3be893834.jpg',
      }, {
        name: 'Music.jpg',
        src: 'http://haitao.nos.netease.com/7dfd9aa492694493be0fc1458d558536.jpg',
      }],
      condition: {
        input: '',
        select: '',
        date: '',
        testa: '',
      },
      source,
      value1: [],
      value2: [],
      value3: [],
      value4: [],
      value5: [],
      value6: [],
      value7: [],
      value8: [],
      obj: {
        test1: 'hahaha',
        test2: 'wwwwwww',
        test3: 'dasdfdrgra',
      },
      rules: {
        test1: [{ required: true, message: '请输入' }],
      },
      importFileModalVisible: false,
      importUrl: 'http://seven-kl.netease.com/docs/27432/',
      templateUrl: 'https://haitao.nos.netease.com/98b338f0-fdca-4502-9c69-1cbf4556a6a7.key',
      list: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄',
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
      }],
      routerColumns: [
        {
          label: '节点',
          prop: 'route',
          minWidth: 200,
        },
        {
          label: '操作时间',
          prop: 'time',
          minWidth: 200,
        },
        {
          label: '操作人',
          prop: 'operator',
          minWidth: 200,
        },
        {
          label: '预计时间',
          prop: 'planTime',
          minWidth: 200,
        },
        {
          label: '单号',
          prop: 'no',
          minWidth: 200,
          render: row => (
                <div>
                    {
                        row.no.map && row.no.map(item => <p>单号：<a href={item} target="_blank">item</a></p>)
                    }
                </div>
          ),
        },
      ],
      importFileTips: ['hello', 'tip'],
      routeList: [
        {
          route: ' 转入地审批 转入地审批 转入地审批 转入地审批 转入地审批 转入地审批 转入地审批 转入地审批 转入地审批 转入地审批 转入地审批 转入地审批 转入地审批',
          time: '2018-08-11 12:26:22',
          operator: '张三(H768899)',
          planTime: '2018-08-11 12:00:00',
          no: [123, 456],
        },
        {
          route: '转入地审批',
          time: '2018-08-11 12:26:22',
          operator: '张三(H768899)',
          planTime: '2018-08-11 12:00:00',
          no: [123, 456],
        },
        {
          route: '转入地报关',
          time: '2018-08-11 12:26:22',
          operator: '张三(H768899)',
          planTime: '2018-08-11 12:00:00',
          no: [123, 456],
        },
        {
          route: '转出地报关',
          time: null,
          operator: null,
          planTime: '2018-08-11 12:00:00',
          no: [123, 456],
        },
        {
          route: '起点到达（杭州1仓）',
          time: null,
          operator: null,
          planTime: '2018-08-11 12:00:00',
          no: [123, 456],
        },
        {
          route: '装货完成',
          time: null,
          operator: null,
          planTime: '2018-08-11 12:00:00',
          no: [123, 456],
        },
        {
          route: '始发地出发',
          time: null,
          operator: null,
          planTime: '2018-08-11 12:00:00',
          no: [123, 456],
        },
        {
          route: '途经点到达（上海2仓）',
          time: null,
          operator: null,
          planTime: '2018-08-11 12:00:00',
          no: [123, 456],
        },
        {
          route: '途径点出发（上海2仓）',
          time: null,
          operator: null,
          planTime: '2018-08-11 12:00:00',
          no: [123, 456],
        },
        {
          route: '终点到达（北京3仓）',
          time: null,
          operator: null,
          planTime: '2018-08-11 12:00:00',
          no: [123, 456],
        },
        {
          route: '卸货完成',
          time: null,
          operator: null,
          planTime: '2018-08-11 12:00:00',
          no: [123, 456],
        },
      ],
      exportFileVisible: false,
      modelKey: {
        title: 'title1',
        operator: 'operator1',
        status: 'status1',
        beginTime: 'beginTime1',
        endTime: 'endTime1',
        reason: 'reason1',
        remark: 'remark1',
        link: 'link1',
        linkName: 'linkName1',
        description: 'description1',
        id: 'id1',
      },
      logList: [{
        author: '张三',
        date: '昨天 11:23',
        content: '创建了审批单',
      }, {
        author: '张三',
        date: '8月11日 11:23',
        content: '主管审批：批准',
      }, {
        author: '张三',
        date: '15年8月11日 11:23',
        content: '供应链审批：批准',
      }, {
        author: '张三',
        date: '15年8月11日 11:23',
        content: '总裁审批：批准',
        remark: 'ok',
      }, {
        author: '张三',
        date: '15年8月11日 11:23',
        content: '总裁审批：批准',
        remark: '我觉得很好我觉得很好我觉得很好我觉得很好我觉得很好我觉得很好我觉得很好',
      }, {
        author: '张三',
        date: '昨天 11:23',
        content: '创建了审批单',
      }, {
        author: '张三',
        date: '8月11日 11:23',
        content: '主管审批：批准',
      }, {
        author: '张三',
        date: '15年8月11日 11:23',
        content: '供应链审批：批准',
      }, {
        author: '张三',
        date: '15年8月11日 11:23',
        content: '总裁审批：批准',
        remark: 'ok',
      }, {
        author: '张三',
        date: '15年8月11日 11:23',
        content: '总裁审批：批准',
        remark: '我觉得很好我觉得很好我觉得很好我觉得很好我觉得很好我觉得很好我觉得很好',
      }, {
        author: '张三',
        date: '昨天 11:23',
        content: '创建了审批单',
      }, {
        author: '张三',
        date: '8月11日 11:23',
        content: '主管审批：批准',
      }, {
        author: '张三',
        date: '15年8月11日 11:23',
        content: '供应链审批：批准',
      }, {
        author: '张三',
        date: '15年8月11日 11:23',
        content: '总裁审批：批准',
        remark: 'ok',
      }, {
        author: '张三',
        date: '15年8月11日 11:23',
        content: '总裁审批：批准',
        remark: '我觉得很好我觉得很好我觉得很好我觉得很好我觉得很好我觉得很好我觉得很好',
      }],
    };
  },
  created() {
    // this.adb = vuele.Utils.clone([{ a: 2, b: [4, 5] }]);
  },
  mounted() {
    this.getRouterList();
  },
  methods: {
    showDialog() {
      const $modal = this.$dialog({
        title: '哈乐',
        content: A,
        fullscreen: false,
        data: {
          item: {
            test: 123,
          },
        },
        width: '200px',
        customClass: 'hale-test',
      });

      $modal.$on('ok', (params) => {
        console.log(params); // eslint-disable-line
        console.log(123); // eslint-disable-line
      });
    },
    showImportDialog() {
      this.$import.show({
        importUrl: '',
        templateUrlApi: '/importTemplateUrl',
        onLoadInterceptor(e) {},
      });
    },
    getRouterList() {
      // 工程内通过api获取
      this.routeList = this.routeList.map((item) => {
        // 通过某些条件决定当前路由节点是否未到达，根据业务场景写逻辑代码
        item.__unreached = !item.time; // eslint-disable-line
        return item;
      });
    },
    onPreviewClick() {
      this.$preview(
        this.imageList,
      );
    },
    submit() {
      console.log('submit'); // eslint-disable-line
    },
    search() {
    },
    reset() {
      this.condition = {};
    },
    getValue() {
      console.log(this.obj.test1, this.obj.test2); // eslint-disable-line
    },
    setValue() {
      this.$refs.form.resetFields();
      this.obj.test1 = '';
      this.obj.test2 = '';
    },
    blankToComma(value) {
      if (!value && value !== 0) {
        return '';
      }
      return value.trim().replace(/[ \n\t]+/g, ',')
        .replace(/[,，]+/g, ',').replace(/^[,，]/g, '')
        .replace(/[,，]$/g, '');
    },
    onLoadInterceptor(e) {
      console.log(e); // eslint-disable-line
    },
  },
};
</script>
<style lang="scss">

@include b(header-detail) {
    @include e(style) {
      margin-bottom: 0px;
      .el-form-item {
        margin-bottom: 0px;
      }
    }
}
</style>

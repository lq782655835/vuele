# 流程进度

:::demo
```vue
<template>
  <ks-process
      :model="modelKey"
      :active="activeNode"
      :source="processSource"
      name="流程进度">
    </ks-process>
</template>
<script>
export default {
    data() {
      return {
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
        activeNode: 3,
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
      }
    }
}
</script>
```
:::
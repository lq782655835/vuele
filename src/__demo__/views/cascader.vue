<template>
    <div>
        <ks-multi-cascader
          :data="data" v-model="value1"
          value-key="categoryId" label-key="categoryName" children-key="childrenNodeList"
          :filterable="true" />
    </div>
</template>
<script>
import Source from '../mock/source.js';

export default {
  data() {
    return {
      value1: [],
      value2: [],
      value3: [],
      value4: [],
      value5: [],
      data: Source,
    };
  },
  methods: {
    onChange(v) {
      console.log(v); // eslint-disable-line
    },
  },
};
</script>

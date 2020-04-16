<template>
    <u-layout dir="v">
        <u-el-input v-model="inputValue" append="ms" />
        <u-el-input-number v-model="numValue" suffix="G"/>
        <u-el-checkbox-group v-model="checkboxValue" :options="options" />
        <u-el-dropdown v-model="optionValue" :options="options" />
        <u-el-select v-model="optionValue" :options="options" />
        <u-layout>
          <u-el-radio-group v-model="optionValue" :options="options" />
          <u-el-radio-group v-model="optionValue" :options="options" effect="normal" />
        </u-layout>
        <u-el-date />
        <u-el-tooltip content="ceshi" />
    </u-layout>
</template>


<script>
export default {
  data() {
    return {
      inputValue: 'name',
      numValue: 10,
      checkboxValue: ['banana'],
      optionValue: 'banana',
      options: ['apple', 'banana', 'orange'].map(str => ({ label: str, value: str })),
    };
  },
  methods: {
  },
};
</script>

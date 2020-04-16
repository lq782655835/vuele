<template>
    <el-date-picker
        v-model="inputValue"
        :type="type"
        :pickerOptions="innerPickerOptions"
        :placeholder="placeholder"
        :startPlaceholder="startPlaceholder"
        :endPlaceholder="endPlaceholder"
        :rangeSeparator="rangeSeparator"
        :clearable="clearable"
        v-bind="$attrs" v-on="$listeners"
        class="u-el-date">
    </el-date-picker>
</template>

<script>
const DEFAULT_SHORTCUTS = [
  {
    text: '今天',
    onClick(picker) {
      picker.$emit('pick', new Date());
    },
  },
  {
    text: '昨天',
    onClick(picker) {
      const date = new Date();
      date.setTime(date.getTime() - 3600 * 1000 * 24);
      picker.$emit('pick', date);
    },
  },
  {
    text: '一周前',
    onClick(picker) {
      const date = new Date();
      date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
      picker.$emit('pick', date);
    },
  },
];
const DEFAULT_RANGE_SHORTCUTS = [
  {
    text: '最近一周',
    onClick(picker) {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
      picker.$emit('pick', [start, end]);
    },
  },
  {
    text: '最近一个月',
    onClick(picker) {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
      picker.$emit('pick', [start, end]);
    },
  },
  {
    text: '最近三个月',
    onClick(picker) {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
      picker.$emit('pick', [start, end]);
    },
  },
];

export default {
  name: 'u-el-date',
  props: {
    value: [Date, String, Array],
    type: { type: String, default: 'date' },
    placeholder: { type: String, default: '请选择日期' },
    clearable: { type: Boolean, default: false },
    // options
    hasShortcuts: { type: Boolean, default: true },
    pickerOptions: { type: Object, default: () => ({}) },
  },
  computed: {
    inputValue: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val);
      },
    },
    isRangeDate() {
      return this.type.includes('range');
    },
    // 业务默认值设置，减少props传递
    innerPickerOptions() {
      const defaultPickerOptions = {};
      if (this.hasShortcuts) {
        defaultPickerOptions.shortcuts = this.isRangeDate
          ? DEFAULT_RANGE_SHORTCUTS
          : DEFAULT_SHORTCUTS;
      }

      return { ...defaultPickerOptions, ...this.pickerOptions };
    },
    startPlaceholder() {
      return this.isRangeDate ? '开始日期' : '';
    },
    endPlaceholder() {
      return this.isRangeDate ? '结束日期' : '';
    },
    rangeSeparator() {
      return this.isRangeDate ? '至' : '';
    },
  },
};
</script>

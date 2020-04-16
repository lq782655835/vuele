export default {
  props: {
    value: [String, Number, Array],
    options: [Array, Object],
  },
  data() {
    return {
      svalue: this.value,
      items: [],
    };
  },
  watch: {
    value(val) {
      this.svalue = val;
    },
    options(val) {
      this.getSelectOptions();
    },
  },
  mounted() {
    this.getSelectOptions();
  },
  methods: {
    getSelectOptions() {
      const { options } = this;
      if (!options || typeof options !== 'object') return;

      const _dataTransform = (arr, fileType) => {
        const { label: labelField, value: valueField } = fileType;
        return arr.map((item) => {
          if (typeof item === 'object') {
            return { ...item, label: item[labelField], value: item[valueField] };
          }
          // 针对返回[string, string类型]
          if (typeof item === 'string') {
            return { label: item, value: item };
          }
          return {};
        });
      };

      if (Array.isArray(this.options)) {
        this.items = this.options;
      } else {
        const { api, fileType = { label: 'label', value: 'value' } } = this.options;
        if (api && typeof api === 'function') {
          api().then((data) => {
            this.items = _dataTransform(data, fileType);
            this.$emit('api-load', data);
          });
        }
      }
    },
  },
};

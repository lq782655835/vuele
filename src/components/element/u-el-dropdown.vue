<template>
    <el-dropdown @command="handleCommand" v-bind="$attrs" v-on="$listeners" class="u-el-dropdown">
        <span class="el-dropdown-link">
            {{label}}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="item in items" :key="item.value" :command="item.value">
                {{item.label}}
            </el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
</template>

<script>
import OptionMixin from './options-mixin.ts';

export default {
  name: 'u-el-dropdown',
  mixins: [OptionMixin],
  computed: {
    label() {
      const selectItem = this.options.find(opt => opt.value === this.svalue);
      return (selectItem && selectItem.label) || '全部';
    },
  },
  methods: {
    handleCommand(val) {
      this.$emit('input', val);
    },
  },
};
</script>

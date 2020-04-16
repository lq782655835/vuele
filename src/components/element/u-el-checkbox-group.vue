<template>
    <el-checkbox-group v-model="svalue" v-bind="$attrs" v-on="$listeners">
        <el-checkbox v-for="item in items" :key="item.value" :label="item.value">
            {{ item.label }}
        </el-checkbox>
    </el-checkbox-group>
</template>

<script>
import OptionMixin from './options-mixin.ts';

export default {
  name: 'u-el-checkbox-group',
  mixins: [OptionMixin],
};
</script>

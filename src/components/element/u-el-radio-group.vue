<template>
    <el-radio-group v-model="svalue" v-bind="$attrs" v-on="$listeners">
        <template v-if="effect === 'button'">
            <el-radio-button v-for="item in items" :key="item.value" :label="item.value">
                {{ item.label }}
            </el-radio-button>
        </template>
        <template v-else>
            <el-radio v v-for="item in items" :key="item.value" :label="item.value">
                {{ item.label }}
            </el-radio>
        </template>
    </el-radio-group>
</template>

<script>
import OptionMixin from './options-mixin.ts';

export default {
  name: 'u-el-radio-group',
  props: {
    effect: { type: String, default: 'button' }, // button、normal
  },
  mixins: [OptionMixin],
};
</script>

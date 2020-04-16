<template>
    <el-select v-model="svalue" v-bind="$attrs" v-on="$listeners" class="u-el-select">
        <el-option v-for="item in items" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
        <li v-if="newRow" class="el-select-dropdown__item">
            <u-link type="primary" @click="$emit('add-new-row')" icon="el-icon-plus">
                {{ newRow }}
            </u-link>
        </li>
        <template v-if="newRow" #empty>
            <li class="el-select-dropdown__item">
                <u-link type="primary" @click="$emit('add-new-row')" icon="el-icon-plus">
                    {{ newRow }}
                </u-link>
            </li>
        </template>
    </el-select>
</template>

<script>
import OptionMixin from './options-mixin.ts';

export default {
  name: 'u-el-select',
  mixins: [OptionMixin],
  props: {
    newRow: String,
  },
};
</script>

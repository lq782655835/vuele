<template>
    <el-select :value="value"
        :placeholder="placeholder"
        :multiple="multiple"
        :filterable="filterable"
        :clearable="clearable"
        :size="size"
        :disabled="disabled"
        :filter-method="onFilterSource"
        @input="onInputFn($event)"
        @change="onChange($event)">
        <el-option
            v-for="item in limitedSource"
            :key="item[valueKey]"
            :label="item[labelKey]"
            :value="item[valueKey]"
            :disabled="item.disabled">
        </el-option>
    </el-select>
</template>

<script lang="ts" src="./index.ts"></script>

<template>
    <div>
        <el-select
            :multiple="multiple"
            :placeholder="placeholder"
            :size="size"
            ref="select"
            v-model="selectValue"
            reserve-keyword
            filterable
            clearable
            remote
            :remote-method="v => _getFuzzySource(v)"
            @change="onChange"
        >
            <el-option v-for="(i, index) in list"
                :key="i.id + index"
                :label="i.name"
                :value="i.id" />
        </el-select>
    </div>
</template>

<script lang="ts" src="./index.ts"></script>
<style scoped lang="scss" src="./index.scss"></style>

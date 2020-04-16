<template>
    <div class="ks-audit-progress">
        <el-row class="ks-audit-progress__header">
            {{ name }}
        </el-row>
        <el-steps
            ref="steps"
            :active="active"
            class="f-mt20 f-mb20"
            align-center>
            <el-step
                v-for="item in source"
                :key="item[model.id]"
                :title="item[model.title]"
                :description="item[model.description]">
                <template slot="title">
                    <span class="test">{{ item[model.title] }}</span>
                </template>
                <template slot="description">
                    <div>
                        <p
                            v-if="item[model.operator]"
                            :title="item[model.operator]"
                            class="ks-steps-text">{{ item[model.operator] }}
                            {{ item[model.status] }}</p>
                        <p
                            v-if="item[model.beginTime]"
                            :title="item[model.beginTime]"
                            class="ks-steps-text">{{ item[model.beginTime] }}</p>
                        <p
                            v-if="item[model.endTime]"
                            :title="item[model.endTime]"
                            class="ks-steps-text"
                            style="color: #c90">{{ item[model.endTime] }}</p>
                        <p
                            v-if="item[model.reason]"
                            :title="item[model.reason]"
                            class="ks-steps-text">原因：{{ item[model.reason] }}</p>
                        <p
                            v-if="item[model.remark]"
                            :title="item[model.remark]"
                            class="ks-steps-text">备注：{{ item[model.remark] }}</p>
                        <p
                            v-if="item[model.link]"
                            :title="item[model.link]"
                            class="ks-steps-text">
                            <a :href="item[model.link]">{{ item[model.linkName] }}</a>
                        </p>
                    </div>
                    <slot name="desc" />
                </template>
            </el-step>
        </el-steps>
    </div>
</template>

<script lang="ts" src="./index.ts"></script>
<style scoped lang="scss" src="./index.scss"></style>

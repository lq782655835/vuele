<template>
    <el-dialog
        :title="title"
        :visible="visible"
        :close-on-click-modal="false"
        class="ks-import-file-block"
        width="680px"
        append-to-body
        @open="resetComponent"
        @close="close"
    >
        <div v-if="status==='init'">
            <div class="ks-import-init">
                <span>选择要导入的文件：</span>
                <el-button
                    v-if="!hasFile"
                    type="primary"
                    size="small"
                    @click="selectFile">选择文件</el-button>
                <a
                    v-if="templateUrl && !hasFile"
                    :href="templateUrl"
                    class="ks-import-init__download"
                    target="_blank">模板文件下载</a>
                <el-tag
                    v-for="(file, index) in files"
                    :key="index"
                    :title="file.name"
                    closable
                    type="info"
                    class="ks-import-file__tag"
                    @close="onRemoveFile(index)"
                >{{ file.name }}</el-tag>
                <input
                    v-show="false"
                    ref="inputNode"
                    :multiple="false"
                    :accept="accept"
                    type="file"
                    name="file"
                    @change="onFileSelectChange"
                >
            </div>
            <div class="ks-import-tip">
                <h5>注意事项：</h5>
                <p class="ks-import-tip__item">1. 请按照导出文件的格式进行导入，系统数据以本次导入的为准，历史数据的会被覆盖掉；</p>
                <p class="ks-import-tip__item">2. 文件大小不能超过2M。</p>
                <p class="ks-import-tip__item">3. 单次导入的数据最多5000行，如果数据量大，请分批导入；</p>
                <p class="ks-import-tip__item"
                    v-for="(tip, $index) in tips"
                    :key="$index">
                    {{$index + 4}}. {{tip}}
                </p>
            </div>
        </div>

        <div v-if="status === 'uploading'">
            <el-progress
                :text-inside="true"
                :stroke-width="14"
                :percentage="uploadingPercent"
                class="ks-uploading-bar"
                status="success"/>
            <p class="ks-import-status__tip">正在读取数据... {{ uploadingPercent }}%</p>
        </div>

        <div
            v-if="status === 'success'"
            class="ks-import-result">
            <i class="el-icon-success ks-icon__success"></i>
            <div>
                <span>{{ resultMessage || '导入成功' }}</span>
                <div class="ks-import-result-opts">
                    <a
                        href="javascript:;"
                        @click="resetComponent">继续导入</a>
                </div>
            </div>
        </div>
        <div
            v-if="status === 'fail'"
            class="ks-import-result">
            <i class="el-icon-error ks-icon__error"></i>
            <div>
                <span>{{ resultMessage || '导入失败，请检查文档内容，修改后重新导入' }}</span>
                <div class="ks-import-result-opts">
                    <a
                        v-if="resultUrl"
                        :href="resultUrl">下载报错文档</a>
                    <a
                        href="javascript:;"
                        @click="resetComponent">重新导入</a>
                </div>
            </div>
        </div>
        <div slot="footer">
            <el-button
                v-if="status === 'init'"
                @click="close">取消</el-button>
            <el-button
                v-if="status === 'init'"
                type="primary"
                @click="importFile">开始导入</el-button>
            <el-button
                v-if="status === 'success' || status === 'fail'"
                type="primary"
                @click="close">完成</el-button>
        </div>
    </el-dialog>
</template>

<script lang="ts" src="./index.ts" />
<style scoped lang="scss" src="./index.scss" />

<template>
<div class="ks-upload">
    <ul :style="{width: wrapWidth}">
        <template v-for="(file, index) in fileList">
            <li class="ks-upload-fileList-item" :key="`${file.url}${index}`"
                v-if="file.flag != 2">
                <div class="ks-upload-unit">
                    <div class="ks-upload-unit-content">
                        <img v-if="file.type === 'image'"
                            class="ks-upload-unit-content__img"
                            :src="file.url"
                            @click="preview(file)" />

                        <span v-else-if="file.type === 'unknow'"
                            class="ks-upload-unit-content__text"
                            @click="preview(file)">未知</span>

                        <span v-else-if="file.type === 'pdf'"
                            class="ks-upload-unit-content__text"
                            @click="preview(file)">PDF</span>
                        <span v-else
                            class="ks-upload-unit-content__text"
                            @click="preview(file)">{{file.type.toUpperCase()}}</span>

                        <div class="ks-upload-unit-content__tip"
                            v-if="!readonly"
                            @click="remove(file)">
                            <i class="el-icon-error"></i>
                        </div>

                        <div :class="['ks-upload-unit-content-status',
                            `ks-upload-unit-content-status--${file.status}`]">
                            <span v-if="file.status === 'fail'">
                                失败<i class="ks-upload-unit__icon--fail"></i>
                            </span>

                            <span v-if="file.status === 'success'">
                                <a href="javascript:;" @click="onDownLoad(file)">
                                    下载<i class="ks-upload-unit__icon--download"></i>
                                </a>
                            </span>
                        </div>
                    </div>
                    <span class="ks-upload-unit__name"
                        style="webkitBoxOrient: vertical"
                        :title="file.name">
                        {{file.name}}
                    </span>
                </div>
            </li>
        </template>
        <li class="ks-upload-opt" v-if="showAddBtn" @click="onAddBtnClick"
            @dragenter="onDragEnter"
            @dragleave="onDragLeave"
            @dragover="onDragOver"
            @drop="onDragDrop">
            <div :class="['ks-upload-opt-wrap', {'ks-upload-opt-wrap--dragover': dragover}]">
                <span class="ks-upload-opt-ct">
                    <i class="el-icon-plus ks-upload-opt-ct__icon"></i>
                    上传文件
                </span>
            </div>
        </li>
    </ul>
    <form method="POST" target="iframe{_id}" :enctype="encType" ref="form">
        <input type="file"
            ref="inputNode"
            :name="name"
            :multiple="multiple ? true : false"
            :accept="accept"
            v-show="false"
            @change="onFileSelectChange" />
    </form>
</div>
</template>

<script lang="ts" src="./index.ts"></script>
<style scoped lang="scss" src="../index.scss"></style>

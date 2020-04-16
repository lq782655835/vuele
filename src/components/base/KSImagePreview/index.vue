<template>
    <div class="ks-image-preview" @mouseup="onMouseUp($event)">
        <div class="ks-image-preview__close" @click="onClose()"></div>
        <div class="ks-image-preview-slide" @mousewheel="onMouseWheel($event)">
            <span
                class="ks-image-preview-slide-nav ks-image-preview-slide-nav--pre"
                @click="onPrev()">
                <i class="el-icon-arrow-left ks-image-preview-slide-nav__icon" />
            </span>
            <ul class="ks-image-preview-slide-images">
                <li
                    v-for="(img, index) in imageList" :key="img.name"
                    class="ks-image-preview-slide-images-item" ref="fullImages"
                    :class="{'is-current': index === curIndex}" v-show="!showVirtual"
                    :style="{ opacity: index === curIndex ? 1 : 0 }">
                    <img
                        class="ks-image-preview-slide-images-item__img" ref="fullImage"
                        :src="img.src" :alt="img.name"
                        :draggable="false" />
                </li>
            </ul>
            <span
                class="ks-image-preview-slide-nav ks-image-preview-slide-nav--next"
                @click="onNext()">
                <i class="el-icon-arrow-right ks-image-preview-slide-nav__icon" /></span>
            <ul class="ks-image-preview-slide-operate">
                <li
                    v-for="op in opList" :key="op.fnName"
                    class="ks-image-preview-slide-operate-item"
                    :style="{'margin-right': op.name === 'zoomIn' ? '30px' : 0}">
                    <template v-if="op.name === 'zoomIn'">
                        <i :class="`el-icon-${op.icon}`" @click="onFn(op.fnName, curIndex)" />
                        <span
                            class="ks-image-preview-slide-operate-item__scale">
                            {{parseInt(virtualInfo.scale * 100)}}%
                        </span>
                    </template>
                    <template v-else>
                        <i :class="`el-icon-${op.icon}`" @click="onFn(op.fnName, curIndex)" />
                    </template>
                </li>
            </ul>
            <ul
                class="ks-image-preview-slide-stage" ref="virtualzone"
                :style="{ opacity: showVirtual ? 1 : 0 }">
                <li
                    ref="virtualimage"
                    class="ks-image-preview-slide-stage-imgwrap"
                    @mousedown="onMouseDown($event)"
                    @mousemove="onMouseMove($event)"
                    @mouseup="onMouseUp($event)">
                    <img
                        class="ks-image-preview-slide-stage-imgwrap__img"
                        :src="imageList[curIndex] && imageList[curIndex].src"
                        :alt="imageList[curIndex] && imageList[curIndex].name"
                        :draggable="false" />
                </li>
            </ul>
        </div>
        <div class="ks-image-preview-thumbnail">
            <div
                class="ks-image-preview-thumbnail__name"
                :title="imageList[curIndex] && imageList[curIndex].name">
                {{imageList[curIndex] && imageList[curIndex].name}}
            </div>
            <ul class="ks-image-preview-thumbnail-images">
                <li
                    v-for="(img, index) in imageList" :key="img.src"
                    class="ks-image-preview-thumbnail-images-item"
                    :class="{'is-current': index === curIndex}"
                    @click="setCurrentTo(index)">
                    <img
                        class="ks-image-preview-thumbnail-images-item__img"
                        :src="img.src" :alt="img.name" :draggable="false" />
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts" src="./index.ts"></script>
<style scoped lang="scss" src="./index.scss"></style>

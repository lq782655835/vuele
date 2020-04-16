<template>
   <div class="kl-cascader-multi">
      <el-select
          v-model="selectedLabels"
          multiple
          :size="size"
          :popper-class="innerPopperClass"
          @remove-tag="removeOne"
          :filterable="filterable"
          :filter-method="innerFilterMethod"
          :reserve-keyword="reserveKeyword"
          @change="changeLabel"
          v-bind="$attrs"
          @blur="handleBlur"
          @visible-change="visibleChange"
          @focus="handleFocus"
          @clear="handleClear"
          :allow-create="false"
      >
          <span slot="prefix" v-if="$slots.prefix">
              <slot name="prefix"></slot>
          </span>
          <template v-if="!isSearching">
              <el-option value="__root">
                  <div class="ground" @click.stop>
                      <render-list
                          :list="root.childNodes"
                          :level="1"
                          :limit="limit"
                          :active-list="activeList"
                          @handle-click="handleClick"
                          @handle-check="handleCheck"
                          :label-key="labelKey"
                          :expand-trigger="expandTrigger"
                      ></render-list>
                      <template v-for="item in maxLevellist">
                          <div
                              :class="`floor-item floor-position-left-${item.id + 1}`"
                              :key="item.id"
                              v-if="item.rendered"
                              v-show="activeList.length >= item.id"
                          >
                              <render-list
                                  :list="showData[item.id]"
                                  :limit="limit"
                                  :level="item.id + 1"
                                  :active-list="activeList"
                                  @handle-click="handleClick"
                                  @handle-check="handleCheck"
                                  :label-key="labelKey"
                                  :expand-trigger="expandTrigger"
                              ></render-list>
                          </div>
                      </template>
                  </div>
              </el-option>
          </template>
          <template v-if="isSearching">
              <el-option
                  v-for="item in searchResult"
                  :value="item.showLabel"
                  :key="getKey(item)"
              >
                  <div style="width:100%;height:100%" @click.stop="selectOne(item)">
                      {{item.showLabel}}
                  </div>
              </el-option>
          </template>
      </el-select>
  </div>
</template>

<script lang="ts" src="./index.ts" />
<style  lang="scss" src="./index.scss" />

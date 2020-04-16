<template>
  <div class="ks-left-tree-block">
    <el-container>
      <el-aside width="229px">
        <div>
          <el-input
            v-model="filterText"
            size="small"
            class="ks-aside__search"
            placeholder="模糊搜索"
            @input="filter()"
          >
            <template slot="prepend">
              <i class="el-icon-search"/>
            </template>
          </el-input>
        </div>
        <div class="ks-aside-container">
          <ul class="ks-aside-ul">
            <li
              v-for="(item, index) in list"
              v-show="item._display"
              :key="index"
              :id="item.id"
              :name="item.name"
              :class="['ks-aside-item', {'ks-aside-item--active': value == item.id}]"
              @click="onItemClick(item)"
            >
              <span class="ks-aside-item__name">{{ item.name }}</span>
            </li>
          </ul>
        </div>
      </el-aside>

      <el-main width="75%" class="ks-main-container">
        <h3 v-if="!value">未选择条目</h3>
        <el-card v-if="value">
          <div slot="header">
            <span>{{ currentName }}</span>
          </div>
          <slot></slot>
        </el-card>
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>
<style scoped lang="scss" src="./index.scss"></style>

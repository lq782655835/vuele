<template>
  <ul>
    <!-- eslint-disable vue/no-use-v-if-with-v-for -->
    <li class="li-style"
      v-for="(node, nodeIndex) in list"
      :key="getKey(node)"
      v-if="nodeIndex < limit"
      @click="handleClick(node, nodeIndex, level)"
      :class="{'active-li': activeList[level - 1] === node.id}"
      @mouseenter="handleMouseEnter(node, nodeIndex, level)"
    >
      <p class="li-label-style">
        <el-checkbox class="f-mr5" @change="handleCheck($event, node)"
          v-model="node.checked" :disabled="node.disabled"></el-checkbox>
        <span :title="node[labelKey]" style="margin-left:5px">{{node[labelKey]}}</span>
        <i v-if="node.childNodes && node.childNodes.length > 0"
          class="li-label-icon el-icon-arrow-right"></i>
      </p>
    </li>
  </ul>
</template>

<script lang="ts" src="./index.ts" />

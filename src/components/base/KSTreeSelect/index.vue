<template>
  <div class="ks-tree">
    <el-dropdown trigger="click"
      ref="dropdown"
      placement="top-start"
      class="ks-tree-dropdown"
      @visible-change="dropdownVisible=!dropdownVisible">
      <el-input
        :value="checkedNamesShowStr"
        size="small"
        placeholder="暂无选择"
        v-show="canEdit"
        :readonly=true
        :suffix-icon="dropdownVisible ? 'el-icon-arrow-up' : 'el-icon-arrow-down'" />
      <div class="ks-tree-select" v-if="!canEdit">
        <el-input v-if="showAllSelected"
          v-model="filterName"
          class="ks-tree-select-filterName"
          placeholder="输入关键字搜索" />
        <div class="ks-tree-select-nameCtn">
          <!-- v-if="showAllSelected ? true : index < showSelectedCount" -->
          <el-tag :key="index" v-for="(item, index) in filteredCheckedNamesShow"
            type="info"
            size="mini">
              {{item}}
          </el-tag>
          <p v-show="!checkedNamesShow.length">暂无数据</p>
          <el-button v-if="checkedNames.length > showSelectedCount"
            class="ks-tree-select-toggleName"
            @click="filterName = '', showAllSelected = !showAllSelected"
            type="text">{{showAllSelected ? '收起' : '展开'}}
          </el-button>
        </div>
      </div>

      <el-dropdown-menu slot="dropdown" class="ks-tree-dropdown-menu">
        <el-container>
          <el-aside v-if="showButtons && multiple" class="ks-tree-dropdown-aside" width="80px">
            <el-button type="primary" @click="checkAll(true)">全选</el-button>
            <el-button @click="checkAll(false)">清空</el-button>
            <el-button @click="checkReverse">反选</el-button>
          </el-aside>
          <el-main>
            <el-input
                v-if="canSearch"
                v-model.trim="filterText"
                class="ks-tree-dropdown-filter"
                size="small"
                :placeholder="placeholder"
                @focus="onFilterFocus">
            </el-input>

            <el-tree
              ref="tree"
              :node-key="idKey"
              :indent="18"
              :highlight-current=true
              :default-expand-all=false
              :show-checkbox="multiple"
              :data="computedSource"
              :accordion=accordion
              :default-expanded-keys=defaultExpandedKeys
              :default-checked-keys=defaultCheckedKeys
              :props="defaultProps"
              :filter-node-method="filterNode"
              :check-strictly="checkStrictly"
              @check="onCheck"
              @node-click="onNodeClick"
              @check-change="onCheckChange"
              @current-change="onCurrentChange"
              @node-expand="onNodeExpand">
              <span class="ks-custom-tree-node" slot-scope="{ node, data }">
                <span>{{ node.label }}</span>
                <span v-if="!multiple">
                  <el-button type="text" size="mini" @click="singleSelect($event, node, data)">
                    选择
                  </el-button>
                </span>
              </span>
            </el-tree>
          </el-main>
        </el-container>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>

<style scoped lang="scss" src="./index.scss"></style>

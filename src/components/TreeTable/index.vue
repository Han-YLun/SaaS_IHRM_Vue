<template>
    <el-table :data="formatData"  :row-class-name="rowClassStatus" v-loading="listLoading"  element-loading-text="给我一点时间" fit highlight-current-row
      style="width: 100%">
    <el-table-column v-for="(column, index) in columns" :key="column.prop" :width="column.width" :prop="column.prop"
      :label="column.text">
      <template slot-scope="scope">
        <expand
          v-if="column.render"
          :render="column.render"
          :row="scope.row"
          :index="index"
          :column="column"
        >
        </expand>
        <span v-else>
          {{scope.row[column.value]}}
        </span>
      </template>
    </el-table-column>
    <el-table-column label="操作" width="260" align="center">
      <template  slot-scope="scope">
        <el-button
          size="mini"
          type="primary"
          @click="handleUpdate(scope.row)">
          修改
        </el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.row.id)">
          删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import Utils from './utils/dataTranslate.js'
import expand from './utils/expand'
export default {
  name: 'treeTable',
  components: { expand },
  props: {
    // 该属性是确认父组件传过来的数据是否已经是树形结构了，如果是，则不需要进行树形格式化
    treeStructure: {
      type: Boolean,
      default: function() {
        return false
      }
    },
    data: {
      type: Array,
      default: function() {
        return []
      }
    },
    // 这是相应的字段展示
    columns: {
      type: Array,
      default: function() {
        return []
      }
    },
    listLoading: {
      type: Boolean,
      default: false
    },
    // 是否默认展开所有树
    defaultExpandAll: {
      type: Boolean,
      default: function() {
        return true
      }
    }
  },
  computed: {
    // 格式化数据源
    formatData: function() {
      let me = this
      if (me.treeStructure) {
        let data = Utils.treeToArray(me.data, null, null, me.defaultExpandAll)
        return data
      }
      return me.data
    }
  },
  methods: {
    rowClassStatus: function() {
      this.$emit('rowClassStatus')
    },
    handleUpdate(row) {
      this.$emit('handleUpdate', row)
    },
    handleDelete(user) {
      this.$emit('removeUser', user)
    }
  }
}
</script>
<style rel="stylesheet/css">
.ivu-icon-ios-folder-outline {
  content: '\F434';
}
@keyframes treeTableShow {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@-webkit-keyframes treeTableShow {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>

<style lang="scss" rel="stylesheet/scss" scoped>
$color-blue: #2196f3;
$space-width: 18px;
.ms-tree-space {
  position: relative;
  top: 1px;
  display: inline-block;
  font-style: normal;
  font-weight: 400;
  line-height: 1;
  width: $space-width;
  height: 14px;
  &::before {
    content: '';
  }
}
.processContainer {
  width: 100%;
  height: 100%;
}
table td {
  line-height: 26px;
}

.tree-ctrl {
  position: relative;
  cursor: pointer;
  color: $color-blue;
  margin-left: -$space-width;
}
</style>

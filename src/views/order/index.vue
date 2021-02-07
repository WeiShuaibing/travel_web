<template>
    <div class="app-container">
      <el-row>
        <h2></h2>
      </el-row>
      <el-row>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column label="订单ID" prop="id"></el-table-column>
          <el-table-column label="姓名" prop="user.name"></el-table-column>
          <el-table-column label="景点名称" prop="scenic.name"></el-table-column>
          <el-table-column label="订单时间" prop="createDate"></el-table-column>
          <el-table-column label="拼单类型" prop="type"></el-table-column>
          <el-table-column label="订单状态">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.status === 0">拼单中...</el-tag>
              <el-tag v-if="scope.row.status === 1" type="success">拼单成功</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="danger" size="mini" @click="deleteOrder(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
    </div>
</template>

<script>
import { allOrder, deleteById } from '../../api/order'
export default {
  name: 'OrderIndex',
  data() {
    return {
      tableData: []
    }
  },
  filters: {

  },
  mounted() {
    this.getOrders()
  },
  methods: {
    deleteOrder(row) {
      this.$confirm('此操作将永久删除该订单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteById(row.id).then(res => {
          this.getOrders()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    getOrders() {
      allOrder().then(res => {
        console.log(res.data)
        this.tableData = res.data
      })
    }
  }
}
</script>

<style scoped>

</style>

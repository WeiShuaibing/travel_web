<template>
  <div class="app-container">
    <el-row>
      <el-col :span="2">
        <div style="margin-top: 15px;">
          <el-button icon="el-icon-circle-plus-outline" type="primary" @click="addScenic">新增景点</el-button>
        </div>
      </el-col>
      <el-col :offset="2" :span="4">
        <div style="margin-top: 15px;">
          <el-input placeholder="输入关键词搜索景点" v-model="matchStr" @keyup.enter.native="search" class="input-with-select">
            <el-button slot="append" icon="el-icon-search" @click="search()"></el-button>
          </el-input>
        </div>
      </el-col>
    </el-row>

    <!--景点列表-->
    <el-row style="width: 99%;margin: 0 auto;margin-top: 15px;">
      <el-table :data="scenicList" stripe border style="width: 100%">
        <el-table-column prop="scenicId" label="ID" width="50"/>
        <el-table-column prop="name" label="景点名称" width="130"/>
        <el-table-column prop="address" label="地址" width="180"/>
        <el-table-column prop="price" label="门票" width="100"/>
        <el-table-column prop="priceCar" label="汽车拼团" width="100"/>
        <el-table-column prop="priceTrain" label="火车拼团" width="100"/>
        <el-table-column prop="pricePlane" label="飞机拼团" width="100"/>
        <el-table-column prop="des" label="简介" />
        <el-table-column prop="cover" label="封面" width="180">
          <template slot-scope="scope">
            <img :src="scope.row.cover" style="height: 100px;width: 150px">
          </template>
        </el-table-column>
        <el-table-column prop="createDate" label="创建时间" width="240"/>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button style="margin-left: 10px;" type="primary" plain size="mini" @click="editScenic(scope.row)">编辑</el-button>
            <br style="line-height: 8px">
            <el-button style="margin-left: 10px;margin-top: 5px;" size="mini" plain type="danger" @click="deleteScenic(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
  </div>
</template>

<script>
import { getAll, deleteById } from '../../api/scenic'
export default {
  name: 'ScenicIndex',
  data() {
    return {
      scenicList: [],
      matchStr: '',
      UPLOAD_PATH: ''
    }
  },
  filters: {},
  mounted() {
    this.getPage()
  },
  methods: {
    search() {
      this.getPage()
    },
    editScenic(row) {
      this.$router.push({ path: '/scenic/AddScenic', query: { scenicId: row.scenicId }})
    },
    deleteScenic(row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteById(row.scenicId).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功！'
          })
          this.getPage()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    addScenic() {
      this.$router.push({ path: '/scenic/AddScenic' })
    },
    getPage() {
      getAll(this.matchStr).then(res => {
        this.scenicList = res.data
        // 将图片url进行拼接host
        this.scenicList.forEach((e) => {
          e.cover = this.$UPLOAD_HOST + e.cover
        })
      })
    }
  }
}
</script>

<style scoped>

</style>

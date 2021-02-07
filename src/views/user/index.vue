<template>
  <div class="app-container">
    <el-row>
      <el-col :span="4">
       <!-- <el-input placeholder="请输入关键字搜索" v-model="matchStr" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>-->
      </el-col>
    </el-row>
    <el-col>
      <el-table
        :data="tableData.filter(data => !matchStr || data.name.toLowerCase().includes(matchStr.toLowerCase()))"
        style="width: 100%">
        <el-table-column label="学号" prop="userId"></el-table-column>
        <el-table-column label="姓名" prop="name"></el-table-column>
        <el-table-column label="手机" prop="phone"></el-table-column>
        <el-table-column label="性别" prop="sex"></el-table-column>
        <el-table-column label="学校" prop="school"></el-table-column>
        <el-table-column label="班级" prop="myclass"></el-table-column>
        <el-table-column label="类型" prop="type"></el-table-column>
        <el-table-column label="注册时间" prop="createDate"></el-table-column>
        <el-table-column
          align="right">
          <template slot="header" slot-scope="scope">
            <el-input
              v-model="matchStr"
              size="mini"
              placeholder="输入关键字搜索"/>
          </template>
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-col>

    <!--弹出窗Start-->
    <el-dialog title="收货地址" :visible.sync="dialogVisible">
      <el-form :model="form">
        <el-form-item label="学号" :label-width="formLabelWidth">
          <el-input disabled v-model="form.userId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机" :label-width="formLabelWidth">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth">
          <el-input v-model="form.sex" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学校" :label-width="formLabelWidth">
          <el-input v-model="form.school" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="班级" :label-width="formLabelWidth">
          <el-input v-model="form.myclass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="类型" disabled :label-width="formLabelWidth">
          <el-select v-model="form.type" placeholder="请选择类型">
            <el-option label="学生" value="student"></el-option>
            <el-option label="教师" value="teacher"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="enshureEdit">确 定</el-button>
      </div>
    </el-dialog>
    <!--弹出窗End-->

  </div>
</template>

<script>
import { getAll, deleteById, save } from '../../api/user'
export default {
  name: 'UserIndex',
  data() {
    return {
      matchStr: '',
      dialogVisible: false,
      formLabelWidth: '120px',
      tableData: [],
      form: {
        userId: '',
        name: '',
        phone: '',
        sex: '',
        school: '',
        myclass: '',
        type: ''
      }
    }
  },
  mounted() {
    this.allUser()
  },
  methods: {
    enshureEdit() {
      save(this.form).then(res => {
        this.dialogVisible = false
        this.allUser()
      })
    },
    allUser() {
      getAll().then(res => {
        this.tableData = res.data
      })
    },
    handleEdit(row) {
      this.dialogVisible = true
      this.form = row
    },
    handleDelete(row) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteById(row.userId).then(res => {
          this.allUser()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style scoped>

</style>

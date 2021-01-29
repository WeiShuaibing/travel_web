<template>
  <div>
    <!--置顶保存按钮-->
    <el-row style="background: #d0d0d0;margin: 0;padding-top: 10px;padding-bottom: 10px;">
      <el-col :offset="21" :span="2">
        <el-button type="primary" @click="toSave">保&nbsp;&nbsp;&nbsp;存</el-button>
      </el-col>
    </el-row>
    <!--封面图片-->
    <el-row style="width: 95%;margin: 0 auto;margin-top: 25px">
      <el-col :span="8">
        <el-form ref="form" :model="scenic_baseinfo" label-width="80px">
          <el-form-item label="景区名称:">
            <el-input v-model="scenic_baseinfo.name" />
          </el-form-item>
          <el-form-item label="景区地址:">
            <el-input v-model="scenic_baseinfo.address" />
          </el-form-item>
          <el-form-item label-width="120px" label="景区原本票价:">
            <el-input-number v-model="scenic_baseinfo.price" :precision="2" :step="0.1" :max="1000" />
          </el-form-item>
          <el-form-item label-width="120px" label="汽车拼团价格:">
            <el-input-number v-model="scenic_baseinfo.priceCar" :precision="2" :step="0.1" :max="1000" />
          </el-form-item>
          <el-form-item label-width="120px" label="火车拼团价格:">
            <el-input-number v-model="scenic_baseinfo.priceTrain" :precision="2" :step="0.1" :max="1000" />
          </el-form-item>
          <el-form-item label-width="120px" label="飞机拼团价格:">
            <el-input-number v-model="scenic_baseinfo.pricePlane" :precision="2" :step="0.1" :max="1000" />
          </el-form-item>
          <el-form-item label="简介:">
            <el-input v-model="scenic_baseinfo.des" type="textarea" :rows="2" />
          </el-form-item>
        </el-form>

      </el-col>
      <el-col :offset="8" :span="8">
        <span style="line-height: 37px;">景点封面：</span>
        <div style="width: 178px;height: 178px;margin-left: 5%;margin-bottom: 20px;">
          <el-upload
            class="avatar-uploader"
            :action="UPLOAD_PATH"
            :show-file-list="false"
            :on-success="handleUpLoadSuccess"
            :before-upload="beforeFengMianUpload"
          >
            <img v-if="coverUrl" :src="coverUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </div>
      </el-col>
    </el-row>
    <el-row style="margin: 0 auto;">
      <div style="margin-left:30px;line-height: 37px;margin-bottom: -20px;">
        <span>景点详情:</span>
      </div>
      <div>
        <!--富文本-->
        <div class="components-container" style="box-shadow: 0px 2px 12px 6px rgba(0, 0, 0, 0.1)">
          <div>
            <tinymce v-model="scenic_baseinfo.text" :height="300" />
          </div>
          <!--          <div class="editor-content" v-html="scenic_detail"></div>-->
        </div>
      </div>
    </el-row>

    <div style="height: 400px;width: 100%;" />
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import { save, getById } from '../../api/scenic'

export default {
  name: 'AddScenic',
  components: { Tinymce },
  data() {
    return {
      isEdit: false,
      scenicId: '',
      UPLOAD_PATH: '',
      coverUrl: '',
      scenic_baseinfo: {
        scenicId: 0,
        name: '',
        cover: '',
        address: '',
        des: '',
        price: null,
        priceCar: null,
        priceTrain: null,
        pricePlane: null,
        text: null
      }
    }
  },
  mounted() {
    this.initUploadPath()
    this.getRouterParam()
  },
  methods: {
    getRouterParam() {
      if (this.$route.query.scenicId) {
        this.scenic_baseinfo.scenicId = this.$route.query.scenicId
        this.isEdit = true
        getById(this.scenic_baseinfo.scenicId).then(res => {
          this.scenic_baseinfo = res.data
          this.coverUrl = this.$UPLOAD_HOST + this.scenic_baseinfo.cover
          console.log('this.scenic_baseinfo')
          console.log(this.scenic_baseinfo)
        })
      }
    },
    toSave() {
      var d = this.scenic_baseinfo
      if (d.name === '' || d.address === '' || d.price === null || d.priceCar === null ||
      d.priceTrain === null || d.pricePlane === null || d.des === '' || d.cover === '' ||
      d.text === '') {
        this.$message.error('请完善信息')
        return
      }
      save(this.scenic_baseinfo).then(res => {
        this.$router.push({ path: '/scenic/index' })
      })
    },
    handleUpLoadSuccess(res, file) {
      this.scenic_baseinfo.cover = res.data.path
      this.coverUrl = this.$UPLOAD_HOST + res.data.path
    },
    beforeFengMianUpload() {},
    initUploadPath() {
      this.UPLOAD_PATH = this.$UPLOAD_PATH
    }
  }
}
</script>

<style scoped>
  .avatar-uploader{
    border: 2px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .map {
    margin: 0 auto;
    margin-top: 20px;
    width: 95%;
    height: 300px;
  }
</style>

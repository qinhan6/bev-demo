<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>更换头像</span>
    </div>
    <div>
      <!-- 图片，用来展示用户选择的头像 -->
      <img v-if="avatar" :src="avatar" alt="" class="preview" />
      <img v-else src="../../../assets/images/avatar.jpg" alt="" class="preview" />

      <!-- 按钮区域 -->
      <div class="btn-box">
        <input type="file" style="display:none" accept="image/*" ref="iptImg" @change="hImgChange">
        <el-button type="primary" icon="el-icon-plus" @click="$refs.iptImg.click()">选择图片</el-button>
        <el-button type="success" icon="el-icon-upload" :disabled="!avatar" @click="hUploadImg">上传头像</el-button>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'UserAvatar',
  data () {
    return {
      avatar: ''
    }
  },
  methods: {
    hImgChange (e) {
      // console.log(e.target.files[0])
      const file = e.target.files[0]
      if (file) {
        const fl = new FileReader()
        // console.log(fl)
        fl.readAsDataURL(file)
        fl.onload = e => {
          // console.log(e.target.result)
          this.avatar = e.target.result
        }
      } else {
        this.avatar = ''
      }
    },
    async hUploadImg () {
      const { data: res } = await this.$axios.patch('/my/update/avatar', { avatar: this.avatar })
      // console.log(res)
      if (res.code !== 0) return this.$message.error(res.message)
      this.$message.success(res.message)
      this.$store.dispatch('user/getUserInfo')
      this.avatar = ''
    }
  }
}
</script>

<style lang="less" scoped>
.btn-box {
  margin-top: 10px;
}
.preview {
  object-fit: cover;
  width: 350px;
  height: 350px;
}
</style>

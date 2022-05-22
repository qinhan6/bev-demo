<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>重置密码</span>
    </div>
    <!-- 表单 -->
    <el-form :model="pwdForm" :rules="pwdFormRules" ref="pwdForm" label-width="100px">
      <el-form-item label="原密码" prop="old_pwd">
        <el-input v-model="pwdForm.old_pwd" type="password"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="new_pwd">
        <el-input v-model="pwdForm.new_pwd" type="password"></el-input>
      </el-form-item>
      <el-form-item label="确认新密码" prop="re_pwd">
        <el-input v-model="pwdForm.re_pwd" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="hSubmit">修改密码</el-button>
        <el-button @click="$refs.pwdForm.resetFields()">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  name: 'UserPwd',
  data () {
    const checkPwd = (rule, value, callback) => {
      if (value === this.pwdForm.old_pwd) {
        callback(new Error('输入的密码不能与旧密码相同'))
      } else {
        callback()
      }
    }
    const checkrePwd = (rule, value, callback) => {
      if (value !== this.pwdForm.new_pwd) {
        callback(new Error('输入的密码不能与新密码相同'))
      } else {
        callback()
      }
    }
    return {
      // 表单的数据对象
      pwdForm: {
        old_pwd: '',
        new_pwd: '',
        re_pwd: ''
      },
      // 表单的验证规则对象
      pwdFormRules: {
        old_pwd: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { pattern: /^\S{6,15}$/, message: '密码长度必须是6-15位的非空字符串', trigger: 'blur' }
        ],
        new_pwd: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { pattern: /^\S{6,15}$/, message: '密码长度必须是6-15位的非空字符串', trigger: 'blur' },
          { validator: checkPwd, trigger: 'blur' }
        ],
        re_pwd: [
          { required: true, message: '请再次确认新密码', trigger: 'blur' },
          { pattern: /^\S{6,15}$/, message: '密码长度必须是6-15位的非空字符串', trigger: 'blur' },
          { validator: checkrePwd, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    hSubmit () {
      this.$refs.pwdForm.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$axios.patch('/my/updatepwd', this.pwdForm)
        if (res.code !== 0) return this.$message.error(res.message)
        this.$message.success('密码重置成功, 请重新登录')
        this.$router.push('/login')
      })
    }
  }
}
</script>

<style lang="less" scoped>
.el-form {
  width: 500px;
}
</style>

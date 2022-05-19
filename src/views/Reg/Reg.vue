<template>
  <!-- 注册页面的整体盒子 -->
  <div class="reg-container">
    <!-- 注册的盒子 -->
    <div class="reg-box">
      <!-- 标题的盒子 -->
      <div class="title-box"></div>
      <!-- 注册的表单区域 -->
      <el-form :model="regForm" :rules="regRules" ref="regForm"  class="demo-regForm">
        <el-form-item prop="username">
          <el-input prefix-icon="el-icon-user" placeholder="请输入用户名" v-model="regForm.username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input prefix-icon="el-icon-lock" placeholder="请输入密码" v-model="regForm.password"></el-input>
        </el-form-item>
        <el-form-item prop="repassword">
          <el-input prefix-icon="el-icon-lock" placeholder="请再次确认密码" v-model="regForm.repassword"></el-input>
        </el-form-item>
        <el-button type="primary" style="width: 100%" @click="hReg">注册</el-button>
        <el-link type="info" @click="$router.push('/login')">去登录</el-link>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyReg',
  data () {
    const cheekPass = (rule, value, callback) => {
      if (value !== this.regForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      regForm: {
        username: '',
        password: '',
        repassword: ''
      },
      regRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { pattern: /^[a-zA-z][a-zA-Z0-9]{0,9}$/, message: '用户名是 1 ~ 10 位字符, 且首位是字母', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { pattern: /^\S{6,15}$/, message: '密码是6 ~ 15 位非空字符', trigger: 'blur' }
        ],
        repassword: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { pattern: /^\S{6,15}$/, message: '密码是6 ~ 15 位非空字符', trigger: 'blur' },
          { validator: cheekPass, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    hReg () {
      this.$refs.regForm.validate(async (valid) => {
        if (!valid) return
        const { data: res } = await this.$axios.post('/api/reg', this.regForm)
        // console.log(res)
        if (res.code !== 0) return this.$message.error(res.message)
        this.$message.success(res.message)
        this.$router.push('/login')
      })
    }
  }
}
</script>

<style lang="less" scoped>
.reg-container {
  background: url('../../assets/images/login_bg.jpg') center;
  background-size: cover;
  height: 100%;

  .reg-box {
    width: 400px;
    height: 335px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    box-sizing: border-box;
    padding: 0 20px;

    .title-box {
      height: 60px;
      background: url('../../assets/images/login_title.png') center no-repeat;
    }
  }
}
</style>

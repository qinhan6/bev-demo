<template>
  <!-- 登录页面的整体盒子 -->
  <div class="reg-container">
    <!-- 登录的盒子 -->
    <div class="reg-box">
      <!-- 标题的盒子 -->
      <div class="title-box"></div>
      <!-- 登录的表单区域 -->
      <el-form :model="loginForm" :rules="loginRules" ref="loginForm"  class="demo-loginForm">
        <el-form-item prop="username">
          <el-input prefix-icon="el-icon-user" placeholder="请输入用户名" v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input prefix-icon="el-icon-lock" placeholder="请输入密码" v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width: 100%" @click="hLogin">登录</el-button>
          <el-link type="info" @click="$router.push('/reg')">去登录</el-link>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyLogin',
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { pattern: /^[a-zA-z][a-zA-Z0-9]{0,9}$/, message: '用户名是 1 ~ 10 位字符, 且首位是字母', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { pattern: /^\S{6,15}$/, message: '密码是6 ~ 15 位非空字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    hLogin () {
      this.$refs.loginForm.validate(async (valid) => {
        if (!valid) return
        const { data: res } = await this.$axios.post('/api/login', this.loginForm)
        // console.log(res)
        if (res.code !== 0) return this.$message.error(res.message)
        this.$message.success(res.message)
        this.$store.commit('user/updataToken', res.token)
        this.$router.push('/')
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
    height: 270px;
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

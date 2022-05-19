<template>
  <el-container class="main-container">
    <!-- 头部区域 -->
    <el-header>
      <!-- 左侧的 logo -->
      <img src="../../assets/images/logo.png" alt="" />
      <!-- 右侧的菜单 -->
      <el-menu
        class="el-menu-top"
        mode="horizontal"
        background-color="#23262E"
        text-color="#fff"
        active-text-color="#409EFF"
      >
        <el-submenu index="1">
          <template slot="title">
            <!-- 头像 -->
            <img v-if="userInfo.user_pic" :src="userInfo.user_pic" alt=""  class="avatar"/>
            <img v-else src="../../assets/logo.png" alt="" class="avatar" />
            <span>个人中心</span>
          </template>
          <el-menu-item index="1-1"><i class="el-icon-s-operation"></i>基本资料</el-menu-item>
          <el-menu-item index="1-2"><i class="el-icon-camera"></i>更换头像</el-menu-item>
          <el-menu-item index="1-3"><i class="el-icon-key"></i>重置密码</el-menu-item>
        </el-submenu>
        <el-menu-item index="2" @click="hLogout"><i class="el-icon-switch-button"></i>退出</el-menu-item>
      </el-menu>
    </el-header>
    <el-container>
      <!-- 侧边栏区域 -->
      <el-aside width="200px">
        <div class="user-box">
          <img v-if="userInfo.user_pic" :src="userInfo.user_pic" alt="" />
          <img v-else src="../../assets/logo.png" alt="" />
          <span>欢迎 {{userInfo.nickname || userInfo.username}}</span>
        </div>
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          background-color="#23262E"
          text-color="#fff"
          active-text-color="#409EFF">
          <template v-for="item in menus">
            <el-submenu v-if="item.children" :index="item.indexPath" :key="item.  indexPath">
              <template slot="title">
                <i :class="item.icon"></i>
                <span>{{item.title}}</span>
              </template>
              <el-menu-item-group v-for="child in item.children" :key="child.indexPath">
                <el-menu-item :index="child.indexPath" >
                  <i :class="child.icon"></i>
                 <span>{{child.title}}</span>
                  </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-menu-item v-else :index="item.indexPath" :key="item.indexPath">
              <i :class="item.icon"></i>
              <span slot="title">{{item.title}}</span>
            </el-menu-item>
          </template>
        </el-menu>
      </el-aside>
      <el-container>
        <!-- 页面主体区域 -->
        <el-main>
          Main.vue后台主页
        </el-main>
        <!-- 底部 footer 区域 -->
        <el-footer>© www.itheima.com - 黑马程序员</el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'MyMain',
  data () {
    return {
      menus: []
    }
  },
  methods: {
    hLogout () {
      this.$confirm('你确定要退出吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.commit('user/updataToken', '')
        this.$router.push('/login')
      }).catch(() => {
      })
    },
    async getMenus () {
      const { data: res } = await this.$axios.get('/my/menus')
      // console.log(res)
      this.menus = res.data
    }
  },
  computed: {
    ...mapState('user', ['userInfo', 'token'])
  },
  async created () {
    await this.getMenus()
    this.$store.dispatch('user/getUserInfo')
  }
}
</script>

<style lang="less" scoped>
.main-container {
  height: 100%;
  .el-header,
  .el-aside {
    background-color: #23262e;
  }
  .el-header {
    padding: 0;
    display: flex;
    justify-content: space-between;
  }
  .el-main {
    overflow-y: scroll;
    height: 0;
    background-color: #F2F2F2;
  }
  .el-footer {
    background-color: #eee;
    font-size: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.avatar {
  border-radius: 50%;
  width: 35px;
  height: 35px;
  background-color: #fff;
  margin-right: 10px;
  object-fit: cover;
}

// 左侧边栏用户信息区域
.user-box {
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid #000;
  border-bottom: 1px solid #000;
  user-select: none;
  img {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background-color: #fff;
    margin-right: 15px;
    object-fit: cover;
  }
  span {
    color: white;
    font-size: 12px;
  }
}
</style>

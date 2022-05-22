<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>文章列表</span>
      </div>
      <!-- 搜索区域 -->
      <div class="search-box">
        <el-form :inline="true" :model="q">
          <el-form-item label="文章分类">
            <el-select v-model="q.cate_id" placeholder="请选择分类" size="small">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="发布状态" style="margin-left: 15px;">
            <el-select v-model="q.state" placeholder="请选择状态" size="small">
              <el-option label="已发布" value="已发布"></el-option>
              <el-option label="草稿" value="草稿"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small">筛选</el-button>
            <el-button type="info" size="small">重置</el-button>
          </el-form-item>
        </el-form>
        <!-- 发表文章的按钮 -->
        <el-button type="primary" size="small" class="btn-pub" @click="pubVisible = true">发表文章</el-button>
      </div>

      <!-- 文章表格区域 -->
      <el-table :data="artList" style="width: 100%;" border stripe>
        <el-table-column label="文章标题" prop="title"></el-table-column>
        <el-table-column label="分类" prop="cate_name"></el-table-column>
        <el-table-column label="发表时间" prop="pub_date">
          <template v-slot="{ row }">
            {{ formatDate(row.pub_date) }}
          </template>
        </el-table-column>
        <el-table-column label="状态" prop="state"></el-table-column>
        <el-table-column label="操作"></el-table-column>
      </el-table>

      <!-- 分页区域 -->
      <el-dialog title="发表文章" :visible.sync="pubVisible" fullscreen :before-close="handleClose">
        <!-- 发布文章的对话框 -->
        <el-form :model="pubForm" :rules="pubRules" ref="pubForm" label-width="100px">
          <el-form-item label="文章标题" prop="title">
            <el-input v-model="pubForm.title" placeholder="请输入标题"></el-input>
          </el-form-item>
          <el-form-item label="文章分类" prop="cate_id">
            <el-select v-model="pubForm.cate_id" placeholder="请选择分类" style="width: 100%;">
              <el-option v-for="item in cateList" :key="item.id" :label="item.cate_name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <!-- 富文本编辑器 -->
          <el-form-item label="文章内容" prop="content">
            <quill-editor v-model="pubForm.content" @blur="$refs.pubForm.validateField('content')">
            </quill-editor>
          </el-form-item>
          <!-- 文章封面 -->
          <el-form-item label="文章封面" prop="cover_img">
            <!-- 用来显示封面的图片 -->
            <img v-if="preview" :src="preview" alt="" class="cover-img" ref="imgRef" />
            <img v-else src="../../../assets/images/cover.jpg" alt="" class="cover-img" ref="imgRef" />
            <br />
            <!-- 文件选择框，默认被隐藏 -->
            <input type="file" style="display: none;" accept="image/*" ref="iptFile" @change="hImgChange" />
            <!-- 选择封面的按钮 -->
            <el-button type="text" @click="$refs.iptFile.click()">+ 选择封面</el-button>
          </el-form-item>
          <el-form-item prop="state">
            <el-button type="primary" @click="hPub('已发布')">发布</el-button>
            <el-button type="info" @click="hPub('草稿')">存为草稿</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
  name: 'ArtList',
  data () {
    return {
      pubVisible: false,
      cateList: [],
      artList: [],
      preview: '',
      // 查询参数对象
      q: {
        pagenum: 1,
        pagesize: 10,
        cate_id: '',
        state: ''
      },
      // 控制发表文章对话框的显示与隐藏
      pubForm: {
        title: '',
        cate_id: '',
        content: '',
        cover_img: '',
        state: ''
      },
      pubRules: {
        title: [
          { required: true, message: '请输入文章标题', trigger: 'blur' },
          { min: 1, max: 30, message: '文章标题的长度为1-30个字符', trigger: 'blur' }
        ],
        cate_id: [
          { required: true, message: '请选择文章标题', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入文章内容', trigger: 'blur' }
        ],
        cover_img: [
          { required: true, message: '请选择图片', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleClose (done) {
      this.$confirm('这样会丢失数据, 确认关闭?', '提示', {
        type: 'warning'
      }).then(() => {
        done()
      })
        .catch(() => {})
    },
    async loadCateList () {
      const { data: res } = await this.$axios.get('/my/cate/list')
      if (res.code === 0) {
        this.cateList = res.data
      }
    },
    hImgChange (e) {
      // console.log(e.target.files)
      const file = e.target.files[0]
      if (file) {
        this.pubForm.cover_img = file
        // const img = URL.createObjectURL(file)
        // console.log(img)
        this.preview = URL.createObjectURL(file)
        this.$refs.pubForm.validateField('cover_img')
      } else {
        this.pubForm.cover_img = ''
        this.preview = ''
      }
    },
    hPub (state) {
      // console.log(state)
      this.pubForm.state = state
      this.$refs.pubForm.validate(async valide => {
        if (!valide) return
        const fd = new FormData()
        const arr = Object.keys(this.pubForm)
        arr.forEach(k => fd.append(k, this.pubForm[k]))
        const { data: res } = await this.$axios.post('/my/article/add', fd)
        // console.log(res)
        if (res.code !== 0) return this.$message.error(res.message)
        this.$message.success(res.message)
        this.pubVisible = false
        this.$refs.pubForm.resetFields()
        this.preview = ''
      })
    },
    async loadArtList () {
      const { data: res } = await this.$axios.get('/my/article/list', { params: this.q })
      this.artList = res.data
      // console.log(this.artList)
    },
    formatDate (date) {
      // console.log(date)
      return dayjs(date).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  created () {
    this.loadCateList()
    this.loadArtList()
  }
}
</script>

<style lang="less" scoped>
.search-box {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  .btn-pub {
    margin-top: 5px;
  }
}

/deep/ .ql-editor {
  height: 300px;
}
</style>

<template>
  <div class="components-container" style='height:100vh'>
    <el-card>
      <div class="head-lavel">
        <div class="table-button">
          <router-link :to="'addwiki'">
            <el-button type="primary" icon="el-icon-plus">新建</el-button>
          </router-link>
        </div>
        <div class="table-search">
          <el-input
            placeholder="标题或内容"
            v-model="searchdata"
            @keyup.enter.native="searchClick">
            <i class="el-icon-search el-input__icon" slot="suffix" @click="searchClick"></i>
          </el-input>
        </div>
      </div>
      <div>
        <el-table :data='tableData' border style="width: 100%">
          <el-table-column prop='title' label='标题'>
            <template slot-scope="scope">
              <router-link :to="'editwiki/' + scope.row.id">
                <a style="color: #257cff">{{scope.row.title}}</a>
              </router-link>
            </template>
          </el-table-column>
          <el-table-column prop='type' label='类型'></el-table-column>
          <el-table-column prop='create_user' label='创建人'></el-table-column>
          <el-table-column prop='create_time' label='创建时间'>
            <template slot-scope="scope">
              <div slot="reference" class="name-wrapper" style="text-align: center; color: rgb(0,0,0)">
                <span>{{scope.row.create_time | parseDate}}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop='update_time' label='更新时间'>
            <template slot-scope="scope">
              <div slot="reference" class="name-wrapper" style="text-align: center; color: rgb(0,0,0)">
                <span>{{scope.row.update_time | parseDate}}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button @click="deleteGroup(scope.row.id)" type="danger" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="table-pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-sizes="pagesize"
          :page-size="listQuery.limit"
          :layout="pageformat"
          :total="tabletotal">
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getWiki, deleteWiki } from '@/api/wiki'
import { LIMIT, pagesize, pageformat } from '@/config'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      tableData: [],
      tabletotal: 0,
      searchdata: '',
      currentPage: 1,
      pagesize: pagesize,
      pageformat: pageformat,
      rowdata: {},
      listQuery: {
        limit: LIMIT,
        offset: '',
        create_user__username: localStorage.getItem('username'),
        search: this.searchdata
      }
    }
  },

  created() {
    this.fetchData()
  },
  computed: {
    ...mapGetters([
      'role'
    ])
  },
  methods: {
    fetchData() {
      if (this.role === 'super') {
        delete this.listQuery.create_user__username
      }
      getWiki(this.listQuery).then(response => {
        this.tableData = response.data.results
        this.tabletotal = response.data.count
      })
    },
    deleteGroup(id) {
      deleteWiki(id).then(response => {
        this.$message({
          message: '恭喜你，删除成功',
          type: 'success'
        })
        this.fetchData()
      }).catch(error => {
        this.$message.error('删除失败')
        console.log(error)
      })
    },
    closeEditForm() {
      this.fetchData()
    },
    handleEdit(row) {
      this.editForm = true
      this.rowdata = row
    },
    searchClick() {
      this.fetchData()
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.fetchData()
    },
    handleCurrentChange(val) {
      this.listQuery.offset = (val - 1) * LIMIT
      this.fetchData()
    }
  }
}
</script>

<style lang='scss'>

</style>

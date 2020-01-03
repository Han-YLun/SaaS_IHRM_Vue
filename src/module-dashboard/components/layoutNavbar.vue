<template>
  <el-menu class="navbar" mode="horizontal">
    <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>

    <breadcrumb class="breadcrumb-container"></breadcrumb>

    <div class="right-menu">
      <!-- 站内搜索 -->
      <div class="item">
        <el-tooltip effect="dark" :content="$t('navbar.search')" placement="bottom">
          <el-button icon="el-icon-search" type="text" class="btnSearch" @click="handleBtnSearch"></el-button>
        </el-tooltip>
        <transition name="el-fade-in-linear">
          <el-autocomplete 
            ref="searchInput"
            v-model="searchVal"
            :fetch-suggestions="querySearchAsync" 
            @select="handleSelect" 
            @blur="showSearchInput = false"
            placeholder="站内搜索" 
            :trigger-on-focus="true"
            v-show="showSearchInput" ></el-autocomplete>
        </transition>
      </div>
      <!-- 使用文档 -->
      <a href="http://itheimaadmin.itcast.cn/book/help" class="item" target="_blank">
        <el-tooltip class="item" effect="dark" content="使用文档" placement="bottom"><i class="el-icon-question"></i></el-tooltip>
      </a>
      <!-- 错误 -->
      <error-log class="error item"></error-log>
      <!-- 全屏 -->
      <el-tooltip effect="dark" :content="$t('navbar.screenfull')" placement="bottom">
        <screenfull class="item" style="color:#fff;"></screenfull>
      </el-tooltip>
      <!-- 多语言 -->
      <lang-select class="item"></lang-select>
      <!-- 换肤 -->
      <el-tooltip effect="dark" :content="$t('navbar.theme')" placement="bottom">
        <theme-picker class="item"></theme-picker>
      </el-tooltip>
      <!-- 用户信息 -->
      <el-dropdown class="item">
        <span class="el-dropdown-link">
          <img class="avatar" src="../assets/bigUserHeader.png">
          {{name}}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/">
            <el-dropdown-item>
              {{$t('navbar.dashboard')}}
            </el-dropdown-item>
          </router-link>
          <a target='_blank' href="https://github.com/itheima2017/vue-element-admin-itheima">
            <el-dropdown-item>
              {{$t('navbar.github')}}
            </el-dropdown-item>
          </a>
          <el-dropdown-item divided>
            <span @click="logout" style="display:block;">{{$t('navbar.logOut')}}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import ErrorLog from '@/components/ErrorLog'
import Screenfull from '@/components/Screenfull'
import LangSelect from '@/components/LangSelect'
import ThemePicker from '@/components/ThemePicker'
import { search } from '@/api/base/menus'

export default {
  name: 'layoutNavBar',
  components: {
    Breadcrumb,
    Hamburger,
    ErrorLog,
    Screenfull,
    LangSelect,
    ThemePicker
  },
  computed: {
    ...mapGetters(['sidebar', 'name', 'avatar'])
  },
  data() {
    return {
      searchVal: '',
      timeout: null,
      showSearchInput: false,
      restaurants: []
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('toggleSideBar')
    },
    logout() {
      this.$store.dispatch('FedLogOut').then(() => {
        location.reload() // In order to re-instantiate the vue-router object to avoid bugs
      })
    },
    handleBtnSearch() {
      this.showSearchInput = !this.showSearchInput
      this.$nextTick(() => {
        this.$refs['searchInput'].focus()
      })
    },
    querySearchAsync(queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString
        ? restaurants.filter(this.createStateFilter(queryString))
        : restaurants

      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        cb(results)
      }, 1000 * Math.random())
    },
    createStateFilter(queryString) {
      return state => {
        return (
          state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        )
      }
    },
    handleSelect(item) {
      this.searchVal = ''
      this.showSearchInput = false
      console.log(item)
      this.$message({
        message: `选取了 ${item.value}`,
        type: 'success'
      })
    }
  },
  mounted() {
    this.restaurants = search()
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.navbar .item .el-input__inner {
  border: 0px;
  border-bottom: 1px solid #dcdfe6;
  border-radius: 0px;
}
.item {
  .screenfull-svg,
  .svg-icon {
    fill: #fff !important;
  }
}
.el-dropdown{color: #fff;}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  background-image: -webkit-linear-gradient(left, #3d6df8, #5b8cff);
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .breadcrumb-container {
    float: left;
  }
  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }
  .right-menu {
    float: right;
    height: 50px;
    .item {
      display: inline-block;
      margin-right: 10px;
      i {
        font-size: 18px;
        color: #fff;
      }
      .btnSearch {
        margin-right: 5px;
        font-size: 18px;
        color: rgba(255, 255, 255, 1);
      }
      .avatar {
        width: 22px;
        vertical-align: -5px;
      }
    }
  }
}
.el-tooltip {
}
.el-breadcrumb__inner a {
  color: #fff;
}
</style>

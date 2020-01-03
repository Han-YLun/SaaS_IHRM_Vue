<template>
  <scroll-bar>
    <el-menu mode="vertical" 
      :default-active="$route.path" 
      :collapse="isCollapse" 
      text-color="#bfcbd9" 
      class="sidebarBg"
      >
      <router-link to="/">
        <div class="sidebar-logo"><img src="../assets/logo.png" /></div>
        <div class="sidebar-logo-mini"><img src="../assets/logo.png" /></div>
      </router-link>
      <sidebar-item :routes="permission_routers"></sidebar-item>
    </el-menu>
  </scroll-bar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './layoutSidebarItem'
import ScrollBar from '@/components/ScrollBar'

export default {
  name: 'layoutSidebar',
  components: { SidebarItem, ScrollBar },
  computed: {
    ...mapGetters(['permission_routers', 'sidebar']),
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>
<style>
.sidebarBg{
  
}
</style>

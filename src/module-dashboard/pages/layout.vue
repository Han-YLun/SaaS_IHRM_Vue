<template>
	<div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}">
		<layout-sidebar class="sidebar-container"></layout-sidebar>
		<div class="main-container">
			<layout-navbar></layout-navbar>
			<layout-tags></layout-tags>
			<layout-app-main></layout-app-main>
      <div class="bottom">
        <p>
          <a href="https://github.com/Han-YLun/SaaS_HRM_Vue" target="_blank">
            <svg-icon icon-class="github"></svg-icon>
          </a>
        </p>
        <p>copyright<svg-icon icon-class="copyright"></svg-icon> 2020 iHRM 系统 版权所有</p>
      </div>
		</div>
	</div>
</template>

<script>
import layoutNavbar from './../components/layoutNavbar'
import layoutSidebar from './../components/layoutSidebar'
import layoutTags from './../components/layoutTags'
import layoutAppMain from './../components/layoutAppMain'

export default {
  name: 'layout',
  components: {
    layoutNavbar,
    layoutSidebar,
    layoutTags,
    layoutAppMain
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.app-wrapper {
	@include clearfix;
	position: relative;
	height: 100%;
	width: 100%;
}
.bottom {
  p {
    text-align: center;
    color: rgba(0,0,0,.45);
    font-size: 14px;
  }
}
</style>

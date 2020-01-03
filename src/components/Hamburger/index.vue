<template>
  <div @click="toggleClick">
    <svg-icon class="hamburger" :icon-class="svgName" :class="{'is-active':isActive}"></svg-icon>
  </div>
</template>

<script>
export default {
  name: 'hamburger',
  props: {
    isActive: {
      type: Boolean,
      default: false
    },
    toggleClick: {
      type: Function,
      default: null
    }
  },
  computed: {
    svgName() {
      return this.isActive ? 'menu-unfold' : 'menu-fold'
    }
  }
}
</script>

<style scoped>
.hamburger {
  display: inline-block;
  cursor: pointer;
  width: 20px;
  height: 20px;
  color: #fff;
}
</style>

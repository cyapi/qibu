<template>
  <div id="app"> 
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  created(){
  	console.log('(^_−)☆')
  }
}
</script>

<style>
*{margin: 0;padding: 0;box-sizing: border-box;}
body{font-size: 0.24rem;}
img{height: auto;width: 100%;vertical-align: middle;}
.el-tabs__nav-scroll {
	width: 100%;}
.el-tabs__nav{ width: 100%;
	display: flex;justify-content: space-around;} 
.el-tabs__item{flex:1;text-align: center;}
.el-tabs__active-bar{width: 33.33%;}
.el-tabs__header {margin-bottom: 0 !important;}
</style>

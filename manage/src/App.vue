<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
*{margin: 0;padding: 0;box-sizing: border-box;}
html{height: 100%;}
body{font-size: 32px;height: 100%;}
img{width: 100%;height: auto;}

		li{list-style: none;}
#app{height: 100%;}
.el-icon-arrow-right{text-align: center;padding-right: 10px;}
.el-collapse{border: none;
	border-bottom:1px solid #eee;line-height: 60px;}
.el-collapse-item__arrow{margin: 0;}
.el-collapse-item__header {width: 20px;height: 0px;position: relative;bottom: 30px;left:20px;border: none;}
.el-collapse-item__content{padding: 0;}
.avatar-uploader .el-upload {
	border: 1px dashed #d9d9d9;border-radius: 6px;
	cursor: pointer;position: relative; overflow: hidden;
}
.avatar-uploader .el-upload:hover {border-color: #409EFF; }
.avatar-uploader .el-upload--text{height: 178px !important; width: 178px !important;}
.avatar-uploader-icon {font-size: 28px; color: #8c939d; width: 178px;height: 178px; line-height: 178px; text-align: center;}
.avatar { width: 178px;height: 178px;display: block;}
</style>

<template>
	<div class="manage">
		<el-container>
			<el-aside width="200px">
				<el-row class="tac">
  				<el-col :span="24">
				<el-menu
			      default-active="/manage"
			      class="el-menu-vertical-demo"
			      background-color="rgb(50,64,87)"
			      text-color="#fff"
			      router
			      >
			      <el-menu-item index="/manage" class="h">
			        <i class="el-icon-menu"></i>
			        <span slot="title">首页</span>
			      </el-menu-item>
			      <el-submenu index="2">
			        <template slot="title">
			          <i class="el-icon-receiving"></i>
			          <span>数据管理</span>
			        </template>
			          <el-menu-item index="/manage/user">用户管理</el-menu-item>
			          <el-menu-item index="/manage/commodity">商品管理</el-menu-item>
			          <el-menu-item index="/manage/admin">管理员管理</el-menu-item>
			          <el-menu-item index="/manage/criticism">评论管理</el-menu-item>
			      </el-submenu>
			      <el-submenu index="3">
			        <template slot="title">
			          <i class="el-icon-files"></i>
			          <span>商品列表</span>
			        </template>
			          <el-menu-item index="/manage/movie">电影列表</el-menu-item>
			          <el-menu-item index="/manage/book">图书列表</el-menu-item>
			          <el-menu-item index="/manage/music">音乐列表</el-menu-item>
			      </el-submenu>
			      <el-submenu index="4">
			        <template slot="title">
			          <i class="el-icon-plus"></i>
			          <span>添加数据</span>
			        </template>
			          <el-menu-item index="/manage/addmovie">添加电影</el-menu-item>
			          <el-menu-item index="/manage/addbook">添加图书</el-menu-item>
			          <el-menu-item index="/manage/addmusic">添加音乐</el-menu-item>
			      </el-submenu>
			      <el-submenu index="5">
			        <template slot="title">
			          <i class="el-icon-setting"></i>
			          <span>设置</span>
			        </template>
			          <el-menu-item index="/manage/Accounts">管理员设置</el-menu-item>
			      </el-submenu>
			      <el-submenu index="6">
			        <template slot="title">
			          <i class="el-icon-document"></i>
			          <span>说明</span>
			        </template>
			          <el-menu-item index="/manage/explain">说明</el-menu-item>
			      </el-submenu>
			      </el-menu>
			 	 </el-col>
				</el-row>
			</el-aside>
			<el-container>
				<el-header>
					<my-top></my-top>
				</el-header>
				<el-main>
					<router-view></router-view>
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script>
import top from "@/components/top";
export default{
	components:{"my-top":top}
}
</script>

<style>
.el-menu-item {text-align: left;background: #1f2d3d !important;}
.el-submenu {text-align: left;}
.el-submenu__title:hover { background:#53647b !important;  }
.h{background: rgb(50, 64, 87) !important;}
.manage{height: 100%;}
.el-header{
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  .el-aside::-webkit-scrollbar{
  	width: 0px;overflow-x: hidden;
  }
  .el-aside {
    background-color: rgb(50,64,87);
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  .el-container {
   height: 100%;
  }
  .el-main::-webkit-scrollbar{
  	width: 0px;overflow-x: hidden;
  }
  .el-main {
    background-color: #FFFFFF;
    color: #333;
    line-height: 160px;
    /*overflow-y:scroll;
    position: relative;
    left: 15px;*/
  }
.el-main{line-height: 0;}
</style>
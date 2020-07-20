<template>
	<div class="top">
		<div class="left">
			<el-breadcrumb> 
			  <el-breadcrumb-item :to="{ path: '/manage' }"><b>首页</b></el-breadcrumb-item>
			  <el-breadcrumb-item v-for="(i,k) in $route.meta" :key="k">{{i}}</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="right">
			<el-dropdown>
			  <span class="el-dropdown-link">
			   <img src="../assets/logo.png"/>
			  </span>
			  <el-dropdown-menu slot="dropdown">
			    <el-dropdown-item>{{userName}}</el-dropdown-item>
			    <div @click="out()">
				    <el-dropdown-item>
				    	退出
				    </el-dropdown-item>
			    </div>
			  </el-dropdown-menu>
			</el-dropdown>
		</div>
	</div>
</template>

<script>
export default {
	data(){
		return{
			userName:""
		}
	},
	mounted(){
		this.userName=sessionStorage.getItem("admin")
	},
	methods:{
		out(){
			this.$router.push("/")
			sessionStorage.removeItem("admin")
			this.$message({
				message:"退出成功",
				type: 'success'
			})
		}
	}
}
</script>

<style scoped="scoped" lang="less">
.top{
	display: flex;justify-content: space-between;
	align-items: center;height: 60px;
	.left{
		.el-breadcrumb__separator{color: #000000 !important;}
	}
	
	.right{
		width:40px;height:40px;padding: 0;margin: 0;
		
		img{
			border-radius: 20px;
		}
	}
}
ul{position: absolute; top: 50px  !important;}
span{color: #000000 !important;}

</style>
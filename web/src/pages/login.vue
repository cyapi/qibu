<template>
	<div class="login">
		<header>
			<strong @click="$router.back()" class="el-icon-close"></strong>
		</header>
		<div class="logo">
			<!--<img src="../"/>-->
		</div>
		<div class="main">
		<h2>请先登录</h2>
			<div class="mian_form">
				<div>
					<label for="user">用户名</label>
					<input type="text" id="user" v-model="obj.userName" placeholder="用户名 / 邮箱" />
				</div>
				<div>
					<label for="pwd">密码</label>
					<input type="password" id="pwd" v-model="obj.pwd" placeholder="密码" />
				</div>
			</div>
			<div class="btn">
				<button class="submit" @click="login()">登录</button>
			</div>
			<router-link to="/reg" tag="div" class="goLogin">
				还没账号？
			</router-link>
		</div>
	</div>
</template>

<script>
export default {
	data(){
		return {
			obj:{
				userName:"",
				pwd:""
			}
		}
	},
	methods:{
		async login(){
			//1.收集数据 this.obj
			//2.简单验证
			if(!this.obj.userName||!this.obj.pwd){
				alert("用户名或密码不能为空")
				return false
			}
			//3.发请求
			let res =await this.$http.post("/login",this.obj)
			console.log(res)
			if(res.data=="登陆成功"){
				this.$toast('登陆成功');
				this.$store.commit("changeUser",this.obj.userName)
				this.$router.push('/user')
			}else{
				this.$toast('登陆失败，用户名或密码错误');
			}
		}
	}
}
</script>

<style scoped="scoped" lang="less">
.login{
	
	header{
		.el-icon-close{font-size: 0.6rem;}
	}
	
	
	.logo { text-align: center; margin-top:1.5rem;
	.logo img { width: 70%; height: auto;}
	}
	.main {font-size: 0.3rem;
		h2 { text-align: center; font-weight: normal; margin-top: 0.5rem;
		  font-size: 0.4rem; margin-bottom: 0.3rem;
		}
		.mian_form{
			div { border-top: 1px solid #eee; height: 1rem; margin:0 1rem;
			display: flex; align-items: center;}
			label { width: 30%; text-align: center;}
			input { border: none;width: 60%; height: 0.8rem; font-size: 0.3rem;}
		}
		.btn { text-align: center;
			 button { border: none; border-radius: 4px; width: 1rem; 
				 height: 0.6rem; color: #fff;margin: 0.3rem; font-size: 0.3rem;}
			 .submit { background: #42bd59;}
			 .reset { background: #ff3300;}
 		}
 		.goLogin { text-align: center; margin: 0.2rem;}
	}
}
</style>
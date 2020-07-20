<template>
	<div class="reg">
		<header>
			<strong @click="$router.back()" class="el-icon-close"></strong>
		</header>
		<div class="logo">
			<!--<img src="../assets/logo.png"/>-->
		</div>
		<div class="main">
			<h2>用户注册</h2>
			<div class="mian_form">
				<div>
					<label for="user">用户名</label>
					<input type="text" id="user" v-model="obj.userName" placeholder="用户名" />
				</div>
				<div>
					<label for="pwd">密码</label>
					<input type="password" id="pwd" v-model="obj.pwd" placeholder="密码" />
				</div>
				<div>
					<label for="pwds">重复密码</label>
					<input type="password" id="pwds" v-model="pwds" placeholder="确认密码" />
				</div>
				<div>
					<label for="tel">手机号</label>
					<input type="text" id="tel" v-model.number="obj.tel" placeholder="请输入正确的手机号 / 邮箱" />
				</div>
			</div>
			<div class="btn">
				<button class="submit" @click="submit()">登录</button>
				<button class="reset" @click="reset()">重置</button>
			</div>
			<router-link to="/login" tag="div" class="goLogin">
				我有账号
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
				pwd:"",
				tel:""
			},
			pwds:""
		}
	},
	methods:{
		async submit(){
			if(!this.obj.userName||!this.obj.pwd||!this.obj.tel||!this.pwds){
				alert("不可以为空")
				return false;
			}
			if(this.obj.pwd!=this.pwds){
				alert("两次密码不一致");
				return false;
			}
			let res = await this.$http.post("/reg",this.obj)
			console.log(res)
			if (res.data.message=="注册成功") {
				this.$toast('注册成功');
		        this.$store.commit("changeUser",this.obj.userName)
		        this.$router.push('/user')
            } else{
				this.$toast('手机号已被注册，请重新输入');
            }
		},
		reset(){
			this.obj.userName = "";
			this.obj.pwd = ""
			this.obj.tel = ""
			this.pwds = ""
		}
	}
}
</script>

<style scoped="scoped">
.el-icon-close{font-size: 0.6rem;}
.logo { text-align: center; margin-top:1.5rem;}
.logo img { width: 70%; height: auto;}
.main {font-size: 0.3rem;}
.main h2 { text-align: center; font-weight: normal; margin-top: 0.5rem;
  font-size: 0.4rem; margin-bottom: 0.3rem;
}
.mian_form div { border-top: 1px solid #eee; height: 1rem; margin:0 1rem;
display: flex; align-items: center;}
.mian_form label { width: 30%; text-align: center;}
.mian_form input { border: none; height: 0.8rem; font-size: 0.3rem;width: 60%;}
.btn { text-align: center;}
.btn button { border: none; border-radius: 4px; width: 1rem; height: 0.6rem; color: #fff;
 margin: 0.3rem; font-size: 0.3rem;}
.btn .submit { background: #42bd59;}
.btn .reset { background: #ff3300;}
.goLogin { text-align: center; margin: 0.2rem;}
</style>
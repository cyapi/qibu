<template>
	<div class="my">
		<header>
			<div class="photo">
				<div class="photo_add">
					<el-upload
					  class="avatar-uploader"
					  :action="$URL"
					  :show-file-list="false"
					  :on-success="photoSuccess"
					  :before-upload="photo">
					  <img src="../assets/ic_feedback_capture_photos.png"/>
					</el-upload>
					
				</div>
				<img v-if="photoUrl" :src="photoUrl" class="avatar">
				<img v-else src='../assets/main_1 .png'>
				<!--<img src="../assets/main_1 .png"/>-->
			</div>
			<div class="background">
				<div class="header">
					<strong @click="$router.back()" class="el-icon-arrow-left"></strong>
					<span>个人主页</span>
					<el-button :class="flag?'active':' '" :plain="true" @click="submit()">保存</el-button>
				</div>
				  <img v-if="imageUrl" :src="imageUrl" class="avatar">
				  <img v-else src='../assets/xixi.jpg'>
				<!--<img src="../assets/xixi.jpg"/>-->
			</div>
			<div class="header p">
				<el-upload
				  class="avatar-uploader"
				  :action="$URL"
				  :show-file-list="false"
				  :on-success="backPhotoSuccess"
				  :before-upload="backPhoto">
				  <img src="../assets/ic_feedback_capture_photos.png"/>
				</el-upload>
			</div>
		</header>
		<main>
			<h2  @click="show()">编辑个人信息</h2>
			<div class="list" id="list">
				<ul>
					<li>昵称：{{this.userName}}</li>
					<li>性别：男<input class="sex" type="radio" name="sex" v-model="ruleForm.sex" value="男"/>
						女<input class="sex" type="radio" name="sex" v-model="ruleForm.sex" value="女"/></li>
					<li>生日：<input type="date" v-model="ruleForm.birth"/></li>
					<li>密码：<input class="pwd" type="password" v-model="ruleForm.pwd" placeholder="修改密码" />
						<button class="showpwd" @click="pwdShow()">显示</button>
					</li>
					<li><button class="sub" @click="submit()">确认修改</button></li>
				</ul>
			</div>
		</main>
		<div class="fo" @click="exit()">
			退出登录
		</div>
	</div>
</template>

<script>
import { mapState } from "vuex";
export default{
	data(){
		return{
			photoUrl:"",
			imageUrl:"",
			obj:{},
			ruleForm:{
				birth:"",
				pwd:'',
				sex:'',
			},
			flag:true
		}
	},
	computed:{
		...mapState(["userName"])
	},
	created(){
		this.getData();
		this.getUser();
	},
	methods:{
		pwdShow(){
			let pwds = document.getElementsByClassName('pwd')
			if (pwds[0].type!='text') {
				pwds[0].type='text'
			} else{
				pwds[0].type='password'
			}
		},
		exit(){
			this.$store.commit('changeExit')
			this.$router.push("/user")
		},
		backPhotoSuccess(res, file) {
	       	this.obj.photo = this.$URL+"/"+res;
	       //	console.log(this.ruleForm.pic)
	        this.imageUrl = URL.createObjectURL(file.raw);
	    },
		backPhoto(file){
			const isJPG = /\.(jpg|jpeg|gif|png)$/i.test(file.name);
	        const isLt2M = file.size / 1024 / 1024 < 2;
	
	        if (!isJPG) {
	          this.$message.error('上传头像图片只能是 JPG 格式!');
	        }
	        if (!isLt2M) {
	          this.$message.error('上传头像图片大小不能超过 2MB!');
	        }
	        return isJPG && isLt2M;
		},
		photoSuccess(res, file) {
	       	this.obj.pic = this.$URL+"/"+res;
//	       console.log(this.obj.pic)
	        this.photoUrl = URL.createObjectURL(file.raw);
	    },
		photo(file){
			const isJPG = /\.(jpg|jpeg|gif|png)$/i.test(file.name);
	        const isLt2M = file.size / 1024 / 1024 < 2;
	        if (!isJPG) {
	          this.$message.error('上传头像图片只能是 JPG 格式!');
	        }
	        if (!isLt2M) {
	          this.$message.error('上传头像图片大小不能超过 2MB!');
	        }
	        return isJPG && isLt2M;
		},
		async submit(){
			let user={
				photo:this.obj.photo,
				pic:this.obj.pic,
				sex:this.ruleForm.sex,
				birth:this.ruleForm.birth,
				pwd:this.ruleForm.pwd
			}
			
			let res = await this.$http.put('/userx?userName='+this.userName,user);
			this.$toast('信息修改成功');
			this.getData()
		},
		async getData(){
			let res = await this.$http.get('/collect',{
				params:{userName:this.userName}
			})
			this.obj= res.data.data;
		},
		async getUser(){
			let res = await this.$http.get('/user',{
				params:{userName:this.userName}
			})
			this.photoUrl=res.data.pic;
			this.imageUrl=res.data.photo;
			this.ruleForm = res.data;
			this.ruleForm.birth = res.data.birth.slice(0,10)
		}
	}
}
</script>

<style scoped="scoped" lang="less">
.my{
	ul{list-style: none;} 
	
	header{
		.header{
			width: 100%;
			display: flex;justify-content: space-between;
			position: absolute; top: 0;
			font-size: 0.32rem;
			padding: 0.1rem 0.2rem 0.1rem 0.1rem;
			background-image: linear-gradient(#000,#666,#fff);opacity: 0.8;
			color: #fff;
			
			span{
				text-align: center;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;font-size: 0.32rem;
			}
			button{border: none;background: #ccc;padding: 0.15rem 0.2rem;
				border-radius: 10px;font-size: 0.28rem;color: #fff;
			}
			.active{background: orange;}
		}
		.photo{width: 100%;height: 4rem;display: flex;flex-direction: column;
			justify-content: center;align-items: center;position: absolute; top: 0;
			.photo_add{
				position: absolute;top: 2.3rem;text-align: center;width: 10%;
				img{width: 100%;background: rgba(0,0,0,.8);}
			}
			img{width: 30%;height: 55%; border-radius: 2rem;border: 2px solid #fff;}
		}
		.background{
			width: 100%;height: 4rem;overflow: hidden;
			display: flex;flex-direction: column;justify-content: center;
			img{height: auto;width: 100%; }
		}
		.p{width: 10%;background: rgba(0,0,0,.7);top: 3.35rem;}
	}
	main{
		padding:0.2rem;line-height: 30px;
		
		h2{font-weight: normal;font-size: 0.32rem;display: flex; justify-content: space-between;
			align-items: center;border-bottom: 1px solid #eee;margin: 0.2rem 0;padding-bottom: 0.2rem;
		}
		.info{display: flex; justify-content: space-around;}
		.list{background: #f7f4ef;padding: 0.2rem 0 0.2rem 0.2rem;
			border-bottom: 1px solid #eee;
			ul{font-size: 0.28rem;
				line-height: 0.8rem;
				li{
					display:flex;justify-content: flex-start;align-items: center;
					
					button{
						border-radius: 5px;padding: 0.1rem 0.2rem;font-size: 0.28rem;
					}
					input{border: none;border-bottom: 1px solid #ccc;
						width: 60%;background: #eee;height: 0.5rem;
						font-size: 0.28rem;padding-left: 0.2rem;
					}
					.showpwd{border: none;background: #ccc;font-size: 0.2rem;margin-left: 0.2rem;padding: 0.1rem;}
					.sub{border: 1px solid #13CE66;background: none;margin: 0.1rem 2rem 0;}
					.sex{width: auto;margin-left: 0.1rem;margin-right: 0.3rem;}
				}
			}
		}
		.content{width: 100%;
			.content_item{width: 100%;border-bottom:1px solid #ccc;padding-bottom:0.2rem;
				.ty{display: flex;justify-content: space-between;}
				div{
					.center{width: 100%;
						display:flex;background: #eee;
						p{
							display: flex;flex-direction: column;
						}
						img{width: 20%; padding-right: 0.2rem;}
					}
				}
			}
		}
	}
	.fo{
		display: flex; flex-direction: column;padding: 0.2rem 0;font-size: 0.32rem;
		justify-content: center;align-items: center;border-bottom: 1px solid #eee;
	}
	
}
</style>
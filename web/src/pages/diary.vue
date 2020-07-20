<template>
	<div class="diary">
		<header>
			<my-top>写日记
			<input class="btn" type="button" @click="fabu()" value="继续" /></my-top>
		</header>
		<main>
			<input type="text" name="" id="" placeholder="标题" v-model="title"/><br />
			<textarea name="" placeholder="内容" v-model="content"></textarea>
			<el-upload
			  class="avatar-uploader"
			  :action="$URL"
			  :show-file-list="false"
			  :on-success="backPhotoSuccess"
			  :before-upload="backPhoto">
			 <i class="el-icon-picture-outline"></i>
			</el-upload>
		</main>
		
	</div>
</template>

<script>
import { mapState } from "vuex";
export default{
	data(){
		return{
			title:"",
			content:"",
			pic:"",
			obj:{},
			time:""
		}
	},
	computed:{
		...mapState(["userName"])
	},
	created(){
		this.upDiary()
		let dateTime = new Date()
    	this.time = dateTime.getFullYear()+"-"+(dateTime.getMonth()+1)+"-"+dateTime.getDate();
	},
	methods:{
		async upDiary(){
			if (this.$route.params.data) {
				this.title=this.$route.params.data.title;
				this.content=this.$route.params.data.content;
				this.pic=this.$route.params.data.pic;
			} else{
				this.title=='';
				this.content=='';
				this.pic=='';
			}
		},
		backPhotoSuccess(res, file) {
	       	this.obj.pic = this.$URL+"/"+res;
	       //	console.log(this.ruleForm.pic)
	        this.pic = URL.createObjectURL(file.raw);
	        this.content += this.pic+'(图片地址)'
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
		async fabu(){
			let btn = document.getElementsByClassName('btn')
			if (!this.title && !this.content) {
				this.$toast('请输入内容')
			}else{
				let obj = {
					title:this.title,
					content:this.content,
					pic:this.obj.pic,
					time:this.time
				}
				let res = await this.$http.post('/collect',{
					params:{userName:this.userName,collectData:obj,aa:"riji"}
				})
				if(res.data.message){
					this.$router.push("/user")
					this.$toast('日记已发布')
				}
			}
			
		}
	}
}
</script>

<style scoped="scoped" lang="less">
.el-icon-picture-outline{font-size: 0.5rem;}
.diary{
	height: 100%;
	header{
		border-bottom: 1px solid #eee;
		input{border: none; background: none;font-size: 0.32rem; color: #13CE66;}
	}
	main{
		margin: 0.2rem 0.3rem;
		input{
			width: 100%;border: none;
			font-size: 0.32rem;padding-bottom: 0.3rem;
			border-bottom: 1px solid #eee;padding-left: 0.1rem;
		}
		textarea{
			margin-top: 0.2rem;border: none;
			width: 100%;height: 100%;padding-left: 0.1rem;
			font-size: 0.32rem;padding-bottom: 0.3rem;
			height: 10rem;
		}
	}
}
</style>
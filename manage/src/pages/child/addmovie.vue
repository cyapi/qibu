<template>
	<div class="addmusic">
		<h1>添加电影</h1>
		<div class="add_content">
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="85px" class="demo-ruleForm">
		  <el-form-item label="电影名" prop="moviesName" required>
		    <el-input v-model="ruleForm.moviesName"></el-input>
		  </el-form-item>
		  <el-form-item label="演员" prop="author" required>
		  	<el-input v-model="ruleForm.author"></el-input>
		  </el-form-item>
	 	<el-form-item label="类型">
		 	 <el-checkbox-group v-model="ruleForm.types" :min="1" :max="3">
      			<el-checkbox v-for="i in type" :label="i" :key="i">{{i}}</el-checkbox>
    		</el-checkbox-group>
		</el-form-item>
		 <el-form-item label="评分" prop="grade">
		  	<div class="count">
				<button @click="ruleForm.grade>=1 && ruleForm.grade--">-</button>
				<input type="text" v-model="ruleForm.grade" />
				<button @click="ruleForm.grade <10 && ruleForm.grade++">+</button>
			</div>
		  </el-form-item>
 		<el-form-item label="国家">
		    <el-radio-group v-model="ruleForm.country" size="medium">
		      <el-radio-button label="中国"></el-radio-button>
		      <el-radio-button label="美国"></el-radio-button>
		      <el-radio-button label="泰国"></el-radio-button>
		      <el-radio-button label="日本"></el-radio-button>
		      <el-radio-button label="印度"></el-radio-button>
		      <el-radio-button label="德国"></el-radio-button>
		      <el-radio-button label="法国"></el-radio-button>
		      <el-radio-button label="加拿大"></el-radio-button>
		      <el-radio-button label="英国"></el-radio-button>
		      <el-radio-button label="韩国"></el-radio-button>
		      <el-radio-button label="意大利"></el-radio-button>
		      <el-radio-button label="其他"></el-radio-button>
		    </el-radio-group>
	  	</el-form-item>
		  <el-form-item label="影片信息" prop="detail">
		    <el-input type="textarea" rows="5" v-model="ruleForm.detail"></el-input>
		  </el-form-item>
		  <el-form-item label="海报" required>
		  	<el-upload
			  class="avatar-uploader"
			  :action="$URL"
			  :show-file-list="false"
			  :on-success="handleAvatarSuccess"
			  :before-upload="beforeAvatarUpload">
			  <img v-if="imageUrl" :src="imageUrl" class="avatar">
			  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
			</el-upload>
		  </el-form-item>	
		  <el-form-item>
		    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
		    <el-button @click="resetForm('ruleForm')">重置</el-button>
		  </el-form-item>
		</el-form>
		</div>
	</div>
</template>

<script>
const typeOptions = ['剧情', '动画', '惊悚', '悬疑',"搞笑",'爱情','动作','科幻','冒险','犯罪'];
export default {
    data() {
      return {
      	 imageUrl:"",
         ruleForm: {
         	moviesName:"",
         	author:"",
         	country:"未知",
         	detail:"",
         	pic:"",
         	types: ["剧情"],
         	grade:""
        },
        type: typeOptions,
        rules: {
          moviesName: [
            { required: true, message: '请输入电影名称', trigger: 'blur' },
            { min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur' }
          ],
          author: [
            { required: true, message: '请输入演员名称', trigger: 'blur' },
            { min: 10, max: 100, message: '演员个数在 2 到 5 个，以"/"为分隔符', trigger: 'blur' }
          ],
          detail:[
            { required: true, message: '请输入电影详情', trigger: 'blur' },
            { min: 50, max: 50000, message: '字数不符合规则', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
       handleAvatarSuccess(res, file) {
       //	console.log(res)
       	this.ruleForm.pic = this.$URL+"/"+res;
       //	console.log(this.ruleForm.pic)
        this.imageUrl = URL.createObjectURL(file.raw);
        console.log(this.imageUrl)
      },
      beforeAvatarUpload(file) {
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
      submitForm(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            if(this.ruleForm.pic){
            	let res = await this.$http.post("/movie",this.ruleForm)
            	//console.log(res)
            	//this.$router.push("/manage/movie")
            	this.$confirm('添加成功，是否继续添加电影?', '提示', {
			        confirmButtonText: '确定',
			        cancelButtonText: '取消',
			        type: 'warning'
		        }).then(() => {
		        	
		        }).catch(() => {
            		this.$router.push("/manage/movie") 
		        });
            }
            else{
            	this.$message.error("请上传图片")
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style lang="less">
.el-radio-button__inner{padding: 5px 10px !important;}
.el-radio-button--medium,.el-radio-button__inner{font-size: 18px;}
.el-checkbox{margin-right: 10px !important;}
.addmusic {
	h1 {
		text-align: center; font-weight: normal; color: #333;
		font-size: 26px; margin-bottom: 15px;
	}
	.add_content {
		width: 600px; margin: 0 auto;
		border: 1px solid #eee; border-radius:5px;
		padding: 30px 30px 30px 10px;
	}
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
  }
  .avatar {
    width: 120px;
    height: 120px;
    display: block;
  }
   .count{
	display: flex;
	
	button{
		border: 1px solid #ddd;
		background: none;
		width: 8%;height: 30px;
		padding: 0;margin: 0;
		font-size: 14px;
	}
	input{
		border: 1px solid #ddd;
		width: 30px;height: 30px;
		padding: 0;margin: 0;
		font-size: 14px;
		text-align: center;
	}
	button:nth-child(1){border-radius: 10px 0 0 10px;}
	button:nth-child(3){border-radius:  0 10px 10px 0 ;}
}
</style>
<template>
	<div class="book">
		<div class="title">
			<ul>
				<li>封面</li>
				<li>书名</li>
				<li>作者</li>
				<li>上传日期</li>
				<li>操作</li>
			</ul>
		</div>
		
		<div class="box" id="list">
			<el-collapse v-for="(i,j) in tableData" :key="j" accordion>
				<ul class="ul">
					<li>
	          			<img :src="i.pic" style="width: 50px;height: 50px;" /> 
					</li>
					<li>{{i.novelName}}</li>
					<li>{{i.author}}</li>
					<li>{{i.time}}</li>
					<li>
				     	<!--<button class="up" @click.stop="i.flag=true">编辑</button>-->
				     	<button class="up" @click="edit(i)">编辑</button>
				     	<my-pop class="ccpop" v-model="i.flag">
				     		<div class="pop_item">
				     			<span>书名</span>
				     			<h2 style="font-size: 24px;">《{{ruleFrom.novelName}}》</h2>
				     		</div>
				     		<div class="pop_item">
				     			<span>简介</span>
				     			<input type="text" v-model="ruleFrom.detail" />
				     		</div>
				     		<div class="pop_item">
				     			<span>出版社</span>
				     			<input type="text" v-model="ruleFrom.press" />
				     		</div>
				     		<div class="pop_item">
				     			<span style="margin-right: 10px;">封面</span>
				     			<!--<div class="pop_item_img">
					     			<input type="file" id="fs" @click="Upimg(e)"/>-->
					     			<!--<img :src="ruleFrom.pic" style="width: 50px;height: 50px;" />--> 
				     			<!--</div>-->
				     			<el-upload
								  class="avatar-uploader"
								  :action="$URL"
								  :show-file-list="false"
								  :on-success="handleAvatarSuccess"
								  :before-upload="beforeAvatarUpload">
								  <img v-if="imageUrl" :src="imageUrl" class="avatar">
								  <i v-else class="avatar-uploader-icon" >
								  	<img :src="ruleFrom.pic" style="width: 100%;height: 100%;" />
								  </i>
								</el-upload>
				     		</div>
				     		<div slot="left">取消</div>
				     		<button slot="right" class="upbtn" @click="handleEdit(i)">确认修改</button>
				     	</my-pop>
				     	<button class="re" @click="handleDelete(i)">删除</button>
					</li>
				</ul>
			 	<el-collapse-item>
				  	<template slot="title"></template>
				    <div class="box_main">
				    	<div class="box_left">
				    		<p>书籍ID：{{i._id}}</p>
				    		<p>书名：{{i.novelName}}</p>
				    		<p>作者：{{i.author}}</p>
				    		<p>类型：{{i.types}}</p>
				    		<p>评分：{{i.grade}}</p>
				    		<span>封面图片：</span><img :src="i.pic" style="width: 50px;height: 50px;" /> 
				    	</div>
				    	<div class="box_right">
				    		<p>更新日期：{{i.time}}</p>
				    		<p>出版社：{{i.press}}</p>
				    		<p>简介：{{i.detail}}</p>
				    	</div>
				    </div>
			    </el-collapse-item>
			</el-collapse>
		</div>
		 <el-pagination
		  background
		  layout="prev, pager, next"
		  :total="total"
		  :page-size="size"
		  @current-change="change"
		  >
		</el-pagination>
	</div>
</template>

<script>
export default {
      data() {
        return { 
        	ruleFrom:{},
        	play:false,
         	flag:false,
         	tableData: [],
         	size:10,
         	total:1,
         	activeName: '1',
         	imageUrl: ''
        }
      },
     created(){
      	 this.getData(1)
      },
      methods:{
	      edit(i){
	      	i.flag=true;
	      	this.ruleFrom=i;
	      	//console.log(this.ruleFrom)
	      },
	  	  format(time){
	  	  	time = new Date(time)
	  	  	return time.getFullYear()+"-"+(time.getMonth()+1)+"-"+time.getDate()
	  	  },
	  	  change(current){
	  	  	  this.getData(current)
	  	  },
	  	  async getData(current){
	  	  	let res = await this.$http.get("/book",{
	  	  		params:{size:this.size,current}
	  	  	});
	  	  	//console.log(res)
	  	  	this.total = res.data.total;
		    this.tableData = res.data.data.map(i=>{
	    		i.time = this.format(i.time)
	    		i.types=i.types.pop()
	    		i.flag = false;
	    		return i
	    	});
	  	  	//console.log(this.tableData)
	  	  },
	     
	      handleAvatarSuccess(res, file) {
	        //console.log(res)
	        this.imageUrl = URL.createObjectURL(file.raw);
       		res= this.$URL+"/"+res;
       		this.ruleFrom.pic=res
	        //console.log(this.ruleFrom.pic)
	      },
	     beforeAvatarUpload(file) {
	        const isJPG = /\.(jpg|jpeg|gif|png)$/i.test(file.name);
	        const isLt2M = file.size / 1024 / 1024 < 2;
	
	        if (!isJPG) {
	          this.$message.error('上传头像图片格式不对!');
	        }
	        if (!isLt2M) {
	          this.$message.error('上传头像图片大小不能超过 2MB!');
	        }
	        return isJPG && isLt2M;
	     },
	  	  async handleEdit(i){
            if(this.imageUrl||this.ruleFrom.pic){
		  	  	//console.log(this.ruleFrom.pic)
		  	  	let res = await this.$http.put("/book?id="+i._id,this.ruleFrom);
//		  	  	console.log(this.tableData)
		  	  	this.$message({
		  	  		message:res.data,
		  	  		type:'success'
		  	  	})
		  	  	this.getData(1)
		  	  	//console.log(res)
            }
            else{
            	this.$message.error("请上传图片")
            }
	  	  },
	  	  async handleDelete(i){
	  	  	//console.log(index,row)
	  	  	let res = await this.$http.delete("/book?id="+i._id);
	  	  	this.$message({
	  	  		message:res.data,
	  	  		type:'success'
	  	  	})
	  	  	this.getData(1)
	  	  }
      }
}
</script>

<style scoped="scoped" lang="less">
/*.pop_item_img{width:150px;height: 150px;border:1px dashed #000;
position: relative;margin-left: 20px;border-radius: 10px;}
.pop_item_img #fs{width: 100%;height: 100%;opacity: 0;position: absolute;}
.pop_item_img img{width: 100%;height: 100%;border-radius: 50px;}*/
.book {margin-top: 25px;
	.title{
		padding-bottom: 25px;
		border-bottom:1px solid #eee;
	}
	.title ul,.box ul{
		padding-left: 50px;
		width:86%;
		font-size: 14px;
		color: #909399;
		font-weight: bold;
		display: flex;
		justify-content: space-between;
		
	}
	.box {
		ul:hover{
			background: #eef1f6;
		}
		.ul{
		color: #000;
		font-weight: normal;
		width: 100%;
		height: 100%;
		li ::-webkit-scrollbar{
		  	width: 0px;overflow-x: hidden;
		}
		li{
			flex: 1;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			button{
					height: 60%;
					padding: 8px 10px;
					border: none;
					border-radius: 5px;
					color: #fff;
					margin-right: 10px;
				}
			}
		}
		.upbtn{padding: 10px 20px !important;background: dodgerblue;}
		.up{background: dodgerblue;}
		.re{background: red;}
		.ccpop{
			.pop_item{padding: 0 20px 0 50px;
				display: flex;justify-content: flex-start;
				align-items: center;font-size: 18px;color: #48576a;
				
				input{flex: 2;margin: 0 10px;padding-left: 10px;
					line-height: 40px;font-size: 16px;font-weight: 100;
					height: 35px;border-radius: 5px;
					border: 1px solid #bfcbde;
					}
			}
		}
		.box_main{
			padding: 0 50px;
			background: #fbfdff;
			border: 1px solid #eee;
			display: flex;
			line-height: 40px;
			font-size: 16px;
			div{width: 50%;}
		}
	}
	
}


</style>

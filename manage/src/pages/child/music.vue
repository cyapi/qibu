<template>
	<div class="music">
		<div class="title">
			<ul>
				<li>封面图片</li>
				<li>歌名</li>
				<li>歌手</li>
				<li>地区</li>
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
					<li>{{i.musicsName}}</li>
					<li>{{i.author}}</li>
					<li>{{i.country}}</li>
					<li>{{i.time}}</li>
					<li>
				     	<!--<button class="up" @click.stop="i.flag=true">编辑</button>-->
				     	<button class="up" @click="edit(i)">编辑</button>
				     	<my-pop class="ccpop" v-model="i.flag">
				     		<div class="pop_item">
				     			<span>歌名</span>
				     			<h2 style="font-size: 24px;">《{{ruleFrom.musicsName}}》</h2>
				     		</div>
				     		<div class="pop_item">
				     			<span>歌手</span>
				     			<input type="text" v-model="ruleFrom.author" />
				     		</div>
				     		<div class="pop_item">
				     			<span>简介</span>
				     			<input type="text" v-model="ruleFrom.detail" />
				     		</div>
				     		<div class="pop_item">
				     			<span>主演</span>
				     			<input type="text" v-model="ruleFrom.author" />
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
				    		<p>ID：{{i._id}}</p>
				    		<p>歌名：{{i.moviesName}}</p>
				    		<p>歌手：{{i.author}}</p>
				    		<p>地区：{{i.country}}</p>
				    		<p>评分：{{i.grade}}</p>
				    		<span>海报：</span><img :src="i.pic" style="width: 50px;height: 50px;" /> 
				    	</div>
				    	<div class="box_right">
				    		<p>更新日期：{{i.time}}</p>
				    		<p>详情：{{i.detail}}</p>
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
	      },
	  	  format(time){
	  	  	time = new Date(time)
	  	  	return time.getFullYear()+"-"+(time.getMonth()+1)+"-"+time.getDate()
	  	  },
	  	  change(current){
	  	  	  this.getData(current)
	  	  },
	  	  async getData(current){
	  	  	let res = await this.$http.get("/music",{
	  	  		params:{size:this.size,current}
	  	  	});
	  	  	//console.log(res)
	  	  	this.total = res.data.total;
		    this.tableData = res.data.data.map(i=>{
	    		i.time = this.format(i.time)
	    		i.flag = false;
	    		return i
	    	});
	  	  	//console.log(this.tableData)
	  	  },
	     
	      handleAvatarSuccess(res, file) {
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
		  	  	let res = await this.$http.put("/music?id="+i._id,this.ruleFrom);
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
	  	  	let res = await this.$http.delete("/music?id="+i._id);
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
.music {margin-top: 25px;
	.title{
		padding-bottom: 25px;
		border-bottom:1px solid #eee;
		 ul{
			padding-left: 50px;
			width:90%;
			font-size: 14px;
			color: #909399;
			font-weight: bold;
			display: flex;
			justify-content: space-between;
		}
	}
	.box {
		ul:hover{
			background: #eef1f6;
		}
		 ul{
			padding-left: 50px;
			width:100%;
			font-size: 14px;
			color: #909399;
			font-weight: bold;
			display: flex;
			justify-content: space-between;
		}
		.ul{
			color: #000;
			font-weight: normal;
			width: 100% !important;
			height: 100%;
			li ::-webkit-scrollbar{
			  	width: 0px;overflow-x: hidden;
			}
			li{
				flex: 1;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				button{
					height: 60%;
					padding: 0px 10px;
					border: none;
					border-radius: 5px;
					color: #fff;
					margin-right: 8px;
				}
				img{text-align: center;}
			}
			li:nth-child(1){
				display: flex;
				justify-content: flex-start;
				align-items: center;
			}
			li:nth-child(6){
				display: flex;
				justify-content: flex-start;
				align-items: center;
			}
			.upbtn{padding: 10px 20px !important;background: dodgerblue;}
			.up{background: dodgerblue;}
			.re{background: red;}
			.ccpop{
				.pop_item{padding: 0 20px 0 50px;display: flex;justify-content: flex-start;
					align-items: center;font-size: 18px;color: #48576a;
					input{
						flex: 2;margin: 0 10px;padding-left: 10px;
						line-height: 40px;font-size: 16px;font-weight: 100;
						height: 35px;border-radius: 5px;border: 1px solid #bfcbde;
					}
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

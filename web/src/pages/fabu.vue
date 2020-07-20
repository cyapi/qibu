<template>
	<div class="fabu">
		<header>
			<strong @click="$router.back()" class="el-icon-arrow-left"></strong>
					<span>我的动态</span>
		</header>
		<div class="contents">
			<div class="content_item" v-for="(i,index) in obj" :key='index'>
				<div class="dir" v-if="i.aa=='riji'">
					<span>我的日记</span>
					<span>{{i.time}}<i @click="more(index)" class="el-icon-more"></i></span>
				</div>
				<div class="ty" v-else-if="i.critical!=''">
					<p>
						<span>我的评论</span>
						<span>{{i.time}}<i @click="more(index)" class="el-icon-more"></i></span>
					</p>
					<p>
						<span>评论：{{i.critical[0].content}}</span>	
					</p>
				</div>
				<div class="dir" v-else>
					<span>想看</span> 
					<span>{{i.time}}<i @click="more(index)" class="el-icon-more"></i></span>
				</div>
				<ul class="ul">
					<li><button  @click="del(i,index)">删除此动态</button></li>
					<li><button @click="fenxiang(i)">分享</button></li>
				</ul>
				<div class="main">
					<router-link  v-if="i.aa=='riji'" class="center" tag='div' :to="{name:'diary',params:{data:i.collectData[0]}}">
						<img v-if="i.collectData[0].pic" :src="i.collectData[0].pic"/>
						<p><span>标题：{{i.collectData[0].title}}</span>
						<em>内容：{{i.collectData[0].content}}</em>
						</p><br />
					</router-link>
					<router-link  v-else class="center" tag='div' :to="{name:'detail',params:{data:i.collectData[0],aa:i.aa}}">
						<img :src="i.collectData[0].pic"/>
						<p><span>{{i.collectData[0].novelName||i.collectData[0].musicsName||i.collectData[0].moviesName}}</span>
						<em>{{i.collectData[0].time}}/{{i.collectData[0].country||i.collectData[0].types}}/{{i.collectData[0].author}}</em>
						</p><br />
					</router-link>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from "vuex";
export default {
	data(){
		return{
			obj:{}
		}
	},
	computed:{
		...mapState(["userName"])
	},
	created(){
		this.getData();
	},
	methods:{
		fenxiang(data){
			console.log(data)
		},
		async del(data,index){
			let a = document.getElementsByClassName('contents');
			let child = a[0].childNodes[index].childNodes[2];
			child.style.display='none';
			let res = await this.$http.delete('/collect',{
				params:{_id:data._id}
			})
			if (data.critical!='') {
				let ress = await this.$http.delete('/ping',{
					params:{author:data.critical[0].author,content:data.critical[0].content}
				})
			}
			this.getData();
		},
		more(index){
			let a = document.getElementsByClassName('contents')
			let child = a[0].childNodes[index].childNodes[2];
			if (child.style.display=='block') {
				child.style.display='none';
			}else{
				child.style.display='block';
			}
		},
		async getData(){
			let res = await this.$http.get('/collect',{
				params:{userName:this.userName}
			})
			this.obj= res.data.data;
			if(this.obj.aa!='rij'){
				this.obj.map(i=>{
					i.time = i.time.slice(0,10)
					return i;
				})
			}
			console.log(res.data)
			
			let ruleForm = await this.$http.get('/user',{
				params:{userName:this.userName}
			})
			this.photoUrl=ruleForm.data.pic;
			this.imageUrl=ruleForm.data.photo;
		}
	}
}
</script>

<style scoped="scoped" lang="less">
.fabu{
	padding:0.2rem;line-height: 30px;
	header{
		width: 60%;
		display: flex;justify-content: space-between;align-items: center;
		font-size: 0.34rem;
		
		.el-icon-arrow-left{font-size: 0.5rem;}
		span{font-size: 0.34rem;}
	}
	.contents{width: 100%;
	
		.content_item{width: 100%;border-bottom:1px solid #ccc;padding-bottom:0.2rem;
			height:auto;
			
			.dir{
				display: flex;justify-content: space-between;
				span {padding-right: 0.2rem;
				overflow : hidden;
				        text-overflow: ellipsis;
				        display: -webkit-box;
				        -webkit-line-clamp:2;
				        -webkit-box-orient: vertical;
					i{padding-left: 0.2rem;}
				}
			}
			.ty{
				p{
					display: flex;justify-content: space-between;width: 100%;
					span {padding-right: 0.2rem;
					overflow : hidden;
				        text-overflow: ellipsis;
				        display: -webkit-box;
				        -webkit-line-clamp:1;
				        -webkit-box-orient: vertical;
						i{padding-left: 0.2rem;}
					}
				}
			}
			ul{
				position: absolute;right: 0.2rem;
				background: #fff;box-shadow: 1px 1px 2px 1px #ccc;
				box-shadow: 1px 1px 2px 1px #eee;
				list-style: none;border: 1px solid #ccc;
				display: none;text-align: center;width: 2rem;
				font-size: 0.26rem;
				
				li:hover{
					background: #ccc;padding: 0 0.3rem;
				}
				li{button{background: none;border:none;}}
			}
			.main{
				.center{width: 100%;
					display:flex;background: #eee;
					p{
						display: flex;flex-direction: column;width:80%; 
						padding-left: 0.2rem;line-height: 0.45rem;
						em{
							font-style: normal;
						 font-size: 0.26rem; 
				        overflow : hidden;
				        text-overflow: ellipsis;
				        display: -webkit-box;
				        -webkit-line-clamp:2;
				        -webkit-box-orient: vertical;}
					}
					img{width: 20%; padding-right: 0.2rem;height: 1.5rem;}
				}
			}
		}
	}
}
</style>
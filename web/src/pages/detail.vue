<template>
	<div class="cinema_detail">
		<header>
			<strong class="el-icon-arrow-left" @click="back()"></strong>
			<span>{{title}}</span>
		</header>	
		<!--返回按钮有bug,已修改-->
		<div class="cinema_t">
			<div class="left">
				<img :src="obj.pic" />
			</div>
			<div class="center">
				<h2>{{obj.moviesName||obj.musicsName||obj.novelName}}</h2>
				<time>({{ruleForm.time}})</time>
				<router-link :to="{name:'info',params:{data:ruleForm,aa:this.$route.params.aa}}" tag='div' class="p">
					<p><span>{{obj.country}}</span> / 
						<span v-for="(m,n) in obj.types">{{m}}</span> / </p>
					<p>{{obj.detail}}</p>
				</router-link>
				<!--<div class="">
					<router-link :to="{name:'mark',params:{data:obj,aa:'movies'}}" tag="button" class="sale">
						<i class="el-icon-folder-checked"></i>想看
					</router-link>
					<router-link to="#" tag="button" class="sale">
						<i class="el-icon-star-off"></i>看过
					</router-link>
				</div>-->
			</div>
		</div>
		<div class="cinema_p" v-if="ruleForm.grade">
			<el-rate
			  v-model="value"
			  disabled
			  text-color="#ff9900"
			 >{{this.obj.grade}}
			</el-rate>
			{{this.obj.grade}}
		</div>
		<div class="cinema_p" v-else>
			<p>暂无评分</p>
		</div>
		<div class="cinema_f">
			<ul>
				<span>相关分类</span>
				<li v-for="(i,j) in ruleForm.types" :key="j">{{i}}</li>
			</ul>
			<p>简介：<span>{{ruleForm.detail}}</span></p>
		</div>
		<div class="critical">
			<div class="content_item" v-for="(i,j) in Getcritical" :key="j">
				<p class="ty">
					<span>发表人：{{i.author}}</span>
					<span>{{i.time}}</span>
				</p>
				<p><span>{{i.content}}</span></p>
			</div>
		</div>
		<div class="footer">
			<input type="text" v-model="critical.content" placeholder="写点什么吧"/>
			<button @click="ok(critical)"><i class="el-icon-position"></i></button>
		</div>
	</div>
</template>

<script>
import { mapState } from "vuex";
export default{
	data(){
		return{
			Getcritical:{
				content:'',
				author:'',
				time:""
			},
			critical:{
				title:'',
				content:'',
				author:'',
				aa:"",
				time:""
			},
			title:"",
			ruleForm:{}, 
			value: 0,
			obj:{}
		}
	},
	computed:{
		...mapState(["userName"])
	},
	created(){
		this.getInFo()
		this.getData()
	},
	methods:{
		format(){
			let Datea = new Date();
			this.critical.time = Datea.getFullYear()+"-"+(Datea.getMonth()+1)+"-"+Datea.getDate();
		},
		async ok(critical){
			this.format()
			this.critical.author = this.userName;
			this.critical.title = this.title;
			this.critical.aa = this.$route.params.aa;
			//先加入到评论表，再添加到动态表里
			if (this.userName) {
				this.collect()
				let res = await this.$http.post("/ping",this.critical)
				this.critical.content =''
				this.getData()
			} else{
				this.$store.commit("changeGo",this.$route.fullPath)
				this.$router.push("/login")
			}
		},
		async collect(){
			let res = await this.$http.post("/collectD",{
				params:{userName:this.userName,critical:this.critical,collectData:this.obj,aa:this.critical.aa}
			})
			if(res.data == "添加成功"){
				this.$toast('评论成功');
			}else{
				this.$toast('网络延迟');
			}
		},
		getInFo(){
			let res = this.$route.params;
			this.ruleForm = res.data;
			this.obj = res.data;
			if (this.$route.params.aa=='movies') {
				this.title = this.obj.moviesName;
			} else if(this.$route.params.aa=='novel'){
				this.title = this.obj.novelName;
			}else{
				this.title = this.obj.musicsName;
			}
			this.ruleForm.types=this.ruleForm.types.slice(",")
			this.value = Number(((this.obj.grade)/2).toFixed(1));
		},
		async getData(){
			//获取评论数据
			let reas = await this.$http.get("/ping",{
				params:{title:this.title}
			});
			this.Getcritical=reas.data.map(i=>{
				i.time = i.time.slice(0,10)
				return i;
			});
		},
		back(){
			console.log(this.$route.params.aa)
			if (this.$route.params.aa=='movies') {
				this.$router.push('/')
			} else if(this.$route.params.aa=='novel') {
				this.$router.push('/read')
			}else if(this.$route.params.aa=='music'){
				this.$router.push('/music')
			}else{
				this.$router.back()
			}
		}
	}
}
</script>

<style scoped="scoped" lang="less">
.cinema_detail{
	background: #5d9ea6;
	color: #FFFFFF;
	
	header{
		font-size: 0.4rem;
		padding: 0.1rem 0.2rem 0.1rem 0.1rem;
		width:65%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		strong{text-decoration: none; color: #fff;}
		
		span{
			width:35%;
			text-align: center;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
	}
	
	.cinema_t{
		padding: 0 0.2rem 0.3rem ;
		display: flex;
		.left {
			width:30%;
			img {
				border-radius: 10px;
			}
		}
		.center {
			display: flex;flex-direction: column;justify-content: center;
			margin: 0 0.1rem 0 0.2rem;
			width: 60%;
			
			h2 {
				font-weight: normal;
				font-size: 0.3rem;
				width: 80%;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
			.p{
				display: flex;
				flex-direction: column;
				justify-content: center;
				padding: .2rem 0;
				font-size: 0.26rem;
				color: #E4E7ED;
				p {
					width: 90%;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
			}
			
			div{
				display: flex;
				justify-content: space-around;
				.sale {
					background: #fff;
					border: none;
					border-radius: 0.1rem;
					color: #000;
					font-size: 0.3rem;
					padding: 0.2rem 0.5rem; 
				}
			}
		}
	}
	.cinema_p{
		margin: 0 auto;
		background: rgba(0,0,0,.3);
		border-radius: 5px;width: 90%;padding: 0.1rem 0.2rem;
		text-align: center;display: flex;justify-content: center;color: orange;
	}
	.cinema_f{
		ul{
			list-style: none;padding-left: 0.2rem; width: 100%;
			display: flex; justify-content: flex-start;
			
			align-items: center;
			span{color: #555;}
			li{
				border-radius: 1px; background: rgba(0,0,0,0.3);padding: 0.1rem 0.3rem;
				margin:  0.1rem 0 0.1rem 0.2rem;border-radius: 0.3rem;
			}
		}
		p{font-size: 0.32rem;padding: 0 0.3rem;
			span{
				text-indent: 2em;
				display: block;
			  	overflow : hidden;
		        text-overflow: ellipsis;
		        display: -webkit-box;
		        -webkit-line-clamp:5;
		        -webkit-box-orient: vertical;
		    } 
		}
	}
	.critical{
		margin-top: 0.2rem;
		margin-bottom: 1.2rem;
		padding: 0.1rem 0.2rem;
		.content_item{
			margin: 0.1rem 0;padding: 0.1rem 0.2rem;
			border: 1px solid #ccc;border-radius: 10px;
			font-size:0.32rem;line-height: 24px;
			
			.ty{display: flex;justify-content: space-between;
				border-bottom: 1px dashed #eee;
				padding-bottom: 0.1rem;
				
				span:nth-child(1){width: 70%;
					white-space: nowrap;
				  	overflow : hidden;
			        text-overflow: ellipsis;
				}
			}
		}
	}
	.footer{
		position: fixed;
		bottom: 0;
		z-index: 1000;
		width: 100%;
		background: #fff;border-top: 1px solid #eee;
		line-height: 1rem;padding: 0.2rem;
		display: flex;justify-content: space-between;
		
		input{border-radius: 10px;background: #eee;
			font-size: 0.32rem;padding: 0.2rem;
			border: none;width: 80%;
		}
		button{width: 18%;border: none;background: #ccc;border-radius: 10px;
			text-align: center;
			.el-icon-position{font-size: 0.4rem;}
		}
			button:hover{background: #13CE66;}
	}
}
.el-icon-folder-checked,.el-icon-star-off{
	font-size: 0.32rem;
	padding-right: .1rem;
	color: orange;
}
</style>
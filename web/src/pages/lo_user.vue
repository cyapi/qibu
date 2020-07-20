<template>
	<div class="my">
		<header class="header">
			<div class="header_user">
				<div class="per">
			    	<div>
			    		<img v-if="photoUrl" :src="photoUrl" class="avatar">
						<img v-else src='../assets/main_1 .png'>
			    	</div>
			    	<div>
			    		<p>{{userName}}</p>
			    	</div>
			    </div>
			    <router-link to='/my' tag='div'>
			    	个人主页 <i class="el-icon-arrow-right"></i>
			    </router-link>
			</div>
		</header>
		<main>
			<h2>我的书影音</h2>
			<div class="top"> 
				<ul>
					<li>影视{{movies.length}}</li>
					<li>图书{{novel.length}}</li>
					<li>音乐{{music.length}}</li>
				</ul>
			</div>
			<div class="bottom">
				<router-link to="/fabu" tag="div" class="b">
					<span><i class="el-icon-edit"></i> 我的发布</span>
					<span><i class="el-icon-arrow-right"></i></span>
				</router-link>
				<router-link to="#" tag="div" class="b">
					<span><i class="el-icon-tickets"></i> 我的日记</span>
					<span><i class="el-icon-arrow-right" @click="showTwo()"></i></span>
				</router-link>
				<div class="list1" id="list2">
					<router-link to='mark' tag="button">查看  / 添加日记</router-link>
				</div>
			</div>
			<div class="f"></div>
		</main>
		<my-footer></my-footer>
	</div>
</template>

<script>
import { mapState } from "vuex";
export default{
	data() {
      return {
      		flag:false,
      		photoUrl:"",
      		obj:{},
      		novel:{},
      		music:{},
      		movies:{}
        };
   },
	computed:{
		...mapState(["userName"])
	},
	async created(){
		if (!this.userName) {
			this.$store.commit("changeGo",this.$route.fullPath)
			this.$router.push("/login")
		}
		this.getData()
		this.getUser()
	},
	methods:{
		showTwo(){
			let list = document.getElementById("list2")
			if (list.style.display == 'flex') {
				list.style.display = 'none';
			} else{
				list.style.display = 'flex';
			}
			
		},
		showThree(){
			let list = document.getElementById("list3")
			if (list.style.display == 'flex') {
				list.style.display = 'none';
			} else{
				list.style.display = 'flex';
			}
			
		},
		async getData(){
			let res = await this.$http.get('/collect',{
				params:{userName:this.userName}
			})
			this.novel = res.data.data.filter(i=>i.aa == 'novel')
			this.music = res.data.data.filter(i=>i.aa == 'music')
			this.movies = res.data.data.filter(i=>i.aa == 'movies')
		},
		async getUser(){
			let resa = await this.$http.get('/user',{
				params:{userName:this.userName}
			})
			this.photoUrl = resa.data.pic;
			this.obj = resa.data;
		}
	}
}
</script>

<style scoped="scoped" lang="less">
.my{
	margin-bottom: 1.5rem;
	font-size: 0.28rem;
	.el-icon-setting,.el-icon-message{
			font-size: .6rem;padding: 0.1rem;
			color: #FFFFFF;
		}
	.header{
		background:#51c363;
		height:2rem;color: #fff;
		div{
			display: flex;
			justify-content: space-between;
		}
		.header_user{
			
			align-items: center;padding: 0 0.3rem;
			
			.per{
				height: 2rem;width: auto;
				display: flex;align-items: center;
				justify-content: space-between;
					
				div{
					display: flex;align-items: center;
					width:2rem;height: 1.6rem;
					
					img{
						width: 80%;height:100%;
						border-radius: 4rem;
						border: 2px solid #fff;
					}
					p{
						padding-left: 0.1rem;
						
					}
				}
			}
		}
	}
	
	main{
		background: #fff;
		font-size: 0.28rem;
		background: #f7f4ef;padding-top: 0.2rem;
		h2{
			padding: 0.2rem;background: #fff;
			font-size: 0.32rem;font-weight: normal;
		}
		.top{
			background: #fff;
			ul{
				display: flex;justify-content: space-around;align-items: center;
				list-style: none;padding-bottom: 0.2rem;
			}
		}
		.row{
			padding: 0.2rem;
			height: 2.2rem;
			display: flex;justify-content: flex-start;
			
			.col{
				margin: 0 0.1rem;
				
				img{
					height: 60%; width: auto;
				}
				span{
					font-size: 0.24rem;
					display: block;text-align: center;
				}
			}
		}	
		.cen{
			background: #fff;padding: 0.2rem 0;margin-top: 0.2rem;
			display: flex;justify-content: space-between;
			i{
				font-size: 0.42rem;padding: 0 0.1rem;
			}
		}
		.bottom{
			background: #fff;margin-top: 0.2rem;
			div{padding: 0.2rem 0;display: flex;justify-content: space-between;
				border-bottom: 1px solid #eee;padding-bottom: 0.2rem;
				
				i{
					font-size: 0.42rem;padding: 0 0.2rem;
				}
			}
			.list1{
				background: #f7f4ef;height: 1.5rem;display: none;
				button{border: 1px solid #13CE66;border-radius: 10px;margin: 0 auto;
				 background: #fff;padding: 0 0.3rem;font-size: 0.32rem;}
			}
		}
		.f{
			height: 0.2rem;
		}
	}
}
.el-tabs__nav-scroll { span { font-size: 0.28rem;padding: 0 0.2rem;} }
.el-icon-arrow-right{font-size: 0.42rem;}
</style>
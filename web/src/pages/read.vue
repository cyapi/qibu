<template>
	<div class="read">
		<my-header></my-header>
		<header>
			<router-link :to="{name:'all',params:{aa:'novel'}}" tag="div" class="el-icon-finished">书单</router-link>
			<router-link :to="{name:'files',params:{aa:'novel'}}" tag="div" class="el-icon-files">分类</router-link>
			<router-link :to="{name:'data',params:{aa:'novel'}}" tag="div" class="el-icon-s-data">榜单</router-link>
		</header>
		<main>
			<div class="main_one">
				<div class="h2">
					<h2>最热完本</h2>
					<router-link tag="h2" :to="{name:'all',params:{bb:'novel'}}">
						<span>全部 {{ruleFrom.length}}</span>
						<i class="el-icon-arrow-right"></i>
					</router-link>
				</div>
				<!--影院热映-->
				<div class="content">
					<div class="content_item" v-for="(i,j) in tableFrom" :key="j">
						<el-button class="el-icon-plus" :plain="true" @click="tarch(i)"></el-button>
						<router-link :to="{name:'detail',params:{aa:'novel',data:i}}" tag="img" :src="i.pic"/>
						<span>{{i.novelName}}</span>
						<p class="grade1" v-if="i.grade"> {{i.grade}}</p>
						<p class="grade2" v-else>尚未上映</p>
					</div>
				</div>
			</div>
			<!--榜单-->
			<div class="main_two">
				<div class="h2">
					<h2>原创榜单</h2>
					<h2><span>全部 {{tableA.length+tableB.length}}</span><i class="el-icon-arrow-right"></i></h2>
				</div>
				<div class="content">
					<div class="row">
						<div class="col">
							<img :src="a"/>
							<div class="image_text">
								<ul>
									<li v-for="(i,j) in tableA" :key="j" @click="GOdetail(i)">{{j+1}}. {{i.novelName}}</li>
								</ul>
							</div>
						</div>
						<div class="col">
							<img :src="b"/>
							<div class="image_text">
								<ul>
									<li v-for="(i,j) in tableB" :key="j" @click="GOdetail(i)">{{j+1}}. {{i.novelName}}</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!--为您推荐-->
			<div class="main_three">
				<div class="h2">
					<h2>为您推荐</h2>
				</div>
				<div class="cinema_t" v-for="(i,index) in onePageCount" :key="index" @click="GOdetail(i)">
					<div class="left">
						<img :src="i.pic" />
					</div>
					<div class="center">
						<h2>{{i.novelName}}</h2>
						<p>作者：{{i.author}}</p>
						<p>评分：{{i.grade}}</p>
						<p>详情：{{i.detail}}</p>
						<em>{{i.types}}</em>
					</div>
				</div>
				<div class="footer" @click="change(current)">
					{{loader}}
				</div>
			</div>
		</main>
		<my-footer></my-footer>
	</div>
</template>

<script>
import { mapState } from "vuex";
export default {
    data() {
      return {
	        ruleFrom:{},
	        tableA:{},
	        tableB:{},
	        tableFrom:{},
	        obj:{},
	        a:'',
	        b:"",
	        current:1,
	        total:0,
	        count:0,
	        size:10,
	        onePageCount:{},
	        loader:'点击加载更多'
	    }
    },
	computed:{
		...mapState(["userName"])
	},
    created(){
    	this.$store.state.i={}
      	this.getData()
		this.getBookCurrentData(1)
    },
    methods:{
    	GOdetail(index){
    		this.$router.push({
				name:'detail',
				params:{
					data:index,
					aa:'novel'
				}
			})
    	},
		async tarch(data){
			if (this.userName) {
				let res = await this.$http.post("/collect",{
					params:{userName:this.userName,collectData:data,aa:'novel'}
				})
				if(res.data.message=='添加成功'){
			        this.$notify({
			          message: '已加入想看列表',
			          position: 'bottom'
			        });
				}else{
			        this.$notify({
			          message: '已取消加入想看列表',
			          position: 'bottom'
			        });
				}
			} else{
				this.$store.commit("changeGo",this.$route.fullPath)
				this.$router.push("/login")
			}
		},
  	    format(time){
  	  		time = new Date(time)
  	  		return time.getFullYear()+"-"+(time.getMonth()+1)+"-"+time.getDate()
  	    },
	    change(current){
	    	this.count++;
	  	  //	console.log(this.total,this.current*this.size,(this.total-this.size))
	  	  	if((this.current*this.size)<=(this.total)){
				this.current++;
				this.getBookCurrentData(current)
			}else{
				this.loader="已经全部加载完，没有新的内容了"
			}
	    },
  	    async getData(){
	  	  	let res = await this.$http.get("/book");
	  	  	//console.log(res)
	  	  	this.total = res.data.total;
		    this.ruleFrom = res.data.data.map(i=>{
	    		i.time = this.format(i.time)
		 		i.types = i.types.join("")
	    		return i
	    	});
	  	  	this.tableA = this.ruleFrom.slice(0,5);
	  	  	this.tableB = this.ruleFrom.slice(6,11);
	  	  	this.tableFrom = this.ruleFrom.filter(i=>i.grade>7).slice(0,6)
	  	  	this.a=this.tableA[0].pic;
	  	  	this.b=this.tableB[0].pic;
	    } ,
	    async getBookCurrentData(current){
	  	  	let res = await this.$http.get("/bookcurrent",{
	  	  		params:{size:this.size,current:this.current}
	  	  	});
	  	  	this.total = res.data.total;
		    this.obj = res.data.data.map(i=>{
	    		i.time = this.format(i.time)
		 		i.types = i.types.join("")
	    		return i;
	    	});
	    	if(this.count==0){
				this.onePageCount =this.obj;
			}else{
				this.onePageCount = this.onePageCount.concat(this.obj);
			}
	    }
    }
}
</script>

<style lang="less">
.el-notification {background: rgba(0,0,0,.8);margin-bottom: 1.5rem;}
.el-notification__content{color: #fff;font-size: 0.28rem;}
.read{
	font-size: 0.24rem;
	margin-bottom: 2rem;
	margin-top: 0.3rem;
	
	header{
		width: 100%;
		display: flex;
		justify-content: space-around;
		div{
			font-size:.38rem;
			
			img{
				margin: 0.1rem;
			}
		}
	}
	main{
		
		.h2{
			display: flex;justify-content: space-between;
			padding: 0.2rem;
			
			h2{
				display: inline-block;
				
				i,span{
					font-size: 0.28rem;
				}
			}
		}
		
		.main_one{
			
			
			.content{
				display: flex;
				flex-wrap: wrap;
				padding-bottom: 0.1rem;
				
				.content_item{
					width: 32%;
					height: 3.5rem;
					padding-left: 0.25rem;
					
					.el-button{
						position: absolute;padding: 0.1rem;background: rgba(200,200,200,0.8);
						font-size: 0.4rem;border-bottom-right-radius: .3rem;
					}
					img{
						width: 100%;height: 78%;
					}
					span{
						font-size: 0.28rem;
						width: 100%;
						display: inline-block;
						overflow-y: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
					}
					.grade1{
						color: orange;
					}
					.grade2{
						color: #000000;
					}
				}
			}
		}
		.content_center_one{
			margin:0.1rem 0 0.2rem;
		}
		.main_two{
			
			.content{
				.row{
					display: flex;
					display: inline-block;
					overflow-y: hidden;
					white-space: nowrap;
					height: 4.5rem;
					.col{
						width: 60%;
						height: 93%;
						margin:0.2rem;
						display: inline-block;
						position:relative;
						img{
							border-radius: 0.3rem;
							width: 100%;
							height: 100%;
						}
						.image_text{
							width: 100%;
							background: rgba(200,200,200,.6);
							position: absolute;
							bottom:0;
							left: 0;
							border-bottom-left-radius: 0.3rem;border-bottom-right-radius: 0.3rem;
							
							ul{
								width: 97%;
								padding: 0.3rem;
								
								li{
									overflow-y: hidden;
									white-space: nowrap;
									text-overflow: ellipsis;
									padding: 0.06rem 0;
								}
							}
						}
					}
					
				}
			}
		}
		.main_three{
			.cinema_t{
				padding:  0.3rem  0.2rem;
				display: flex;
				border-top: 1px solid #DDDDDD;
				height: 3.5rem;
				.left {
					width:30%;
					img {
						border-radius: 10px;
						height: 100%;
					}
				}
				.center {
					margin: 0 0.1rem 0 0.2rem;
					width: 60%;
					
					h2 {
						font-weight: normal;
						font-size: 0.3rem;
					}
					p {
						width: 90%;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						padding: 0.1rem 0;
					}
					em{
						font-style: normal;
						border: 1px solid #C0C0C0;
						border-radius: 8px;
						color: #666;float: right;
						padding: 0.03rem 0.15rem;
					}
				}
			}
			.footer{text-align: center;padding: 0.2rem 0;font-size: 0.28rem; color: #5E5E5E;background: #CCCCCC;}
		}
	}
}
.el-tabs__item {padding: 0 0.25rem;}
.el-tabs__item.is-top:nth-child(2){padding-left: 0.2rem !important;}
</style>
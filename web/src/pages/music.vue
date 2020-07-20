<template>
	<div class="music">
		<my-header></my-header>
		<header>
			<router-link to="/musicfiles" tag="div" class="el-icon-finished">歌单</router-link>
			<router-link :to="{name:'data',params:{aa:'music'}}" tag="div" class="el-icon-s-data">榜单</router-link>
		</header>
		<main>
			<div class="main_three">
				<div class="h2">
					<h2>为你推荐</h2>
				</div>
				<div class="cinema_item" v-for="(i,j) in tableFrom" :key="j">
					<div class="cinema_t">
						<div class="left">
							<img :src="i.pic"/>
						</div>
						<div class="center">
							<h2>{{i.musicsName}}</h2>
							<p class="grade1">星星评分</p>
							<p>{{i.author}}/ {{i.time}}</p>
							<p></p>
						</div>
						<el-button class="right" :plain="true" @click="tarch(i)">
							<i class="el-icon-star-off"></i>
							<p>想听</p>
							<!--点击之后弹出已添加到想听列表  图标改变  文字改为已想听-->
							<!--再次点击弹出 是否确定取消已想听标记  （取消 确定）  -->
						</el-button>
					</div>
					<div class="foot">
						<p>你可能感兴趣</p>
					</div>
				</div>
			</div>
			<div class="footer" @click="change(current)">
				{{loader}}
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
        value: 2,
        ruleFrom:{},
        tableFrom:{},
        a:'',
        current:1,
        total:0,
        count:0,
        size:10,
        onePageCount:{},
        loader:'点击加载更多'
      }
    },
    created(){
    	this.getData(1)
    },
	computed:{
		...mapState(["userName"])
	},
    methods:{
    	async tarch(data){
			if (this.userName) {
				let res = await this.$http.post("/collect",{
					params:{userName:this.userName,collectData:data,aa:'music'}
				})
				if(res.data.message=='添加成功'){
			        this.$notify({
			          message: '已加入想听列表',
			          position: 'bottom'
			        });
				}else{
			        this.$notify({
			          message: '已取消加入想听列表',
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
	  	    //console.log(this.total,this.current*this.size,(this.total-this.size))
	  	  	if((this.current*this.size)<=(this.total)){
				this.current++;
				this.getData(current)
			}else{
				this.loader="已经全部加载完，没有新的内容了"
			}
  	    },
	  	async getData(current){
	  	  	let res = await this.$http.get("/music",{
	  	  		params:{size:this.size,current:this.current}
	  	  	});
	  	  	//console.log(res)
	  	  	this.total = res.data.total;
		    this.ruleFrom = res.data.data.map(i=>{
	    		i.time = this.format(i.time)
	    		return i
	    	});
	  	  	if(this.count==0){
				this.tableFrom =this.ruleFrom;
	  	  	this.a=this.tableFrom[0].pic;
			}else{
				this.tableFrom = this.tableFrom.concat(this.ruleFrom);
			}
	  	}
    }
}
</script>

<style lang="less">
.el-notification {background: rgba(0,0,0,.8);margin-bottom: 1.5rem;}
.el-notification__content{color: #fff;font-size: 0.28rem;}
.music{
	font-size: 0.24rem;margin-bottom: 2rem;margin-top: 0.3rem;
	
	header{
		width: 100%;display: flex;justify-content: space-around;
		div{
			font-size:.38rem;
			img{margin: 0.1rem;}
		}
	}
	main{
		.h2{
			display: flex;justify-content: space-between;padding: 0.2rem;
			h2{
				display: inline-block;
				i,span{font-size: 0.28rem;}
			}
		}
		.main_one{
			.content{
				display: flex;
				justify-content: space-around;
				flex-wrap: wrap;
				padding-bottom: 0.1rem;
				
				.content_item{
					width: 30%;
					height:3.6rem;
					
					.el-button{
						position: absolute;padding: 0.1rem;background: rgba(200,200,200,0.8);
						font-size: 0.4rem;border-bottom-right-radius: .3rem;
					}
					img{
						width: 100%;height: 60%;
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
		.content_center_one{margin:0.1rem 0 0.2rem;}
		
		.main_three{
			
			.cinema_item{
				height: 2.5rem;margin-bottom: 0.3rem;position: relative;
				
				.foot{
					position: absolute;left: 2.5rem;bottom: 0rem;right: 0.15rem;
					p{background: #EEEEEE;padding: 0.2rem 0.3rem;
					border-radius: 8px;width: 100%;font-size: 0.28rem;}
				}
				.cinema_t{
					padding:  0.3rem  0.2rem 0;
					display: flex;
					border-top: 1px solid #DDDDDD;
					height: 100%;
					.left {
						width:30%;
						img {border-radius: 10px;height: 100%;}
					}
					.center {
						width: 50%;height: 60%;padding-left: 0.3rem;
						border-right: 1px dashed #ccc;
						
						h2 {font-size: 0.3rem;}
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
					.right{
						width: 20%;height: 60%;color: orange;
						text-align: center;display: flex;
						flex-direction: column;
						align-content: center;
						justify-content: center;
						
						.el-icon-star-off{font-size: .4rem;}
						
					}
				}
			}
		}
		.footer{text-align: center;padding: 0.2rem 0;font-size: 0.28rem; color: #5E5E5E;background: #CCCCCC;}
	}
}
</style>
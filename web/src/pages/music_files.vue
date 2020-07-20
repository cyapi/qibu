<template>
	<div class="music_files">
		<my-top><i class="el-icon-more"></i></my-top>
		<div class="content">
			<div class="cinema_item" v-for="(i,j) in onePageCount" :key="j">
				<div class="cinema_t">
					<div class="left">
						<img :src="i.pic"/>
					</div>
					<div class="center">
						<h2>{{i.musicsName}}</h2>
						<p>{{i.grade}}</p>
						<p>{{i.author}}/ {{i.time}}</p>
						<p></p>
					</div>
					<div class="right"  @click="tarch(i)">
						<i class="el-icon-star-off"></i>
						<p>想听</p>
						<!--点击之后弹出已添加到想听列表  图标改变  文字改为已想听-->
						<!--再次点击弹出 是否确定取消已想听标记  （取消 确定）  -->
					</div>
				</div>
				<div class="foot">
					<p>你可能感兴趣</p>
				</div>
			</div>
		</div>
		<footer>
			<div class="footer" @click="change(current)">
				{{loader}}
			</div>
		</footer>
	</div>
</template>

<script>
import { mapState } from "vuex";
export default{
	data(){
		return{
			ruleForm:{},
			obj:{},
	        current:1,
	        total:0,
	        count:0,
	        size:10,
	        onePageCount:{},
	        loader:'点击加载更多'
		}
	},
	created(){
		this.getData()
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
    	format(time){
	  	  	time = new Date(time)
	  	  	return time.getFullYear()+"-"+(time.getMonth()+1)+"-"+time.getDate()
	  	},
		async getData(){
  	 		//console.log(this.$route)
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
				this.onePageCount =this.ruleFrom;
	  	  		this.a=this.onePageCount[0].pic;
			}else{
				this.onePageCount = this.onePageCount.concat(this.ruleFrom);
			}
		    console.log(this.onePageCount)
		}
	}
}
</script>

<style lang="less">
.music_files{
	font-size: 0.24rem;margin-top: 0.3rem;
	.content{
		margin-bottom: 0.2rem;
		.cinema_item{
			height: 2.5rem;margin-bottom: 0.3rem;
			
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
			.foot{
				position: relative;left: 2.6rem;bottom: 0.72rem;
				p{background: #EEEEEE;padding: 0.2rem 0.3rem;
				border-radius: 8px;width: 60%;font-size: 0.28rem;}
			}
		}
	}
	footer{
		.footer{text-align: center;padding: 0.2rem 0;font-size: 0.28rem; color: #5E5E5E;background: #CCCCCC;}
	}
}
</style>
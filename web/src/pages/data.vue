<template>
	<div class="reying">
		<my-top>排行榜 <i></i></my-top>
	    <div class="list">
			<ul class="list_item">
				<li v-for="(i,index) in list" :key='index'
					:class="activeItem == index ? 'active':''"
					@click="Getactive(index,i)">
					{{i}}
				</li>
			</ul>
		</div>
    	<div class="content">
    		<div class="content_item" v-for="(i,j) in ruleForm" :key="j">
    			<el-button class="el-icon-plus" :plain="true" @click="tarch(i)"></el-button>
				<router-link :to="{name:'detail',params:{aa:aa,data:i}}" tag="img" :src="i.pic"/>
				<span>{{i.moviesName||i.musicsName||i.novelName}}</span>
				<p class="grade1" v-if="i.grade">{{i.grade}}</p>
				<p class="grade2" v-else>尚未上映</p>
			</div>
    	</div>
	</div>
</template>

<script>
import { mapState } from "vuex";
export default {
    data() {
      return {
      	list:['电影','小说','音乐'],
      	aaa:['movies','novel','music'],
      	aa:'',
    	activeName:'',
        activeItem: 0,
        ruleForm:{}
      }
    },
	computed:{
		...mapState(["userName"])
	},
    created(){
    	let res = this.$route.params.aa;
    	this.activeItem = res;
    	if(res=='movies'){
    		this.activeName = '电影';
       		this.activeItem=0;
    	}else if(res=='novel'){
    		this.activeName = '小说';
       		this.activeItem=1;
    	}else if(res=='music'){
    		this.activeName = '音乐';
    	    this.activeItem=2;
    	}
    	this.getData(1)
    },
    methods:{
    	async tarch(data){
			if (this.userName) {
				let res = await this.$http.post("/collect",{
					params:{userName:this.userName,collectData:data,aa:'movies'}
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
		Getactive(index,i) {
	        this.activeItem  =  index;
	        this.activeName = i;
	        this.aa = this.aaa[index]
	  		this.getData()
	    },
  	 	 async getData(current){
  	 	 	let res =null;
    		if(this.activeName=='小说'){
	    		res = await this.$http.get("/book",{
		  	  		params:{size:this.size}
		  	   });
		  	    
	    	}
	    	else if(this.activeName=='音乐'){
	    		this.onePageCount={}
	    		res = await this.$http.get("/music",{
		  	  		params:{size:this.size}
		  	  });
		    }
	    	else{
	    		res = await this.$http.get("/moviescurrent",{
		  	  		params:{size:this.size}
		  	  	});
	    	}
	    	this.total = res.data.total;
		    this.ruleForm = res.data.data.filter(i=>{
	    		return i.grade>=7;
	    	}).map(i=>{
	    		i.flag = false;
	    		return i
	    	})
  	    }
    }
}
</script>

<style scoped="scoped" lang="less">
.reying {
	.list{
		border-bottom: 1px solid #ccc;
		.list_item{display: flex;justify-content: space-around; list-style: none;
			li{flex: 1;text-align: center;padding-bottom: 0.1rem;font-size: 0.28rem;}
			.active{border-bottom: 1px solid #13CE66;color: #13CE66;}
		}
	}
	.content{
		box-sizing: content-box;
		display: flex;
		flex-wrap: wrap;
		margin-top: 0.3rem;
		
		.content_item{
			width: 32%;
			height: 3.5rem;
			padding-left: 0.2rem;
			/*padding-top: 0.2rem;*/
			
			.el-button{
				position: absolute;padding: 0.1rem;background: rgba(200,200,200,0.8);
				font-size: 0.4rem;border-bottom-right-radius: .3rem;
			}
			img{
				width: 100%;height: 80%;
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
	
	footer {
		text-align: center;
		padding: 0.1rem;
		font-size: 0.24rem;
	}
}
</style>
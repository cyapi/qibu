<template>
	<div class="reying">
		<my-top>{{title}} <i class="el-icon-search"></i></my-top>
		<div class="search">
			<ul class="city" v-if="this.$route.params.aa=='movies'">
				<li v-for="(i,index) in city" :key='index'
					:class="activeCityItem == index ? 'active':''"
					@click="GetCityactive(index,i)">
					{{i}}
				</li>
			</ul>
			<ul class="type">
				<li v-for="(i,index) in type" :key='index'
					:class="activeItem == index ? 'active':''"
					@click="GetTypeactive(index,i)">
					{{i}}
				</li>
			</ul>
		</div>
		<div class="list">
			<div @click="goto(i)" class="list_item" v-for="(i,j) in ruleForm" :key='j' >
			
			<!--<router-link tag='div' :to="{name:'detail',params:{data:i,aa:this.$route.params.aa}}" class="list_item" v-for="(i,j) in ruleForm" :key='j' >-->
				<div class="left">
					<img :src="i.pic"/>
				</div>
				<div class="center">
					<h2>{{i.moviesName||i.novelName}}</h2>
					<p>{{i.time}}</p>
					<span>{{i.types}}</span>
					<p>
						<span>{{i.country}}</span>&nbsp;
						<span>{{i.author}}</span>
					</p>
				</div>
				<div class="right" v-if="i.grade">
					<button class="sale">想看</button>
					<p class="grade1">评分：{{i.grade}}</p>
				</div>
				<div class="right" v-else>
					<button class="sale">预售</button>
					<p class="grade2">尚未上映</p>
				</div>
			</div>
			<!--</router-link>-->
		</div>
		<footer>
			--<span>THE  END</span>--
		</footer>
	</div>
</template>

<script>
export default{
	data(){
		return{
			activeCityItem:0,
			cateCity:"全部",
	        arrCity:[],
			activeItem:0,
			cate:"全部",
	        arr:[],
			type:[],
			city:[],
	        ruleForm:{},
	        title:''
		}
	},
	created(){
    	this.getData()
    },
    methods:{
    	goto(i){
    		let that = this;
    		this.$router.push({
    			name:'detail',
    			params:{data:i,aa:that.$route.params.aa}
    		})
    	},
    	GetCityactive(index,cateCity) {
    		this.arr=[]
	        this.activeCityItem  =  index;
			this.cateCity = cateCity;
	        this.getData()
	    },
    	GetTypeactive(index,cate) {
    		this.arr=[]
	        this.activeItem  =  index;
			this.cate = cate;
	        this.getData()
	    },
    	format(time){
	  	  	time = new Date(time)
	  	  	return time.getFullYear()+"-"+(time.getMonth()+1)+"-"+time.getDate()
	  	},
  	 	async getData(){
  	 		let res=null;
	    	let temp=[];
  	  		let hh=[];
  	 		if (this.$route.params.aa=='movies') {
  	 			this.title='全部影片'
  	 			this.city = ['全部',"中国",'美国','泰国','日本','印度',"英国","韩国","德国","法国","加拿大","意大利","其他"];
				this.type = ['全部','剧情', '动画', '惊悚', '悬疑',"搞笑",'爱情','动作','科幻','冒险','犯罪','其他'];
 				res = await this.$http.get("/movie");
  	 		}else{
  	 			this.title='全部书籍';
				this.type = ['全部',"漫画",'网游','恐怖', '军事', '历史','惊悚', '悬疑',"武侠",'言情','科幻','冒险','犯罪','其他'];
  	 			res = await this.$http.get("/book");
  	 		}
		    this.ruleForm = res.data.data.map(i=>{
		    	i.time = this.format(i.time)
	    		i.flag = false;
	    		return i
	    	})
		    if (this.cate!="全部"&&this.cateCity=="全部") {
		    	this.ruleForm.forEach(item=>{
		  	  		item.types.forEach(i=>{
		  	  			if (i == this.cate) {
		  	  			   this.arr.push(item)
		  	  			}
		  	  		})
		  	  	})
		  	  	this.ruleForm = this.arr;
		    }else if(this.cateCity!="全部"&&this.cate=="全部"){
		    	this.ruleForm.forEach(item=>{
		  	  		if(item.country == this.cateCity){
		  	  			this.arr.push(item)
		  	  		}
		  	  	})
		  	  	this.ruleForm = this.arr;
		    }else if(this.cateCity!="全部"&&this.cate!="全部"){
		    	this.ruleForm.forEach(item=>{
		    		item.types.forEach(i=>{
		  	  			if (i == this.cate) {
		  	  			   this.arr.push(item)
		  	  			}
		  	  		})
		  	    })
		    	this.ruleForm.forEach(item=>{
		    		if(item.country == this.cateCity){
		  	  			temp.push(item)
		  	  		}
		  		})
	  	  		for (let i = 0; i<temp.length;i++) {
	  	  			for (let j = 0; j<this.arr.length;j++) {
	  	  				if(temp[i].moviesName==this.arr[j].moviesName){
	  	  					hh.push(temp[i])
	  	  				}
	  	  			}
	  	  		}
		    	this.ruleForm =hh;
		    }
  	    }
    }
}
</script>

<style scoped="scoped" lang="less">
.reying{
	
	.search{
		padding-left: 0.2rem;
		font-size: 0.26rem;
		line-height: 0.5rem;
		width: 100%;
		border-bottom: 1px solid #eee;
		
		.type,.city{
			display: flex;
			width: 100%;
			overflow-y: hidden;
			white-space: nowrap;
			justify-content: flex-start;
			list-style: none;
			display: inline-block;
			
			.active{
				border-radius: .5rem;
				background: #eee;
				color: #13CE66;
				padding: 0 0.2rem;
			}
		
			li{
				padding: 0 0.1rem ;
				display: inline-block;
			}
		}
	}
	
	.list{
		.list_item{
			padding: 0.2rem;
			display: flex;
			border-bottom: 1px solid #eee;
			height: 3.5rem;
			
			
			.left{
				flex: 1;
				img{
					border-radius: 10px;
					height: 100%;
					width: 100%;
				}
			}
			
			.center{
				margin: 0 0.1rem 0 0.2rem;
				padding-top: .3rem;
				width: 30%;
				flex: 1.5;
				h2{
					font-weight: normal;
					overflow-y: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
				}
				p{
					line-height: .5rem;
					display:-webkit-box;
					-webkit-box-orient:vertical;
					-webkit-line-clamp:2;
					overflow:hidden;
				}
			}
			.right{
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: center;
				text-align: center;
				
				.sale{
					display: block;
					background: none;
					border:1px solid orange;
					border-radius: 0.1rem;
					color: orange;
					font-size: 0.24rem;
					padding: 0.1rem;
					margin-bottom: 0.1rem;
				}
			}
			.grade1{
				color: orange;
				text-align: center;
			}
			.grade2{
				color: #000000;
			}
		}
	}
	footer{
		text-align: center; margin: .1rem 0;
	}
}
</style>
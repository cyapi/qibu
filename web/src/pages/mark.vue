<template>
	<div class="mark">
		<header>
			<strong @click="$router.back()" class="el-icon-arrow-left"></strong>
			<span>我的日记</span>
		</header>
		<div class="list">
			<!--<div class="list_item" @click="more(index)">
				<p>标题：{{i.collectData[0].title}}</p>
				<p class="p">内容：{{i.collectData[0].content}}</p>
			</div>-->
			<router-link class="list_item" tag='div' v-for="(i,j) in obj" :key="j" :to="{name:'diary',params:{data:i.collectData[0]}}">
				<div class="img" v-if="i.collectData[0].pic">
					<img :src="i.collectData[0].pic"/>
				</div>
				<p>标题：{{i.collectData[0].title}}</p>
				<p class="p">内容：{{i.collectData[0].content}}</p>
			</router-link>
		</div>
		<router-link to='diary' tag="button" class="el-icon-plus"></router-link>
	</div>
</template>

<script>
import { mapState } from "vuex";
export default{
	data(){
		return{
			obj:{}
		}
	},
	computed:{
		...mapState(["userName"])
	},
	created(){
		this.getData()
	},
	methods:{
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
			this.obj= res.data.data.filter(i=>i.aa=='riji');
			console.log(this.obj)
		}
	}
}
</script>

<style scoped="scoped" lang="less">
.mark{
	padding: 0.2rem;
	header{
		width: 60%;
		display: flex;justify-content: space-between;align-items: center;
		.el-icon-arrow-left{font-size: 0.5rem;}
		span{font-size: 0.34rem;}
	}
	.list{
		padding-top: 0.2rem;margin-bottom: 0.3rem;
		.list_item{
			background: #eee;border-radius: 10px;
			font-size: 0.3rem;margin-top:0.1rem;padding: 0.2rem;
			.img{ display: flex;justify-content: space-between;height: 3rem;}
			/*p{position: relative;bottom: 1.2rem;background: #fff;}*/
			.p{height:auto;padding-top: 0.1rem;
				overflow : hidden;
		        text-overflow: ellipsis;
		        display: -webkit-box;
		        -webkit-line-clamp:2;
		        -webkit-box-orient: vertical;
			}
		}
	}
	.el-icon-plus{width: 100%;height: 1rem; border: 1px dashed #ccc;
		font-size: 0.8rem;background: #fff;
	}
}
</style>
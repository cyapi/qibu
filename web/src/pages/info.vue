<template>
	<div class="info">
		<header><router-link :to="{name:'detail',params:{data:this.$route.params.data,aa:this.$route.params.aa}}" tag="p">×</router-link></header>
		<div class="main">
			<h1>详细信息</h1>
			<ul>
				<li><label name='名字：'>名字：</label><span>{{ruleForm.moviesName||ruleForm.novelName}}</span></li>
				<li><label name='名字：'>作者：</label><span>{{ruleForm.author}}</span></li>
				<li><label name='名字：'>上映：</label><span>{{ruleForm.time}}(中国大陆)</span></li>
				<li><label name='名字：'>类型：</label><span>{{ruleForm.types}}</span></li>
				<li><label name='名字：'>地区：</label><span>{{ruleForm.country}}</span></li>
				<li><label name='名字：'>详情：</label><span>{{ruleForm.detail}}</span></li>
			</ul>
		</div>
	</div>
</template>

<script>
export default{
	data(){
		return{
			title:"",
			ruleForm:{}
		}
	},
	created(){
		let res = this.$route.params;
		console.log(res)
		this.ruleForm = res.data;
		this.title = this.ruleForm.moviesName;
	},
	methods:{}
}
</script>

<style scoped="scoped" lang="less">
.info{
	header{
		padding: 0 0.2rem 0;
		p{font-size: 0.8rem;}
		}
	.main{
		padding: 0 0.3rem 0.2rem;
		h1{font-weight: normal; margin-bottom: 0.1rem;}
		ul{
			list-style: none;
			line-height: 0.5rem;
			width:100%;
			
			li{
				display:flex;
				justify-content: flex-start;
				
				lable{
					color: #555;
				}
				span{
					width: 85%;
					font-size: 0.28rem;
				}
			}
			
		}
	}
}

</style>
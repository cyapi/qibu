<template>
	<div class="classify">
		<my-top>分类 <i class="el-icon-position"></i></my-top>
		<div class="content">
			<h2>类型</h2>
			<div class="classifyitem">
				<span class="item" v-for="(i,index) in typeOptions" :key="index">{{i}}</span>
			</div>
		</div>
		<div class="content">
			<h2>地区</h2>
			<div class="classifyitem">
				<span class="item" v-for="(i,index) in country" :key="index">{{i}}</span>
			</div>
		</div>
		<div class="content">
			<h2>专题</h2>
			<div class="classifyitem">
				<span class="item" v-for="(i,index) in topic" :key="index">{{i}}</span>
			</div>
		</div>
	</div>
</template>

<script>
export default{
	data(){
		return{
			typeOptions:[],
			country:[],
			topic:[]
		}
	},
	created(){
		if (this.$route.params.aa=='movies') {
			this.typeOptions = ['剧情', '动画', '惊悚', '悬疑',"搞笑",'爱情','动作','科幻','冒险','犯罪','其他'];
			this.country = ["中国",'美国','泰国','日本','印度',"英国","韩国","德国","法国","加拿大","意大利","其他"];
			this.topic = ['热映','最新','高分'];
		}
		else if(this.$route.params.aa=='novel'){
			this.typeOptions = ["漫画",'网游','恐怖', '军事', '历史','惊悚', '悬疑',"武侠",'言情','科幻','冒险','犯罪','其他'];
			this.country = ["中国",'美国','泰国','日本','印度',"英国","韩国","德国","法国","加拿大","意大利","其他"];
			this.topic = ['热映','最新','高分'];
		}
	}
}
</script>

<style scoped="scoped" lang="less">
	.classify {
		
		.content{
			margin-top: .3rem;
			margin-left: .3rem;
			.classifyitem{
				display:flex;flex-wrap: wrap;
				justify-content: flex-start;
				padding: 0.1rem;
				.item{
					font-size: 0.32rem;
					border: 1px solid #000000;
					border-radius: 5px;
					padding: 0.2rem 0.3rem;
					margin: 0.1rem 0.2rem;
				}
			}
		}
		footer {
			display: flex;
			justify-content: center;
			padding: 0.1rem;
			font-size: 0.24rem;
		}
	}
</style>
<template>
	<div class="pop">
		<transition name="bg">
			<div class="bg" title="修改信息" v-if="value" @click="$emit('input',false)"></div>
		</transition>
		<transition name="pop">
			<div class="content" v-if="value">
				<div>
					<h2>修改信息</h2>
					<span class="close" @click="close()"> x </span>
				</div>
				<div>
					<slot></slot>
				</div>
				<div class="footer">
					<button class="btn" @click="close()">
						<slot name="left"></slot>
					</button>
					<slot name="right"></slot>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
export default {
	props:["value"],
	created(){
    	for(let i in this.ruleForm){
    		this.ruleForm[i] = this.$route.params.row[i]
    	}
    },
	methods:{
		close(){
			console.log(this.$emit("input"))
			this.$emit("input",false)
		}
	}
}
</script>

<style scoped="scoped" lang="less">
.pop{
	box-sizing: border-box;
	.bg{width: 100%;height: 100%;position: fixed;left: 0;top: 0;
		background: rgba(0,0,0,0.6);z-index: 1000;}
	.bg-enter,.bg-leave-to{opacity: 0;}
	.bg-enter-active,.bg-leave-active{transition: all 0.4s;}
	
	.content{
		width: 700px;padding: 20px;margin: auto; 
		background: #FFFFFF;z-index: 1001;border-radius: 8px;
		position: fixed;left: 0;top: 0;right: 0;bottom: 0;
		overflow: auto;
		
		h2{display: inline-block;}
		.close{
			display: inline-block;float: right;font-size: 30px;
		}
		.btn{padding: 10px 20px;width: 100px;background: #fff !important;color: #000;border: 1px solid #555;}
	}
	.pop-enter,.pop-leave-to {transform: translateY(-200px); opacity: 0;}
	.pop-enter-active,.pop-leave-active { transition:all 0.4s};
	.footer{width: 100%; position: absolute;bottom: 30px;display: flex;justify-content: space-around;align-items: center;}
}
</style>

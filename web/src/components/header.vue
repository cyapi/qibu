<template>
	<div class="header">
		<div class="left">
			<input type="text" placeholder="请输入内容" />
			<img src="../assets/LOGOindex.png"/>
		</div>
	</div>
</template>

<script>
</script>

<style scoped="scoped" lang="less">
.header{
	height: .8rem;
	font-size: .32rem;margin-bottom: 0.2rem;
	
	.left{
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-left: .2rem;margin-right: .2rem;
		height: .8rem;
		input{
			width: 70%;border: none;height: 100%;font-size: .4rem;
			border-radius: .2rem;line-height: .6rem;padding-left: 0.2rem;
			background: #EEEEEE;
		}
		img{width: 25%;}
	}
}
.el-icon-message{font-size: 0.7rem;margin: 0.1rem;color: #555;}
</style>
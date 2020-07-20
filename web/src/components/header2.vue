<template>
	<div class="header">
		<div class="">
			<strong @click="$router.back()" class="el-icon-arrow-left"></strong>
			<slot></slot>
		</div>
	</div>
</template>

<script>
</script>

<style scoped="scoped" lang="less">
.header{
	div{
		font-size: 0.32rem;
		padding: 0.1rem 0.2rem 0.1rem 0.1rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		
		span{
			text-align: center;
			width: 50%;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
	}
}
.el-icon-arrow-left,i{
	font-size: 0.6rem;
}
</style>
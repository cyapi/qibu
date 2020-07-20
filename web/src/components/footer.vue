<template>
	<footer class="footer">
		<div class="footer_item" @click="$router.push('/')">
			<div class="footer_item_pic">
				<img src="../assets/ic_tab_subject_active.png" v-if="$route.path=='/'"/>
				<img src="../assets/ic_tab_subject_normal.png" v-else/>
			</div>
			<p>
				电影
			</p>
		</div>
		<div class="footer_item" @click="$router.push('/read')">
			<div class="footer_item_pic">
				<img src="../assets/ic_tab_status_active.png" v-if="$route.path=='/read'"/>
				<img src="../assets/ic_tab_status_normal.png" v-else/>
			</div>
			<p>
				读书
			</p>
		</div>
		<div class="footer_item" @click="$router.push('/music')">
			<div class="footer_item_pic">
				<img src="../assets/ic_tab_group_active.png" v-if="$route.path=='/music'"/>
				<img src="../assets/ic_tab_group_normal.png" v-else/>
			</div>
			<p>
				音乐
			</p>
		</div>
		<div class="footer_item" @click="$router.push('/user')">
			<div class="footer_item_pic">
				<img src="../assets/ic_tab_profile_active.png" v-if="$route.path=='/user'"/>
				<img src="../assets/ic_tab_profile_normal.png" v-else/>
			</div>
			<p>
				我的
			</p>
		</div>
	</footer>
</template>

<script>
//状态管理，如果有用户使 “我的”跳转链接改为lo_user,就可以把user页面删去了

</script>

<style scoped="scoped" lang="less">
.footer{
	position: fixed;
	z-index: 1000;
	bottom: 0;
	left: 0;
	text-align: center;
	display: flex;
	justify-content: space-around;
	align-items: baseline;
	flex: 1;
	width: 100%;
	background: white;
	font-size: 0.3rem;
	.footer_item{
		padding-bottom: 0.05rem;
		
		.footer_item_pic{
			width: 1rem;
			
			.footer_item_pic img{
				cursor: pointer;
				/*width: 30%;*/
				height: auto;
				padding: 0;
			}
			.footer_item p{
				padding: 0;
				color: #999;
			}
		}
	}
	
}

</style>
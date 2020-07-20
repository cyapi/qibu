<template>
	<div class="my">
		<header class="header">
			<div class="header_2">
				<router-link to="/login" tag="button" class="lo_re">登陆/注册</router-link>
			</div>
		</header>
		<main>
			<div class="bottom">
				<router-link to="#" tag="div" class="b">
					<span><i class="el-icon-edit"></i> 我的发布</span>
					<span><i class="el-icon-arrow-right"></i></span>
				</router-link>
				<router-link to="#" tag="div" class="b">
					<span><i class="el-icon-tickets"></i> 我的日记</span>
					<span><i class="el-icon-arrow-right"></i></span>
				</router-link>
			</div>
			<div class="f"></div>
		</main>
		<my-footer></my-footer>
	</div>
</template>

<script>
</script>

<style scoped="scoped" lang="less">
.my{
	font-size: 0.28rem;
	.el-icon-setting,.el-icon-message{
			font-size: .6rem;padding: 0.1rem;
			color: #FFFFFF;
		}
	.header{
		background:#51c363;
		height: 2rem;
		display: flex;
		justify-content: center;align-items: center;
		.header_2{
			.lo_re{
				font-size: 0.28rem;
				border: none;width: 3.5rem;height:0.8rem;
				background: #FFFFFF;border-radius: 2rem;
			}
		}
	}
	
	main{
		font-size: 0.28rem;
		padding-top: 0.2rem;
		
		.bottom{
			background: #f7f4ef;margin-top: 0.2rem;
			div{padding: 0.2rem 0;display: flex;justify-content: space-between;
				border-bottom: 1px solid #eee;padding-bottom: 0.2rem;
				
				i{
					font-size: 0.42rem;padding: 0 0.2rem;
				}
			}
		}
		.f{
			height: 3rem;
		}
	}
}
.el-tabs__nav-scroll { span { font-size: 0.28rem;padding: 0 0.2rem;} }
.el-icon-arrow-right{font-size: 0.42rem;}
</style>
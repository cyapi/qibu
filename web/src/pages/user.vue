<template>
	<div class="users">
		<div class="" v-if="flag">
			<my-login></my-login>
		</div>
		<div class="" v-else>
			<my-nologin></my-nologin>
		</div>
		<my-footer></my-footer>
	</div>
</template>

<script>
import { mapState } from "vuex";
import login from "./lo_user";
import nologin from "./no_user";
export default{
	components:{"my-nologin":nologin,"my-login":login},
	data() {
      return {
      		flag:false,
        };
   },
	computed:{
		...mapState(["userName"])
	},
	async created(){
		if (this.userName) {
			this.flag=true;
		} else{
			this.$store.commit("changeGo",this.$route.fullPath)
		}
	}
}
</script>

<style scoped="scoped" lang="less">
.user{
	
}
.el-tabs__nav-scroll { span { font-size: 0.28rem;padding: 0 0.2rem;} }
.el-icon-arrow-right{font-size: 0.42rem;}
</style>
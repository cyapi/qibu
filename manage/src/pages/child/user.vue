<template>
	<div class="user">
		<div class="contents">
			
		<el-table
		    :data="tableData"
		    style="width: 100%"
		    :default-sort = "{prop: 'date', order: 'descending'}"
		    >
		    <el-table-column
		      prop="regTime"
		      label="注册时间"
		      sortable
		      width="180">
		    </el-table-column>
		    <el-table-column
		      prop="userName"
		      label="用户名"
		      sortable
		      width="180">
		    </el-table-column>
		    <el-table-column
		      prop="tel"
		      label="电话"
			>
		    </el-table-column>
		  </el-table>
		  <el-pagination
		  background
		  layout="prev, pager, next"
		  :total="total"
		  :page-size="size"
     	 @current-change="change"
		  >
		</el-pagination>
		</div>
	</div>
</template>

<script>
export default {
    data() {
      return {
      	 size:5,
         total:1,
         tableData: []
      }
    },
    created(){
		this.getData(1)
	},
	methods:{
//		format(time){
//			time = new Date(time)
//			return time.getFullYear()+"-"+(time.getMonth()+1)+"-"+time.getDate()
//		},
		change(current){
			this.getData(current)
		},
		async getData(current){
			let res = await this.$http.get("/userx",{
				params:{size:this.size,current}
			});
			console.log(res)
	    	this.total = res.data.total;
			this.tableData = res.data.data.map(i=>{
				i.regTime = i.regTime.slice(0,10)
				return i
			});
		}
	}
}
</script>

<style scoped="scoped" lang="less">
.user{
	.contents{
		width: 50%;
	}
}
</style>
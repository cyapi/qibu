<template>
	<div class="admin">
		<el-table
			:data="tableData"
		    style="width: 100%">
		    <el-table-column
		      prop="userName"
		      label="姓名"
		      width="180">
		    </el-table-column>
		    <el-table-column
		      prop="time"
		      label="注册日期"
		      width="180">
		    </el-table-column>
		    <el-table-column
		      prop="address"
		      label="地址">
		    </el-table-column>
		    <el-table-column
		      label="权限"
		      width="180">
		      管理员
		    </el-table-column>
	    </el-table>
	    <div class="block">
		    <el-pagination
		      @current-change="change"
		      :page-size="size"
		      layout="prev, pager, next"
		      :total="total">
		    </el-pagination>
	    </div>
	</div>
	
</template>

<script>
export default {
	data() {
		return {
			tableData: [],
			size:5,
			total:1
		}
	},
	created() {
		this.getData(1)
	},
	methods:{
		format(time){
			time = new Date(time)
			return time.getFullYear()+"-"+(time.getMonth()+1)+"-"+time.getDate()
		},
		change(current){
			this.getData(current)
		},
		async getData(current){
			let res = await this.$http.get("/admin",{
				params:{size:this.size,current}
			})
			console.log(res)
			this.total = res.data.total;
			this.tableData = res.data.data.map(i=>{
				i.time = this.format(i.time)
				return i
			});
		}
	}
}
</script>

<style>
.el-table thead{
	background: #269ABC;
	color: #000000;
}
.el-table th, .el-table tr{
	background: #E1EDF7;
}
.el-table__empty-block{
	background: #E3E3E3;
}
.el-table th>.cell{
	text-align: center;
}
.el-table__row td{
	text-align: center;
}
</style>
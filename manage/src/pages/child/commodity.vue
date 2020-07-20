<template>
	<div class="commodity">
		<el-table
		    style="width: 100%">
		    <el-table-column
		      prop="name"
		      label="店铺名称"
		      width="180">
		    </el-table-column>
		    <el-table-column
		      prop="address"
		      label="店铺地址"
		      width="180">
		    </el-table-column>
		    <el-table-column
		      prop="introduce"
		      label="店铺介绍">
		    </el-table-column>
		    <el-table-column
		      prop="limits"
		      label="操作">
		    </el-table-column>
	    </el-table>
	    <div class="block">
		    <el-pagination
		      @current-change="change"
		      :page-size="1"
		      layout="prev, pager, next"
		      :total="0">
		    </el-pagination>
	    </div>
	</div>
	
</template>

<script>
export default {
    data() {
      return {
      	 size:2,
         total:1,
         tableData: []
      }
    },
    created(){
		this.getData(1)
	},
	methods:{
		change(current){
			this.getData(current)
		},
		async getData(current){
			let res = await this.$http.get("/user");
	    	this.tableData = res.data;
			this.total = this.tableData.length;
	    	for(let i in this.tableData){
	    		this.tableData[i].regTime = this.tableData[i].regTime.substr(0,10)
	    	}
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
</style>
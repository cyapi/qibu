<template>
	<div class="upbook">
		<div class="pop_item">
 			<span>书名</span>
 			<input type="text" :value="i.novelName" validateevent="true"/>
 		</div>
 		<div class="pop_item">
 			<span>作者</span>
 			<input type="text" :value="i.author" />
 		</div>
 		<div class="pop_item">
 			<span>类型</span>
 			<input type="text" :value="i.types" />
 		</div>
 		<div class="pop_item">
 			<span>简介</span>
 			<input type="text" :value="i.detail" />
 		</div>
 		<div class="pop_item">
 			<span>出版社</span>
 			<input type="text" :value="i.press" />
 		</div>
 		<div class="pop_item">
 			<span>封面</span>
 			<img :src="i.pic" style="width: 50px;height: 50px;" /> 
 		</div>
 		<div slot="left">取消</div>
 		<div slot="right">
 			<button class="up" @click="handleEdit(i._id)">确认修改</button>
 		</div>
	</div>
</template>

<script>
export default {
      data() {
        return {
         	flag:false,
         	tableData: [],
        }
      },
     created(){
      	 this.getData(1)
      },
      methods:{
      	edit(i){
      		i.flag=true;
      	},
      	  format(time){
      	  	time = new Date(time)
      	  	return time.getFullYear()+"-"+(time.getMonth()+1)+"-"+time.getDate()
      	  },
      	  change(current){
      	  	  this.getData(current)
      	  },
      	  async getData(current){
      	  	let res = await this.$http.get("/book",{
      	  		params:{size:this.size,current}
      	  	});
      	  	//console.log(res)
      	  	this.total = res.data.total;
    	    this.tableData = res.data.data.map(i=>{
	    		i.time = this.format(i.time)
	    		i.types=i.types.pop()
	    		i.flag = false;
	    		return i
	    	});
      	  	//console.log(this.tableData)
      	  },
      	  async handleEdit(id){
      	  	console.log(id)
      	  	let res = await this.$http.put("/book?id="+id,this.tableData);
      	  	this.$message({
      	  		message:res.data,
      	  		type:'success'
      	  	})
      	  	this.getData(1)
      	  	console.log(this.tableData)
      	  	console.log(res)
      	  }
      }
}
</script>

<style scoped="scoped" lang="less">
.pop_item input{flex: 2;margin: 0 10px;padding-left: 10px;
line-height: 40px;font-size: 16px;font-weight: 100;
height: 35px;border-radius: 5px;
border: 1px solid #bfcbde;
}
</style>
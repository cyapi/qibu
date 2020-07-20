let mongo = require("mongoose");
// mongod --dbpath=C:data/xx/
mongo.connect("mongodb://127.0.0.1/douban1",{useUnifiedTopology: true,useNewUrlParser:true})
mongo.connection.on("connected",err=>{
	console.log("连接成功")
})

//后端存储数据表：
let adminHead = mongo.Schema({
	time:{
		type:Date,
		default:new Date()
	},
	userName:String,
	pwd:String,
	address:{
		type:String,
		default:"信阳"
	}
})
let admin = mongo.model("admin",adminHead)

let userHead = mongo.Schema({
	userName:String,
	pwd:String,
	tel:Number,
	sex:String,
	country:String,
	photo:{
		type:String,
		default:''
	},
	pic:{
		type:String,
		default:''
	},
	birth:{
		type:Date,
		default:new Date()
	},
	regTime:{
		type:Date,
		default:new Date()
	}
})
let user = mongo.model("user",userHead)

let collectHead = mongo.Schema({
	userName:String,
	aa:String,
	collectData:Array,
	critical:Array,
	time:{
		type:Date,
		default:new Date()	
 	}
})
let collect = mongo.model("collect",collectHead)

let criticaltHead = mongo.Schema({
	title:String,
	content:String,
	aa:String,
	author:String,
	time:{
		type:Date,
		default:new Date()	
 	}
})
let critical = mongo.model("critical",criticaltHead)

let musicHead = mongo.Schema({
	musicsName:String,
	author:String,
	detail:String,
	country:String,
	pic:String,
	grade:Number,
	grade:Number,
	time:{
		type:Date,
		default:new Date()	
 	}
})
let music = mongo.model("music",musicHead)

let movieHead = mongo.Schema({
	moviesName:String,
	author:String,
	detail:String,
	country:String,
	pic:String,
	types:Array,
	grade:Number,
	time:{
		type:Date,
		default:new Date()	
 	}
})
let movie = mongo.model("movie",movieHead)

let novelHead = mongo.Schema({
	novelName:String,
	author:String,
	detail:String,
	pic:String,
	types:Array,
	grade:Number,
	time:{
		type:Date,
		default:new Date()	
 	}
})
let novel = mongo.model("novel",novelHead)

//async function get(){
//	let arr = await movie.find()
//	arr.map(i=>{
//		i.pic = 'http://106.15.93.20:3000/upload/'+i.pic.split("/").pop()
//		return i;
//	}).forEach(async i=>{
//		await movie.updateOne({_id:i._id},i)
//	})
//}
//get()
//async function getmusic(){
//	let arr = await music.find()
//	arr.map(i=>{
//		i.pic = 'http://106.15.93.20:3000/upload/'+i.pic.split("/").pop()
//		return i;
//	}).forEach(async i=>{
//		await music.updateOne({_id:i._id},i)
//	})
//}
//getmusic()
//
//async function getnovel(){
//	let arr = await novel.find()
//	arr.map(i=>{
//		i.pic = 'http://106.15.93.20:3000/upload/'+i.pic.split("/").pop()
//		return i;
//	}).forEach(async i=>{
//		await novel.updateOne({_id:i._id},i)
//	})
//}
//getnovel()


module.exports = {admin,user,music,movie,novel,collect,critical}


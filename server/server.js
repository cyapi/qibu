let Koa = require("koa");
let server = new Koa();
server.listen(3000,err=>{
	console.log("后端服务器已监听3000端口，如果有人向3000端口发请求，服务器就会做出响应")
})
//引入数据库（会把代码执行）及 会导出一个user表对象
let {admin,user,music,movie,novel,collect,critical}=require("./mongo")

let Static = require("koa-static")
server.use(Static("./src"))
//koa2-cors
//cors就是一种跨域解决方案：它是一个资源共享器
let cors = require("koa2-cors")
server.use(cors())
//启用了koa-body之后才可以接收post请求
let body = require("koa-body")
server.use(body())

let multer = require("koa-multer")
//tool就是一个接收器的实例，在实例时至少要告诉它 图片 存储的地址
var storage = multer.diskStorage({
  //文件保存路径
  //destination目标址
  //request 这一请求 的信息（req.url  req.query 。。。）
  //file 文件信息 （文件名 文件大小  文件的内容）
  //cb -> callback ->回调函数
  destination: function (req, file, cb) {
    cb(null, 'src/upload/')
  },
  //修改文件名称
  filename: function (req, file, cb) {
  	//以点分割成数组，数组的最后一项就是后缀名
  	// 声明一个变量 = 文件.原始的文件名（sew213.jpg）.slit(".") -> [sew213,jpg]
    var fileFormat = (file.originalname).split("."); 
           //1234567890 + "." + 
    cb(null,getDate() + "." + fileFormat.pop());
  }
})



//使用koa-router 后端来写接口
let Router = require("koa-router")
let router = new Router();

router.get("/home",async (ctx,next)=>{
	ctx.body = await homelie.find();
})


router.post("/admin",async (ctx,next)=>{
	let web = ctx.request.body;
	let res = await admin.findOne({userName:web.userName})
	if(res){
		if(res.pwd==web.pwd){
			ctx.body = "登录成功"
		}else{
			ctx.body = "密码错误"
		}
	}else{
		let oneRow = new admin(web);
		await oneRow.save()
		ctx.body = "注册成功"
	}
})
router.get("/admin",async (ctx,next)=>{
	let total = await admin.countDocuments();
	let size = +ctx.query.size;
	let current = +ctx.query.current;
	let data = await admin.find().skip((current-1)*size).limit(size).sort({_id:-1})
	ctx.body={
		total,
		data
	}
})

function getDate(){
	var time = new Date();
	//console.dir(time)  //日期对象
	//1.获取年
	var year = time.getFullYear(); //2019
	//2.获取月
	var month = time.getMonth()+1; //月的范围是0-11
	//3.获取日
	var day = time.getDate();
	//4.获取星期
	var week = time.getDay();//3 //星期范围是0-6,星期天是一周第一天
	var weekStr = "日一二三四五六";
	var week1 = weekStr[week]; //三
	//5.获取小时
	var hours = time.getHours(); //小时范围是 0-23
	//6.获取分钟
	var minutes = time.getMinutes(); //分钟范围是 0-59
	//7.获取秒
	var seconds = time.getSeconds(); //秒范围是 0-59
	//8.获取毫秒
	var seconds2 = time.getMilliseconds()
	return `${year}-${month}-${day}-${hours}-${minutes}-${seconds}-${seconds2}`
}
let tool = multer({storage})

//在/upload请求响应时，就接收单独的一张图片
router.post("/upload",tool.single("file"),(ctx,next)=>{
	ctx.body = ctx.req.file.filename;       
})

router.post("/reg",async (ctx,next)=>{
	let web = ctx.request.body;
	let oneName = await user.findOne({userName:web.userName})
	let oneRow = await user.findOne({tel:web.tel})
	if (!oneRow && !oneName) {
	let newOne = new user(web);
		await newOne.save()
		ctx.body = {
			message:"注册成功"
		}
	} else{
		ctx.body = '此用户已被注册，请换个用户名或电话'
	}
})
router.get("/user",async (ctx,next)=>{
	let web = ctx.query;
	ctx.body = await user.findOne({userName:web.userName})
})

router.get("/userx",async (ctx,next)=>{
	let total = await user.countDocuments();
	let size = +ctx.query.size;
	let current = +ctx.query.current;
	console.log(total,size,current)
	let data = await user.find().skip((current-1)*size).limit(size).sort({_id:-1})
	ctx.body={
		total,
		data
	}
})
router.put("/userx",async (ctx,next)=>{
	let web = ctx.request.body;
	let userName = ctx.query.userName;
	await user.updateOne({userName},web);
	ctx.body = "修改成功"
})

router.post("/login",async (ctx,next)=>{
	let web = ctx.request.body;
	let one = await user.findOne({userName:web.userName,pwd:web.pwd})
	if(one){
		ctx.body="登陆成功"
	}
	else{
		ctx.body="用户名或电话不存在"
	}
})

//通用获取数据接口
router.get("/book",async (ctx,next)=>{
	let total = await novel.countDocuments();
	let size = +ctx.query.size;
	let current = +ctx.query.current;
	let data = await novel.find().skip((current-1)*size).limit(size).sort({_id:-1})
	ctx.body={
		total,
		data
	}
})

router.get("/movie",async (ctx,next)=>{
	let total = await movie.countDocuments();
	let size = +ctx.query.size;
	let current = +ctx.query.current;
	let data = await movie.find().skip((current-1)*size).limit(size).sort({_id:-1});
	ctx.body={
		total,
		data
	}
})

router.get("/music",async (ctx,next)=>{
	let total = await music.countDocuments();
	let size = +ctx.query.size;
	let current = +ctx.query.current;
	let data = await music.find().skip((current-1)*size).limit(size).sort({_id:-1})
	ctx.body={
		total,
		data
	}
})

//后端修改数据接口
router.post("/music",async (ctx,next)=>{
	let web = ctx.request.body;
	let oneRow = new music(web);
	let res = await oneRow.save();
	if (res) {
		ctx.body = "添加成功";
	} else{
		ctx.body = "添加失败";
	}
})

router.delete("/music",async (ctx,next)=>{
	let _id = ctx.query.id;
	await music.deleteOne({_id});
	ctx.body = "删除成功"
})

router.put("/music",async (ctx,next)=>{
	let web = ctx.request.body;
	let _id = ctx.query.id;
	await music.updateOne({_id},web);
	ctx.body = "修改成功"
})

router.post("/movie",async (ctx,next)=>{
	let web = ctx.request.body;
	let oneRow = new movie(web);
	let res = await oneRow.save();
	if (res) {
		ctx.body = "添加成功";
	} else{
		ctx.body = "添加失败";
	}
})

router.delete("/movie",async (ctx,next)=>{
	let _id = ctx.query.id;
	await movie.deleteOne({_id});
	ctx.body = "删除成功"
})

router.put("/movie",async (ctx,next)=>{
	let web = ctx.request.body;
	let _id = ctx.query.id;
	await movie.updateOne({_id},web);
	ctx.body = "修改成功"
})

router.post("/book",async (ctx,next)=>{
	let web = ctx.request.body;
	let oneRow = new novel(web);
	let res = await oneRow.save();
	if (res) {
		ctx.body = "添加成功";
	} else{
		ctx.body = "添加失败";
	}
})

router.delete("/book",async (ctx,next)=>{
	let _id = ctx.query.id;
	await novel.deleteOne({_id});
	ctx.body = "删除成功"
})

router.put("/book",async (ctx,next)=>{
	let web = ctx.request.body;
	let _id = ctx.query.id;
//	console.log(_id)
//	console.log(web)
	await novel.deleteOne({_id});
	let oneRow = new novel(web);
	let res = await oneRow.save();
//	console.log(res)
	if (res) {
		ctx.body = "修改成功"
	} else{
		ctx.body = "修改失败";
	}
})
//前端接口
router.post('/musicfiles',async (ctx,next)=>{
	let web = ctx.request.body;
	let data = await music.findOne({_id:web._id});
	web.collectData=data
	let oneRow = new collect(web);
	let res = await oneRow.save();
	if (res) {
		ctx.body = "添加成功";
	} else{
		ctx.body = "添加失败";
	}
})

router.get("/bookcurrent",async (ctx,next)=>{
	let total = await novel.countDocuments();
	let size = +ctx.query.size;
	let current = +ctx.query.current;
	//console.log(current,size,total)
	let data = await novel.find().skip((current-1)*size).limit(size).sort({_id:-1})
	//console.log(data)
	ctx.body={
		total,
		data
	}
})

router.get("/moviescurrent",async (ctx,next)=>{
	let total = await novel.countDocuments();
	let size = +ctx.query.size;
	let current = +ctx.query.current;
	//console.log(current,size,total)
	let data = await movie.find().skip((current-1)*size).limit(size).sort({_id:-1})
	//console.log(data)
	ctx.body={
		total,
		data
	}
})

router.get("/collect",async (ctx,next)=>{
	let userName = ctx.query.userName;
	let data = await collect.find({userName}).sort({time:-1})
	ctx.body={
		data
	}
})

router.post("/collect",async (ctx,next)=>{
	let web = ctx.request.body;
	let data = await collect.findOne({userName:web.params.userName,collectData:web.params.collectData})
	web.userName=web.params.userName;
	web.collectData=web.params.collectData;
	web.aa=web.params.aa;
	if (!data) {
		let oneRow = new collect(web);
		let res = await oneRow.save();
		if (res) {
			ctx.body={
				message:"添加成功"
			}
		} else{
			ctx.body={
				message:"添加失败"
			}
		}
	} else{
		 await collect.deleteOne({collectData:web.params.collectData});
		 ctx.body={
			message:"删除成功"
		}
	}
})

router.post("/collectD",async (ctx,next)=>{
	let web = ctx.request.body;
	let oneRow = new collect(web.params);
	let res = await oneRow.save();
	if (res) {
		ctx.body = '添加成功'
	} else{
		ctx.body = '添加失败'
	}
})

router.delete("/collect",async (ctx,next)=>{
	let _id = ctx.query._id;
	await collect.deleteOne({_id});
	ctx.body = "删除成功"
})

router.post("/ping",async (ctx,next)=>{
	let web = ctx.request.body;
	let oneRow = new critical(web);
	let res = await oneRow.save();
	if (res) {
		ctx.body = '添加成功'
	} else{
		ctx.body = '添加失败'
	}
})
router.get("/ping",async (ctx,next)=>{
	let title = ctx.query.title;
	let data = await critical.find({title:title})
	if (data) {
		ctx.body = data
	} else{
		ctx.body = '获取失败'
	}
})
router.delete("/ping",async (ctx,next)=>{
	let author = ctx.query.author;
	let content = ctx.query.content;
    let data=await critical.deleteOne({content,author});
    if (data) {
		ctx.body = "删除成功"
	} else{
		ctx.body = '删除失败'
	}
})

server.use(router.routes())
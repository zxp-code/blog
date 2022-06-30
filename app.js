//引入express框架
const express = require("express")
const expressArtTemplate = require("express-art-template")
//数据库连接
require("./model/connect")
//引入创建一个用户
// require("./model/user")
//引入body-parser模块，处理post请求参数
const bodyParser = require("body-parser");
//引入session模块
const session = require("express-session")
//调用express方法 创建服务器
const app = express()

const path = require("path")
//配置session
app.use(session({secret:"secret key"}))
//处理post请求参数    处理所有
app.use(bodyParser.urlencoded({extended:false}))
//告诉express框架模板的所在位置
app.set("views",path.join(__dirname,"views"))

//告诉express框架模板的默认后缀是什么
app.set('view engine',"html")

//当渲染后缀为html模板时，所使用的的模板引擎是什么
app.engine("html",require("ejs").__express)
app.engine("html",expressArtTemplate)


//开放静态资源
app.use(express.static(path.join(__dirname,"public")))

//引入路由模块
const home  = require("./route/home")
const admin = require("./route/admin")

//登陆拦截
// app.use('/',(req,res)=>{res.redirect('/home')})
const guard = require("./middleware/loginGuard")
app.use("/admin",guard)
//为路由对象匹配请求路径
app.use("/home",home)
app.use("/admin",admin)
//错误处理中间件
// app.use((req, res, next,err)=>{
//     const result = JSON.parse(err)
//     res.redirect(`${result.path}?message=${result.message}`)
// })
//监听端口
app.listen(80)
console.log("服务器启动成功")
module.exports =  app
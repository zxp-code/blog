//引入express模块
const express = require("express")

//创建博客展示页面路由
const home = express.Router()

home.get("/",(req,res)=>{
res.render("home/default")

})
module.exports = home

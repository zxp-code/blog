//引入express模块
const express = require("express")
//导入用户集合构造函数
const {User} = require("../model/user");
//引入bcrypt，用来比对密码
const  bcrypt = require("bcrypt")

//创建博客展示页面路由
const admin = express.Router()

//渲染登录页面
admin.get("/login",require("./admin/loginPage"))
//登录功能
admin.post("/login",require("./admin/login"))
admin.get("/article",require("./admin/article"))
admin.get("/article-edit",require("./admin/articleEdit"))
//创建用户列表路由配置
admin.get("/user",require("./admin/userPage"))
//创建用户编辑页面
admin.get("/user-edit",require("./admin/userEdit"))
//创建用户添加功能路由
admin.post("/user-edit",require("./admin/userEditFn"))
//修改用户功能路由
admin.post("/user-modify",require("./admin/userModify"))
//删除用户路由
admin.get("/user-delete",require("./admin/user-delete"))
module.exports = admin

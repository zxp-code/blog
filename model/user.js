//创建用户集合
//引入mongoose模块
const mongoose = require("mongoose")
//引入bcrypt,对密码进行加密
const bcrypt = require("bcrypt")
const joi = require("joi");
//创建Schema构造函数的实例
//创建用户集合规则
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        minlength:2,
        maxlength:20,
    },
    email:{
        type:String,
        required:true,
        //保证邮箱地址不重复
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    //admin 超级管理员
    //normal    普通用户
    role:{
        type:String,
        required:true
    },
    //0启用
    //1禁用
    state:{
        type:Number,
        default:0
    }

})
//创建用户
const User = mongoose.model("User",userSchema)
async function createUser(){
    //创建随机字符串
    const salt = await bcrypt.genSalt(10)
    //对明文进行加密
    const pass = await bcrypt.hash("123456",salt)
    // 初始化一个用户，用来支撑登录功能
    const user = await User.create({
        username:'zxpStone',
        email:'zxp@qq.com',
        password:  pass,
        role:'admin',
        state:0
    })
}
// createUser();
//验证用户信息
const validateUser = user => {
    const schema = {
        username:joi.string().required().error(new Error('用户名不符合要求')),
        email:joi.string().email().required().error(new Error('邮箱不符合要求')),
        password:joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required().error(new Error('密码不符合要求')),
        role:joi.string().valid('normal','admin').required().error(new Error('角色不符合要求')),
        state:joi.number().valid(0,1).required().error(new Error('状态码不符合要求')),
    };
    return  joi.validate(user,schema)
}


module.exports = {
    User,
    validateUser,
}
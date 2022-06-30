//joi用来验证JavaScript对象数据
const joi = require("joi");
//引入User变量
const {User,validateUser} = require("../../model/user");
//引入加密模块
const bcrypt = require("bcrypt");


module.exports = async (req, res,next) => {
    
    //定义对象验证规则

    try{
        await validateUser(req.body)
    }catch (ex){
        //验证没有通过
        return res.redirect(`user-edit?message=${ex.message}`)
    }
    //验证邮箱地址是否存在
    let user = await User.findOne({email:req.body.email})
    if(user){
        //重定向回用户编辑页面 并传递message参数
        return res.redirect(`user-edit?message=邮箱地址已经存在`)
    }
    //对密码进行加密
    //生成随机字符串
    const salt = await bcrypt.genSalt(10)
    //加密并替换
    req.body.password = await bcrypt.hash( req.body.password, salt)
    //添加到数据库中
    await User.create(req.body)
    res.redirect(`user`)
}
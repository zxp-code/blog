const {User} = require("../../model/user");
const bcrypt = require("bcrypt");
module.exports = async (req, res) => {
//    接收post请求参数，需要用到body-parser模块
    const {email, password} = req.body;
    if (email.trim().length == 0 || password.trim().length == 0) {
        return res.status(400).render("admin/error", {
            msg: "邮件地址或密码错误"
        })
    }
//    根据邮箱信息查询用户信息
    let user = await User.findOne({email})
    //如果用户存在
    if (user) {
        //将客户端传递过来的密码和用户信息中的密码进行比对
        //    bcrypt.compare()是用来比对的异步api
        //    第一个参数是明文，第二个参数是密文
        if(await bcrypt.compare(password,user.password)){
            //    登录成功 跳转到user页面

            req.session.username = user.username
            req.app.locals.userInfo = user
            res.redirect("/admin/user")
        }else {
            //密码错误
            return res.status(400).render("admin/error", {
                msg: "邮件地址或密码错误"
            })

        }

    } else { //如果用户不存在
        return res.status(400).render("admin/error", {
            msg: "邮件地址或密码错误"
        })
    }


}
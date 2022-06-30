const {User} = require("../../model/user")
const bcrypt = require("bcrypt")
module.exports = async (req,res)=>{
    //获取post请求中的请求体
    //经过了解构
    const {username,password,email,state,role} = req.body
    //获取get请求中的参数id
    const id = req.query.id

    // 根据id查询用户
    const user = await User.findOne({_id:id})
    // res.send(user)
    // 密码比对
    const isVaild = await bcrypt.compare(password,user.password)

    if(isVaild){
    //密码比对成功，更新信息
        await User.updateOne({_id:id},{ //与数据库的操作都是异步，总是忘记加await
            //可以解构出来
            username,
            email,
            role,
            state,
        })
    //    更新成功，重定向回用户页面
        res.redirect("user")
    }else{
        // 密码比对失败
        return res.redirect(`user-edit?id=${id}&message=密码比对失败，不能更新用户信息`)
    }

}
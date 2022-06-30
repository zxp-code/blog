const {User} = require("../../model/user")
module.exports = async(req,res)=> {
    //获取id
    let id = req.query.id
    //数据库删除用户操作
    await User.findOneAndDelete({_id:id})
//    删除之后重定向会用户列表页面
    res.redirect("user")
}
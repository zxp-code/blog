const {User} = require("../../model/user");
module.exports = async (req, res)=>{
    //接收用户传递过来的current page参数
    let page = req.query.page || 1;
    //每一页显示的条数
    let pagesize = 5;
    //查询用户数据的总数
    let count = await User.countDocuments()
    //总页数
    let total = Math.ceil(count/pagesize)
    //页码对应的开始位置
    let start = (page - 1)*pagesize
    //将用户信息从数据库中查询出来
    let users = await User.find({}).limit(pagesize).skip(start)

    res.render("admin/user",{
        users,
        total,
        page
    })
}
const {User}  = require('../../model/user')


module.exports = async (req, res) => {
    
    //获取到地址栏中的id参数
    const {message, id} = req.query
    //如果传递了id参数
    if (id) {
        // 修改操作
        let user = await User.findOne({_id: id})
        res.render('admin/user-edit', {
            user,
            message,
            link: 'user-modify?id='+id,
            button:'修改'
        })
    } else {
        // 添加操作
        res.render("admin/user-edit", {
            message,
            link:'user-edit',
            button:'添加'
        })
    }

}
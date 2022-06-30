const guard = (req, res, next)=>{
    //判断用户请求的是否是登录页面
    //如果用户请求的是不是登录页面
    //判断用户的登录状态
    //如果用户是登录状态，则请求放行
    //如果用户没有登录，重定向到登录页面
    if(req.url != "/login" && !req.session.username){
        res.redirect("/admin/login")
    }else{
        next()
    }
}
module.exports = guard
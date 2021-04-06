const UserRouter = require('koa-router')()
const Models = require('../models')
const md5 = require('md5')
const {Sequelize:{Op} } = Models.sequelize
const { handlerAsyncError } = require('../utils/index')


//注册接口
UserRouter.post('/register',async ctx=>{
    let user_name = ctx.request.body.user_name.trim();
    let userPwd = ctx.request.body.userPwd.trim();
    let u_email = ctx.request.body.u_email.trim();
    const mdPwd = md5(userPwd)

    console.log(user_name,userPwd,u_email);
    console.log(ctx.request.body);
    let user

    user = await Models.user_info.findOne({
        where:{
            user_name: user_name,
        }
    })


    if(user){
        return ctx.body = {
            status: '2',
            msg: '用户名已存在'
        }
    }
    let userId = await Models.user_info.max('user_id')+1;
    console.log(userId);
    let rs;
    try{
        rs = await Models.user_info.build({
            user_id:userId,
            user_name:user_name,
            u_password:mdPwd,
            u_email:u_email
        }).save()
    }catch(error){
        ctx.response.status = 500;
        return ctx.body = {
            status: '1',
            msg: error.message,
            result: ''
        }
    }
    if(rs){
        ctx.session.username = user_name
        ctx.session.userid = userId
        return ctx.body = {
            status: '0',
            msg: '用户注册成功',
            result: {
                user_name: user_name,
            }
        }
    }
})

//登录接口
UserRouter.post('/login',async ctx=>{

    let user_name = ctx.request.body.user_name.trim();
    let userPwd = ctx.request.body.userPwd.trim();
    console.log(user_name,userPwd);
    console.log(ctx.request.body);
    let mdPwd = md5(userPwd)
    let user
    let admin
    user = await Models.user_info.findOne({
        where:{
            user_name: user_name,
            u_password:mdPwd
        }
    })

    admin = await Models.admin_info.findOne({
        where:{
            admin_name: user_name,
            a_password: mdPwd
        }
    })
    if(admin){
        ctx.session.username = admin.get('admin_name'),
        ctx.session.userid = admin.get('admin_id')
        return ctx.body = {
            status: '3',
            msg: '管理员登陆成功',
            result: {
                admin_name: admin.get('admin_name'),
            }
        }
    }


    else if(user){
        ctx.session.username = user.get('user_name')
        ctx.session.userid = user.get('user_id')
        return ctx.body = {
            status: '0',
            msg: '用户登录成功',
            result: {
                user_name: user.get('user_name'),
            }
        }
    }
    else{
        return ctx.body = {
            status: '4',
            msg: '用户名或者密码错误',
            result: ''
        }
    }
})

//退出登录
UserRouter.post('/layout', async ctx=> {
    ctx.session = null; // 清空登录状态
    ctx.body = {
        status: 0,
        msg: '退出成功',
        result: ''
    }
})

//加入购物车
UserRouter.get('/addCart', async ctx=>{

    let books_id = ctx.query.books_id
    let sum = parseInt(ctx.query.sum)
    let book = await Models.books_info.findOne({
        where:{
            books_id:books_id
        }
    })
    let cart_id = await  Models.cart.max('cart_id')
    if(isNaN(cart_id)){
        cart_id = 1;
        let newOne;
        try{
            newOne = await Models.cart.build({
                cart_id:cart_id,
                user_name:ctx.session.username,
                books_id:books_id,
                books_name:book.books_name,
                books_secprice:book.secprice,
                books_sums:sum,
                picture:book.picture,
                condition:book.condition,
                sumMax:book.books_sums,
                checked:1
            }).save()
        }catch(error){
            return ctx.body = {
                status: '1',
                msg: error.message,
                result: '加入购物车失败111'
            }
        }
        if(newOne){
            return ctx.body = {
                status: '0',
                msg: '加入购物车成功',
            }
        }
    }
    else {
        let cart;
        try{
            cart= await Models.cart.findOne({
                where:{
                    books_id:books_id,
                    user_name:ctx.session.username
                }
            })
        }catch (err){
            return ctx.body={
                status: '4',
                msg: err.message,
                result: ''
            }
        }

        if(cart){
            let sumAdd = cart.books_sums+sum
            console.log(sumAdd);
            console.log(sum);
            console.log(cart.books_sums);
            if( sumAdd >book.books_sums){
                return ctx.body={
                    status: '4',
                    msg: '',
                    result: '书籍库存不足'
                }
            }else {
                let cartOne = await Models.cart.update({
                    books_sums:sumAdd
                },{
                    where:{
                        cart_id:cart.cart_id
                    }
                })
                if(cartOne){
                    return ctx.body = {
                        status: '3',
                        msg: 'success',
                        result: '该购物车商品数量加一'
                    }
                }
            }
        } else {
            cart_id += 1
            let rs;
            try{
                rs = await Models.cart.build({
                    cart_id:cart_id,
                    user_name:ctx.session.username,
                    books_id:books_id,
                    books_name:book.books_name,
                    books_secprice:book.secprice,
                    books_sums:sum,
                    picture:book.picture,
                    condition:book.condition,
                    sumMax:book.books_sums,
                    checked:1
                }).save()
            }catch(error){
                return ctx.body = {
                    status: '1',
                    msg: error.message,
                    result: '加入购物车失败222'
                }
            }
            if(rs){
                return ctx.body = {
                    status: '0',
                    msg: '加入购物车成功',
                }
            }
        }
    }
})

//查看购物车商品
UserRouter.get('/getCart',async ctx =>{
    let rs;
    try{
        rs = await Models.cart.findAll({
            where:{
                user_name:ctx.session.username
            },
        })
    }catch (err){
        return ctx.body = {
            status:'1',
            message:err.message,
        }
    }
    if(rs){
        return ctx.body={
            status: '0',
            message: '获取用户购物车信息成功',
            data:rs
        }
    }
})

//更新购物车商品数量
UserRouter.get('/updateCart',async ctx =>{
    let sum = parseInt(ctx.query.sum)
    console.log(ctx.query);
    console.log(sum);
    let books_id = parseInt(ctx.query.books_id)
    let rs;
    try{
        rs = await Models.books_info.findOne({
            where:{
                books_id:books_id
            }
        })

    }catch (err){
        return ctx.body={
            status:'1',
            message:err.message
        }
    }
    if(rs){
        if(sum>rs.books_sums){
            return ctx.body = {
                status:'2',
                message:"库存不足"
            }
        }
        else {
            let res;
            try{
                res = await Models.cart.update({
                    books_sums:sum
                },{
                    where:{
                        user_name:ctx.session.username,
                        books_id:books_id
                    }
                })
            }catch (err){
                return ctx.body = {
                    status:'3',
                    message:err.message
                }
            }
            if(res){
                return ctx.body={
                    status:'0',
                    message:'数据更新成功',
                    sum:rs.books_sums
                }
            }

        }
    }

})

//删除购物车商品
UserRouter.get('/deleteCart',async ctx =>{
    let cart_id = ctx.query.cart_id
    let rs;
    try{
        rs = await Models.cart.destroy({
            where:{
                cart_id:cart_id
            }
        })
    }catch (err){
        return ctx.body = {
            status:'1',
            message:err.message
        }
    }
    if(rs){
        return ctx.body= {
            status: '0',
            message:'删除成功'
        }
    }
})
module.exports = UserRouter;

//获取用户信息
UserRouter.get('/user',async ctx =>{
    let rs;
    try{
        rs = await Models.user_info.findOne({
            where:{
                user_name:ctx.session.username
            }
        })
    }catch (err){
        return ctx.body = {
            status:'1',
            message: err.message
        }
    }
    if(rs){
        return ctx.body ={
            status:'0',
            data: rs
        }
    }
})

//更新用户信息
UserRouter.post('/userUpdate',async ctx =>{
    let tel = ctx.request.body.tel.trim();
    let post_code = ctx.request.body.post_code.trim();
    let street_name = ctx.request.body.street_name.trim();
    let rs;
    try{
        rs = await Models.user_info.update({
            tel:tel,
            post_code:post_code,
            street_name:street_name,
        },{
            where:{
                user_name:ctx.session.username
            }
        })
    }catch (err){
        return ctx.body = {
            status :'1',
            message:err.message
        }
    }
    if(rs){
       return ctx.body = {
           status:'0',
           message:'更新成功',
           data:rs
       }
    }
})

//修改用户密码
UserRouter.post('/passUpdate',async ctx=>{
    let password = md5(ctx.request.body.password)
    let oldPassword = md5(ctx.request.body.oldPassword)


    let old = await Models.user_info.findOne({
        where:{
            user_name:ctx.session.username
        }
    })
    console.log(old.u_password);
    console.log(oldPassword);
    if(old.u_password !== oldPassword){
        return ctx.body = {
            status:'1',
            message:'原密码输入错误'
        }
    }


    let rs;
    try{
        rs = await Models.user_info.update({
            u_password: password
        },{
            where:{
                user_name:ctx.session.username
            }
        })
    }catch (err){
        return ctx.body = {
            status :'2',
            message:err.message
        }
    }
    if(rs){
        return ctx.body = {
            status:'0',
            message:'修改密码成功',
            data:rs
        }
    }
})

//用户个人商品
UserRouter.get('/profileBook',async ctx=>{
    console.log(ctx.query);
    let page = ctx.query.page || 1
    let prePage = parseInt(ctx.query.prepage) || 2
    let offset = (page-1)*prePage;

    let rs;
    try{
        rs = await Models.books_info.findAndCountAll({
            limit:prePage,
            offset,
            where:{
                user_name:ctx.session.username
            },
            order:[
                [ 'is_check','DESC']
            ]
        })
    }catch (err){
        return ctx.body = {
            status:'1',
            message:err.message
        }
    }
    if(rs){
        return ctx.body = {
            code:0,
            count:rs.count,
            prePage,
            data:rs.rows
        }
    }
})

//查看用户信息
UserRouter.get('/userPage' ,async ctx=>{
    console.log(ctx.query);
    let page = ctx.query.page || 1
    let prePage = parseInt(ctx.query.prepage) || 2
    let offset = (page-1)*prePage;

    let rs = await Models.user_info.findAndCountAll({
        limit:prePage,
        offset,
    })

    ctx.body = {
        code:0,
        count:rs.count,
        prePage,
        data:rs.rows.map(d =>{
            return {
                user_name:d.user_name,
                user_id:d.user_id,
                u_email:d.u_email,
                street_name:d.street_name,
                post_code:d.post_code,
                tel:d.tel,
                is_default:d.is_default,
                credits:d.credits
            }
        })
    }
})

//删除用户信息
UserRouter.post('/deleteUser', async ctx =>{
    let user_name = ctx.request.body.user_name
    let [err,rs] = await handlerAsyncError(Models.user_info.destroy({
        where:{
            user_name:user_name
        }
    }))
    if(err){
        ctx.response.status = 500;
        return ctx.body = {
            status: '1',
            msg: err.message,
            result: ''
        }
    }
    if(rs){
        ctx.body = {
            status: '0',
            msg: '',
            result: 'del success'
        }
    }

})

//用户认证商家、
UserRouter.get('/beMerchant', async ctx =>{
    let rs;
    try{
        rs = await Models.user_info.update({
            is_default:1
        },{
            where:{
                user_name:ctx.session.username
            }
        })
    }catch (err){
        return ctx.body = {
            status :'1',
            message:err.message
        }
    }
    if(rs){
        return ctx.body = {
            status:'0',
            message:'认证商家成功',
            data:rs
        }
    }
})

//生成订单
UserRouter.post('/order',async ctx =>{
         console.log(ctx.request.body);
         let tel = ctx.request.body.tel
         let address = ctx.request.body.address
         let name = ctx.request.body.name
         let email = ctx.request.body.email
         let cost = parseInt(ctx.request.body.secprice)
         let order_time = Date.now()
         let cart_id = ctx.request.body.cart_id || 0
         let books_id = ctx.request.body.books_id
         let books_name = ctx.request.body.books_name
         let books_price = parseFloat(ctx.request.body.books_price)
         let books_sum = parseInt(ctx.request.body.books_sum)
         let content_cost = books_price * books_sum
         let statue = parseInt(ctx.request.body.state)
         let order_id = await Models.order_info.max('order_id')+1
         let user_name = ctx.session.username



        if(statue ==1){
            let allCredits = await  Models.user_info.findOne({
                where:{
                    user_name:user_name
                }
            })
            let newCredits = allCredits.credits -  content_cost
            if(newCredits<0){
                return ctx.body = {
                    status: '11',
                    msg: '积分不足，无法兑换',
                }
            }
            let credit = await Models.user_info.update({
                credits: newCredits
            },{
                where:{
                    user_name:user_name
                }
            })
        }


         if(isNaN(order_id)){
            order_id = 20201217
            let rs;
            try{
                rs = await Models.order_info.build({
                    order_id:order_id,
                    user_name:ctx.session.username,
                    consignee:name,
                    address:address,
                    tel:tel,
                    email:email,
                    order_time:order_time,
                    cost:cost,
                    state:statue,
                    send:0
                }).save()
            }
            catch(error){
                return ctx.body = {
                    status: '111',
                    msg: error.message,
                    result: '生成订单失败'
                }
            }

            if(rs){
                let content_id = await Models.content.max('content_id')
                if(isNaN(content_id)){
                    content_id = 2020121701
                    let res;
                    try{
                        res = await Models.content.build({
                            content_id:content_id,
                            order_id:order_id,
                            books_id:books_id,
                            books_name:books_name,
                            books_price:books_price,
                            books_sum:books_sum,
                            content_cost:content_cost
                        }).save()
                    }
                    catch(error){
                        return ctx.body = {
                            status: '222',
                            msg: error.message,
                            result: '生成订单失败'
                        }
                    }
                    if(res){
                        if(cart_id != 0){
                            let deleteCart = await Models.cart.destroy({
                                where:{
                                    cart_id:cart_id
                                }
                            })
                            let sum = await Models.books_info.findOne({
                                where:{
                                    books_id:books_id
                                }
                            })
                            let NewSum = sum.books_sums - books_sum
                            let books = await Models.books_info.update({
                                books_sums:NewSum
                            },{
                                where:{
                                    books_id:books_id
                                }
                            })


                            if(deleteCart && books){
                                return ctx.body = {
                                    status: '0',
                                    msg: '生成订单成功',
                                }
                            }else {
                                return ctx.body = {
                                    status: '003',
                                    msg: '生成订单失败',
                                }
                            }
                        }
                        else {
                            let sum = await Models.books_info.findOne({
                                where:{
                                    books_id:books_id
                                }
                            })
                            let NewSum = sum.books_sums - books_sum
                            let books = await Models.books_info.update({
                                books_sums:NewSum
                            },{
                                where:{
                                    books_id:books_id
                                }
                            })

                            if(books){
                                return ctx.body = {
                                    status: '0',
                                    msg: '生成订单成功',
                                }
                            }else {
                                return ctx.body = {
                                    status: '003',
                                    msg: '生成订单失败',
                                }
                            }
                        }

                    }
                    else {
                        return ctx.body = {
                            status: '002',
                            result: '生成订单失败'
                        }
                    }
                }
                else {
                    content_id += 1
                    let res;
                    try{
                        res = await Models.content.build({
                            content_id:content_id,
                            order_id:order_id,
                            books_id:books_id,
                            books_name:books_name,
                            books_price:books_price,
                            books_sum:books_sum,
                            content_cost:content_cost
                        }).save()
                    }
                    catch(error){
                        return ctx.body = {
                            status: '444',
                            msg: error.message,
                            result: '生成订单失败'
                        }
                    }
                    if(res){
                        if(cart_id != 0){
                            let deleteCart = await Models.cart.destroy({
                                where:{
                                    cart_id:cart_id
                                }
                            })
                            let sum = await Models.books_info.findOne({
                                where:{
                                    books_id:books_id
                                }
                            })
                            let NewSum = sum.books_sums - books_sum
                            let books = await Models.books_info.update({
                                books_sums:NewSum
                            },{
                                where:{
                                    books_id:books_id
                                }
                            })

                            if(deleteCart && books){
                                return ctx.body = {
                                    status: '0',
                                    msg: '生成订单成功',
                                }
                            }else {
                                return ctx.body = {
                                    status: '555',
                                    msg: '生成订单失败',
                                }
                            }
                        }
                        else {
                            let sum = await Models.books_info.findOne({
                                where:{
                                    books_id:books_id
                                }
                            })
                            let NewSum = sum.books_sums - books_sum
                            let books = await Models.books_info.update({
                                books_sums:NewSum
                            },{
                                where:{
                                    books_id:books_id
                                }
                            })

                            if(books){
                                return ctx.body = {
                                    status: '0',
                                    msg: '生成订单成功',
                                }
                            }else {
                                return ctx.body = {
                                    status: '666',
                                    msg: '生成订单失败',
                                }
                            }
                        }
                    }
                    else {
                        return ctx.body = {
                            status: '002',
                            result: '生成订单失败'
                        }
                    }
                }
            }
            else {
                return ctx.body = {
                    status: '001',
                    result: '生成订单失败'
                }
            }
        }
         else {
             let rs;
                try{
                    rs = await Models.order_info.build({
                        order_id:order_id,
                        user_name:ctx.session.username,
                        consignee:name,
                        address:address,
                        tel:tel,
                        email:email,
                        order_time:order_time,
                        cost:cost,
                        state:statue,
                        send:0
                    }).save()
                }
                catch(error){
                    return ctx.body = {
                        status: '777',
                        msg: error.message,
                        result: '生成订单失败'
                    }
                }

                if(rs){
                    let content_id = await Models.content.max('content_id')
                    if(isNaN(content_id)){
                        content_id = 2020121701
                        let res;
                        try{
                            res = await Models.content.build({
                                content_id:content_id,
                                order_id:order_id,
                                books_id:books_id,
                                books_name:books_name,
                                books_price:books_price,
                                books_sum:books_sum,
                                content_cost:content_cost
                            }).save()
                        }
                        catch(error){
                            return ctx.body = {
                                status: '888',
                                msg: error.message,
                                result: '生成订单失败'
                            }
                        }
                        if(res){
                            if(cart_id != 0){
                                let deleteCart = await Models.cart.destroy({
                                    where:{
                                        cart_id:cart_id
                                    }
                                })
                                let sum = await Models.books_info.findOne({
                                    where:{
                                        books_id:books_id
                                    }
                                })
                                let NewSum = sum.books_sums - books_sum
                                let books = await Models.books_info.update({
                                    books_sums:NewSum
                                },{
                                    where:{
                                        books_id:books_id
                                    }
                                })

                                if(deleteCart && books){
                                    return ctx.body = {
                                        status: '0',
                                        msg: '生成订单成功',
                                    }
                                }else {
                                    return ctx.body = {
                                        status: '003',
                                        msg: '生成订单失败',
                                    }
                                }
                            }
                            else {
                                let sum = await Models.books_info.findOne({
                                    where:{
                                        books_id:books_id
                                    }
                                })
                                let NewSum = sum.books_sums - books_sum
                                let books = await Models.books_info.update({
                                    books_sums:NewSum
                                },{
                                    where:{
                                        books_id:books_id
                                    }
                                })

                                if(books){
                                    return ctx.body = {
                                        status: '0',
                                        msg: '生成订单成功',
                                    }
                                }else {
                                    return ctx.body = {
                                        status: '003',
                                        msg: '生成订单失败',
                                    }
                                }
                            }

                        }
                        else {
                            return ctx.body = {
                                status: '002',
                                result: '生成订单失败'
                            }
                        }
                    }
                    else {
                        content_id += 1
                        let res;
                        try{
                            res = await Models.content.build({
                                content_id:content_id,
                                order_id:order_id,
                                books_id:books_id,
                                books_name:books_name,
                                books_price:books_price,
                                books_sum:books_sum,
                                content_cost:content_cost
                            }).save()
                        }
                        catch(error){
                            return ctx.body = {
                                status: '999',
                                msg: error.message,
                                result: '生成订单失败'
                            }
                        }
                        if(res){
                            if(cart_id != 0){
                                let deleteCart = await Models.cart.destroy({
                                    where:{
                                        cart_id:cart_id
                                    }
                                })
                                let sum = await Models.books_info.findOne({
                                    where:{
                                        books_id:books_id
                                    }
                                })
                                let NewSum = sum.books_sums - books_sum
                                let books = await Models.books_info.update({
                                    books_sums:NewSum
                                },{
                                    where:{
                                        books_id:books_id
                                    }
                                })

                                if(deleteCart && books){
                                    return ctx.body = {
                                        status: '0',
                                        msg: '生成订单成功',
                                    }
                                }else {
                                    return ctx.body = {
                                        status: '100',
                                        msg: '生成订单失败',
                                    }
                                }
                            }
                            else {
                                let sum = await Models.books_info.findOne({
                                    where:{
                                        books_id:books_id
                                    }
                                })
                                let NewSum = sum.books_sums - books_sum
                                let books = await Models.books_info.update({
                                    books_sums:NewSum
                                },{
                                    where:{
                                        books_id:books_id
                                    }
                                })

                                if(books){
                                    return ctx.body = {
                                        status: '0',
                                        msg: '生成订单成功',
                                    }
                                }else {
                                    return ctx.body = {
                                        status: '1001',
                                        msg: '生成订单失败',
                                    }
                                }
                            }
                        }
                        else {
                            return ctx.body = {
                                status: '002',
                                result: '生成订单失败'
                            }
                        }
                    }
                }
                else {
                    return ctx.body = {
                        status: '001',
                        result: '生成订单失败'
                    }
                }
            }
})

//获取订单详情
UserRouter.get('/orderContent', async ctx =>{
    let res;
    try{
        res = await Models.order_info.findAll({
            where:{
                user_name:ctx.session.username
            },
            include:[{
                model:Models.content
            }]
        })
    }catch (err){
        return ctx.body = {
            message:err.message,
            status:'1'
        }
    }
    if(res){
        return ctx.body = {
            data:res
        }
    }
})

//获取所有订单
UserRouter.get('/allOrderContent', async ctx =>{
    let page = ctx.query.page || 1
    let prePage = parseInt(ctx.query.prepage) || 2
    let offset = (page-1)*prePage;
    let res;
    try{
        res = await Models.order_info.findAndCountAll({
            limit:prePage,
            offset,
            include:[{
                model:Models.content
            }]
        })
    }catch (err){
        return ctx.body = {
            message:err.message,
            status:'1'
        }
    }
    if(res){
        console.log(res);
        return ctx.body = {
            data:res
        }
    }
})

//更新订单状态
UserRouter.post('/contentUpdate',async ctx =>{
    let order_id = ctx.request.body.order_id

    let res = await Models.order_info.update({
        send:1
    },{
        where:{
            order_id:order_id
        }
    })
    if(res){
        return ctx.body = {
            message:'更新成功'
        }
    }
})

//取消订单
UserRouter.post('/cancelOrder',async ctx =>{
    let order_id = ctx.request.body.order_id
    let content_id = ctx.request.body.content_id
    let books_id = ctx.request.body.books_id
    let sum = ctx.request.body.sum

    let res = await Models.content.destroy({
        where:{
            order_id:order_id,
            content_id:content_id
        }
    })
    let rs = await Models.order_info.destroy({
        where:{
            order_id:order_id,
        }
    })

    if(res&&rs){
        let books = await Models.books_info.update({
            books_sums:sum
        },{
            where:{
                books_id:books_id
            }
        })

        if(books){
            return ctx.body = {
                status:'0',
                message:'取消订单成功'
            }
        }else {
            return ctx.body = {
                status:'2',
                message:'取消订单失败'
            }
        }
    }
    else {
        return ctx.body = {
            status:'1',
            message:'取消订单失败'
        }
    }

})

//删除订单
UserRouter.post('/deleteOrder', async ctx =>{
    let order_id = ctx.request.body.order_id
    let [err,rs] = await handlerAsyncError(Models.order_info.destroy({
        where:{
            order_id:order_id
        }
    }))
    if(err){
        ctx.response.status = 500;
        return ctx.body = {
            status: '1',
            msg: err.message,
            result: ''
        }
    }
    if(rs){
        ctx.body = {
            status: '0',
            msg: '',
            result: 'del success'
        }
    }

})







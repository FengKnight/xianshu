const BooksRouter = require('koa-router')();
const Models = require('../models')
const {Sequelize:{Op} } = Models.sequelize
const { handlerAsyncError } = require('../utils/index')
const path = require('path')
const fs= require('fs')

BooksRouter.get('/big',async (ctx,next)=>{
    let big_sort = await Models.big_sort.findAll()

        ctx.body = big_sort
    }
)

BooksRouter.get('/small',async (ctx,next)=>{
        let small_sort = await Models.small_sort.findAll()
        ctx.body = small_sort
    }
)

BooksRouter.get('/book',async (ctx,next)=>{
        let book = await Models.books_info.findAll()
        ctx.body = book
    }
)

BooksRouter.get('/bookPage',async (ctx,next)=>{
    console.log(ctx.query);
        let page = ctx.query.page || 1
        let prePage = parseInt(ctx.query.prepage) || 2
        let bookId = ctx.query.bookId;
        let offset = (page-1)*prePage;
        let is_exchange = ctx.query.is_exchange || 0
        let is_check = ctx.query.is_check || 1
        if(ctx.session.username =='feng'){
            let rs = await Models.books_info.findAndCountAll({
                limit:prePage,
                offset,
                where:{
                    small_sort_id:bookId,
                    is_exchange:is_exchange,
                    books_sums:{
                        [Op.gt]: 0
                    }
                }
            })

            ctx.body = {
                code:0,
                count:rs.count,
                prePage,
                data:rs.rows
            }
        }
        else {
            let rs = await Models.books_info.findAndCountAll({
                limit:prePage,
                offset,
                where:{
                    small_sort_id:bookId,
                    is_exchange:is_exchange,
                    is_check:is_check,
                    books_sums:{
                        [Op.gt]: 0
                    }
                }
            })

            ctx.body = {
                code:0,
                count:rs.count,
                prePage,
                data:rs.rows
            }
        }

    }
)

//获取审核书籍
BooksRouter.get('/checkBookPage',async (ctx,next)=>{
        let page = ctx.query.page || 1
        let prePage = parseInt(ctx.query.prepage) || 2
        let offset = (page-1)*prePage;

        let rs = await Models.books_info.findAndCountAll({
            limit:prePage,
            offset,
            where:{
                is_check:0,
                books_sums:{
                    [Op.gt]: 0
                }
            }
        })

        ctx.body = {
            code:0,
            count:rs.count,
            prePage,
            data:rs.rows
        }
    }
)
//审核进度更新
BooksRouter.post('/checkBookUpdate',async ctx =>{
    let books_id = ctx.request.body.books_id
    let is_check = ctx.request.body.is_check
    let is_exchange = ctx.request.body.is_exchange ||0
    let secprice = ctx.request.body.secprice
    let username = ctx.request.body.username

    let res = await Models.books_info.update({
        is_check:is_check
    },{
        where:{
            books_id:books_id
        }
    })
    if(res){
        if(is_exchange == 1) {
            let user = await Models.user_info.findOne({
                where: {
                    user_name: username
                }
            })
            let new_credits = secprice + user.credits +1
            let updateCredits = await Models.user_info.update({
                credits: new_credits,
            }, {
                where: {
                    user_name: username
                }
            })

        }
        return ctx.body = {
            message:'更新成功'
        }
    }
})

//商品详情推荐
BooksRouter.get('/likeBook',async (ctx,next)=>{
    let small_sort_id = ctx.query.small_sort_id
    let is_exchange = ctx.query.is_exchange || 0
        let rs = await Models.books_info.findAll({
            limit:4,
            where:{
                small_sort_id:small_sort_id,
                is_exchange:is_exchange,
                books_sums:{
                    [Op.gt]: 0
                }
            },
            order: Models.sequelize.random()
        })

        ctx.body = {
            code:0,
            data:rs
        }
    }
)


//添加商品
BooksRouter.post('/add', async ctx=> {
    //let { productId:product_id,price:sale_price,productName:product_name,img:product_image} = ctx.request.query;
    // console.log(product_id,sale_price,product_name,product_image)
    // 获取最大的商品id

    console.log(ctx.request.body);
    if(ctx.request.body.books_name == null){
    const file = ctx.request.files.file; // 获取上传文件
    // 创建可读流
    const reader = fs.createReadStream(file.path);
    let books_id = await Models.books_info.max('books_id')+1;
    file.name = books_id + file.name
    let filePath = path.join(__dirname, './../public/img') + `/${file.name}`;
    // 创建可写流
    const upStream = fs.createWriteStream(filePath);
    // 可读流通过管道写入可写流
    reader.pipe(upStream);
    return ctx.body = {
        msg:'图片上传成功',
        picPath: file.name,
        picPath1: file.path
    };
    }


        let books_name = ctx.request.body.books_name.trim()
        let intro = ctx.request.body.intro.trim()
        let picture = ctx.request.body.picture.trim()
        let price = parseFloat(ctx.request.body.price.trim())
        let condition =parseFloat(ctx.request.body.condition.trim())
        let user_name = ctx.request.body.user_name.trim()
        let books_sums = parseInt(ctx.request.body.books_sums.trim())
        let smallSort = ctx.request.body.smallSort[1].trim()
        let books_author = ctx.request.body.books_author.trim()
        let press = ctx.request.body.press.trim()
        let is_exchange = parseInt(ctx.request.body.is_exchange)

        let buy_year = parseInt(ctx.request.body.buy_year)
        let is_write = parseInt(ctx.request.body.is_write)
        let is_lack = parseInt(ctx.request.body.is_lack)
        let is_sells = parseInt(ctx.request.body.is_sells)
        let is_taste = parseInt(ctx.request.body.is_taste)
        let is_changeColor = parseInt(ctx.request.body.is_changColor)

        let books_id = await Models.books_info.max('books_id')+1;
        let secprice = parseFloat(ctx.request.body.secprice.trim())

        let sort_id = await Models.small_sort.findOne({
            where:{
                small_sort_name : smallSort
            }
        })
        let small_sort_id = sort_id.small_sort_id
        let books = await Models.books_info.findOne({
            where:{
                user_name:user_name,
                books_name:books_name,
                condition:condition,
                is_write:is_write,
                is_lack:is_lack,
                is_sells:is_sells,
                is_taste:is_taste,
                is_changeColor:is_changeColor,
                is_exchange:is_exchange
            }
        })
        let users = await  Models.user_info.findOne({
            where:{
                user_name:user_name,
            }
        })

        if(picture == ''){
            return ctx.body={
                status:'2',
                msg:'请上传图片',
                result:''
           }
        }

        else if(books){
            let sum = books_sums + books.books_sums
            console.log(sum);
            let res = Models.books_info.update({
                books_sums : sum
            },{
                where:{
                    user_name:user_name,
                    books_name:books_name,
                    condition:condition,

                }
            })
            return ctx.body={
                status:'3',
                msg:'原有卖家书籍加一',
                result:''
            }
        }
        else if(!users){
            return ctx.body={
                status:'1',
                msg:'卖家不存在',
                result:''
            }
        }
        else {

           let [err,res] = await handlerAsyncError(Models.books_info.create({
                books_id : books_id,
                user_name : user_name,
                books_name : books_name,
                intro : intro,
                picture : picture,
                small_sort_id : small_sort_id,
                price : price,
                secprice : secprice,
                condition : condition,
                books_sums :books_sums,
                books_author :books_author,
                press :press,
                is_exchange:is_exchange,
                buy_year:buy_year,
                is_write:is_write,
                is_lack:is_lack,
                is_sells:is_sells,
                is_taste:is_taste,
                is_changeColor:is_changeColor
           }))

            if(err){
                ctx.response.status = 500;
                return ctx.body={
                    status:'1',
                    msg:err.message,
                    result:''
                }
            }
            ctx.body = {
                status: '0',
                msg: '',
                result: 'add success'
            }
        }
})

//删除商品
BooksRouter.post('/delete', async ctx =>{
    let books_id = ctx.request.body.books_id
    let [err,rs] = await handlerAsyncError(Models.books_info.destroy({
        where:{
            books_id: books_id
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

    ctx.body = {
        status: '0',
        msg: '',
        result: 'del success'
    }
})

//更新商品
BooksRouter.post('/update', async ctx =>{


    if(ctx.request.body.books_name == null){
        const file = ctx.request.files.file; // 获取上传文件
        // 创建可读流
        const reader = fs.createReadStream(file.path);
        let books_id = await Models.books_info.max('books_id')+1;
        file.name = books_id + file.name
        let filePath = path.join(__dirname, './../public/img') + `/${file.name}`;
        // 创建可写流
        const upStream = fs.createWriteStream(filePath);
        // 可读流通过管道写入可写流
        reader.pipe(upStream);
        return ctx.body = {
            msg:'图片上传成功',
            picPath: file.name,
            picPath1: file.path
        };
    }
    console.log(ctx.request.body);
    let books_name = ctx.request.body.books_name.trim()
    let intro = ctx.request.body.intro.trim()
    let picture = ctx.request.body.picture.trim()
    let price = parseFloat(ctx.request.body.price)
    let condition =parseFloat(ctx.request.body.condition.trim())
    let user_name = ctx.request.body.user_name.trim()
    let books_sums = parseInt(ctx.request.body.books_sums)
    let smallSort = ctx.request.body.smallSort[1].trim()
    let books_author = ctx.request.body.books_author.trim()
    let press = ctx.request.body.press.trim()


    let books_id = ctx.request.body.books_id
    let secprice = price * (condition*0.1)-(10-condition)*3

    let sort_id = await Models.small_sort.findOne({
        where:{
            small_sort_name : smallSort
        }
    })
    let small_sort_id = sort_id.small_sort_id
    let users = await  Models.user_info.findOne({
        where:{
            user_name:user_name,
        }
    })

    if(picture == ''){
        return ctx.body={
            status:'2',
            msg:'请上传图片',
            result:''
        }
    }

    else if(!users){
        return ctx.body={
            status:'1',
            msg:'卖家不存在',
            result:''
        }
    }
    else {
        let [err,res] = await handlerAsyncError(Models.books_info.update({
            user_name : user_name,
            books_name : books_name,
            intro : intro,
            picture : picture,
            small_sort_id : small_sort_id,
            price : price,
            secprice : secprice,
            condition : condition,
            books_sums :books_sums,
            books_author :books_author,
            press :press,
        },{
            where:{
                books_id:books_id
            }
        }))

        if(err){
            ctx.response.status = 500;
            return ctx.body={
                status:'1',
                msg:err.message,
                result:''
            }
        }
        ctx.body = {
            status: '0',
            msg: '更新成功',
            result: 'update success'
        }
    }
})

//推荐查询
BooksRouter.get('/bookSelect',async ctx =>{
    let name = ctx.query.name
    console.log(ctx.query);
    if(name == ''){
        let res = await Models.books_info.findAll({
            raw:true,
            limit:10,
            order:[
                ['books_name','DESC']
            ],

        })
        return ctx.body = {
            data:res
        }
    }else {
        let res = await Models.books_info.findAll({
            raw:true,
            limit:10,
            order:[
                ['books_name','DESC']
            ],
            where:{
                books_name:{
                    [Op.like]:'%' +name + '%'
                }
            },
            as:'value',

        })
        return ctx.body = {
            data:res
        }
    }

})

//分页查询
BooksRouter.get('/selectPage',async ctx=>{
    let name = ctx.query.name
    let page = ctx.query.page || 1
    let prePage = parseInt(ctx.query.prepage) || 2
    let offset = (page-1)*prePage;
    let rs = await Models.books_info.findAndCountAll({
        limit:prePage,
        offset,
        where:{
            books_name:{
                [Op.like]:'%' +name + '%'
            }
        },
    })

    ctx.body = {
        code:0,
        count:rs.count,
        prePage,
        data:rs.rows.map(d =>{
            return {
                books_id: d.books_id,
                books_name:d.books_name,
                books_author:d.books_author,
                press:d.press,
                intro:d.intro,
                picture:d.picture,
                small_sort_id:d.small_sort_id,
                price:d.price,
                secprice:d.secprice,
                condition:d.condition,
                user_name:d.user_name,
                books_sums:d.books_sums
            }
        })
    }
})


//添加轮播图
BooksRouter.post('/addBanner', async ctx=> {
        if(ctx.request.body.title == null){
            let port_id = await  Models.port.max('port_id')
            port_id+=1
            const file = ctx.request.files.file; // 获取上传文件
            // 创建可读流
            const reader = fs.createReadStream(file.path);
            file.name = 'banner'+port_id + file.name
            let filePath = path.join(__dirname, './../public/img') + `/${file.name}`;
            // 创建可写流
            const upStream = fs.createWriteStream(filePath);
            // 可读流通过管道写入可写流
            reader.pipe(upStream);
            return ctx.body = {
                msg:'图片上传成功',
                picPath: file.name,
                picPath1: file.path
            };
        }
        let port_id = await  Models.port.max('port_id')
        port_id+=1
        let title = ctx.request.body.title
        let content = ctx.request.body.content
        let img = ctx.request.body.img
        let is_show= ctx.request.body.is_show || 0
        let rs ;
        try{
            rs = await Models.port.build({
                port_id : port_id,
                title : title,
                content: content,
                is_show : is_show,
                img:img
            }).save()
        }catch(error){
            return ctx.body = {
                status: '1',
                msg: error.message,
                result: '轮播图添加失败'
            }
        }
        if(rs){
            return ctx.body = {
                status: '0',
                msg: '添加成功',
            }
        }
})

//轮播图查询
BooksRouter.get('/bannerPage',async ctx=>{
    let page = ctx.query.page || 1
    let prePage = parseInt(ctx.query.prepage) || 10
    let offset = (page-1)*prePage;

    let rs = await Models.port.findAll({
        limit:prePage,
        offset,
    })

    ctx.body = {
        code:0,
        count:rs.count,
        prePage,
        data:rs
    }
})

//删除轮播图
BooksRouter.post('/deleteBanner', async ctx =>{
    let port_id = ctx.request.body.port_id
    let [err,rs] = await handlerAsyncError(Models.port.destroy({
        where:{
            port_id: port_id
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

    ctx.body = {
        status: '0',
        msg: '',
        result: 'del success'
    }
})

//更新轮播图展示
BooksRouter.post('/updateBanner', async ctx =>{
    let port_id = ctx.request.body.port_id
    let is_show = ctx.request.body.is_show
    console.log(ctx.request.body.is_show);
    let [err,res] = await handlerAsyncError(Models.port.update({
            is_show:is_show
        },{
            where:{
                port_id:port_id
            }
        }))
        if(err){
            ctx.response.status = 500;
            return ctx.body={
                status:'1',
                msg:err.message,
                result:''
            }
        }
        ctx.body = {
            status: '0',
            msg: '更新成功',
            result: 'update success'
        }

})

//添加广告
BooksRouter.post('/addAdvert', async ctx=> {
    if(ctx.request.body.content == null){

        const file = ctx.request.files.file; // 获取上传文件
        // 创建可读流
        const reader = fs.createReadStream(file.path);
        let n =Math.ceil(Math.random()*10)
        file.name = 'banner' + file.name + n
        let filePath = path.join(__dirname, './../public/img') + `/${file.name}`;
        // 创建可写流
        const upStream = fs.createWriteStream(filePath);
        // 可读流通过管道写入可写流
        reader.pipe(upStream);
        return ctx.body = {
            msg:'图片上传成功',
            picPath: file.name,
            picPath1: file.path
        };
    }
    let advert_id = await  Models.advert.max('advert_id')
    advert_id+=1
    let content = ctx.request.body.content
    let img = ctx.request.body.img
    let rs ;
    try{
        rs = await Models.advert.build({
            advert_id : advert_id,
            content: content,
            img:img
        }).save()
    }catch(error){
        return ctx.body = {
            status: '1',
            msg: error.message,
            result: '广告添加失败'
        }
    }
    if(rs){
        return ctx.body = {
            status: '0',
            msg: '添加成功',
        }
    }
})

//查询广告
BooksRouter.get('/advertPage',async ctx=>{
    let page = ctx.query.page || 1
    let prePage = parseInt(ctx.query.prepage) || 10
    let offset = (page-1)*prePage;

    let rs = await Models.advert.findAll({
        limit:prePage,
        offset,
    })

    ctx.body = {
        code:0,
        count:rs.count,
        prePage,
        data:rs
    }
})

//删除广告
BooksRouter.post('/deleteAdvert', async ctx =>{
    let advert_id = ctx.request.body.advert_id
    let [err,rs] = await handlerAsyncError(Models.advert.destroy({
        where:{
            advert_id: advert_id
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

    ctx.body = {
        status: '0',
        msg: '',
        result: 'del success'
    }
})

//好书推荐
BooksRouter.get('/recommendBook',async (ctx,next)=>{
        let is_exchange = ctx.query.is_exchange || 0
        let rs = await Models.books_info.findAll({
            limit:10,

            where:{
                is_exchange:is_exchange,
                books_sums:{
                    [Op.gt]: 0
                },
                is_write:0,
                is_lack:0,
                is_sells:0,
                is_taste:0,
                is_changeColor:0
            },
            order: Models.sequelize.random()
        })

        ctx.body = {
            code:0,
            data:rs
        }
    }
)

//新书推荐
BooksRouter.get('/newBook',async (ctx,next)=>{
        let is_exchange = ctx.query.is_exchange || 0
        let rs = await Models.books_info.findAll({
            limit:10,
            where:{
                is_exchange:is_exchange,
                books_sums:{
                    [Op.gt]: 0
                },
                condition:'10'
            },
            order: Models.sequelize.random()
        })

        ctx.body = {
            code:0,
            data:rs
        }
    }
)


//添加广告
BooksRouter.post('/addActivity', async ctx=> {

    let activity_id = await  Models.activity.max('activity_id')
    activity_id+=1
    let title = ctx.request.body.title
    let port_id = ctx.request.body.port_id
    let books_id = ctx.request.body.books_id

    let rs ;
    try{
        rs = await Models.activity.build({
            activity_id : activity_id,
            title: title,
            port_id:port_id,
            books_id:books_id,

        }).save()
    }catch(error){
        return ctx.body = {
            status: '1',
            msg: error.message,
            result: '活动添加失败'
        }
    }
    if(rs){
        return ctx.body = {
            status: '0',
            msg: '添加成功',
        }
    }
})

//获取活动
BooksRouter.get('/activity',async (ctx,next)=>{
        let port_id = ctx.query.port_id || 1
        let rs = await Models.activity.findAll({
            where:{
                port_id:port_id,
            },

            include:[{
                model:Models.books_info
            }]
        })

        ctx.body = {
            code:0,
            data:rs
        }
    }
)
//获取活动title分类
BooksRouter.get('/activityTitle',async (ctx,next)=>{
    let port_id = ctx.query.port_id || 1
    let rs = await Models.activity.findAll({
        where:{
            port_id:port_id,
        },
        group:'title',
    })

    ctx.body = {
        code:0,
        data:rs
    }
})

//活动列表
BooksRouter.get('/activityList',async (ctx,next)=>{
        let rs = await Models.activity.findAll({
            group:'port_id',
            include:[{
                model:Models.port
            }]
        })

        ctx.body = {
            code:0,
            data:rs
        }
    }
)

//删除活动
BooksRouter.post('/deleteActivity', async ctx =>{
    let activity_id = ctx.request.body.activity_id
    let [err,rs] = await handlerAsyncError(Models.activity.destroy({
        where:{
            activity_id: activity_id
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

    ctx.body = {
        status: '0',
        msg: '',
        result: 'del success'
    }
})

//轮播id查询
BooksRouter.get('/portId',async ctx=>{

    let rs = await Models.port.findAll({
        group:'port_id'
    })

    ctx.body = {
        code:0,
        count:rs.count,
        data:rs
    }
})





//获取小说大类所有小类书籍数量
BooksRouter.get('/sortSum',async ctx=>{
    let arr = []
    let j = 0
    for(let i = 1001;i<1018;i++){
        let rs = await Models.books_info.sum('books_sums',{
            where:{
                small_sort_id: i,
                is_check:1
            }
        })
        let sort = await Models.small_sort.findOne({
            where:{
                small_sort_id: i,
            }
        })
        if(!isNaN(rs)){
            arr[j] = {
                small_sort_name:sort.small_sort_name,
                sum:rs
            }
            j+=1
        }

    }

    ctx.body = {
        code:0,
        data:arr
    }

})

//书籍总量
BooksRouter.get('/allBooksSum',async ctx=>{
    let res = await Models.books_info.sum('books_sums',{
        where:{
            is_check:1
        }
    })
    ctx.body = {
        code:0,
        data:res
    }
})

//用户人数
BooksRouter.get('/allUserSum',async ctx=>{
    let res = await Models.user_info.findAll()
    ctx.body = {
        code:0,
        data:res.length
    }
})

//订单总数数
BooksRouter.get('/allOrderSum',async ctx=>{
    let res = await Models.order_info.findAll({
            where:{
                send:1
            }
        }
    )
    ctx.body = {
        code:0,
        data:res.length
    }
})

//获取评论前三活跃人
BooksRouter.get('/topThreeMessage',async ctx=>{
    let users = await Models.user_info.findAll({
        attributes:[
            'user_name'
        ]
    })

    let users_messages = []
    let d = 0



     for(let i =0;i<users.length;i++){
         let rs =await Models.message_info.findAndCountAll({
             where:{
                 user_name:users[i].user_name
             }
         })
          if(rs.rows.length!=0){
              users_messages[d] = {
                  user_name:users[i].user_name,
                  sum:rs.count
              }
              d+=1
          }

     }
     for(let i =0 ;i<users_messages.length;i++){
         for (let j = 0;j<users_messages.length;j++){
             if(users_messages[i].sum>users_messages[j].sum){
                 let tem = users_messages[j]
                 users_messages[j] = users_messages[i]
                 users_messages[i] = tem
             }
         }
    }
     //取前三
    users_messages = users_messages.slice(0,3)
    console.log(users_messages);


    ctx.body = {
        code:0,
        data:users_messages
    }
})

//获取卖书前三
BooksRouter.get('/topSell',async ctx=>{
    let users = await Models.user_info.findAll({
        attributes:[
            'user_name'
        ]
    })

    let users_books = []
    let d = 0



    for(let i =0;i<users.length;i++){
        let rs =await Models.books_info.findAndCountAll({
            where:{
                user_name:users[i].user_name
            }
        })
        if(rs.rows.length!=0){
            users_books[d] = {
                value:rs.count,
                name:users[i].user_name
            }
            d+=1
        }

    }
    for(let i =0 ;i<users_books.length;i++){
        for (let j = 0;j<users_books.length;j++){
            if(users_books[i].sum>users_books[j].sum){
                let tem = users_books[j]
                users_books[j] = users_books[i]
                users_books[i] = tem
            }
        }
    }
    //取前三
    users_books = users_books.slice(0,3)
    console.log(users_books);


    ctx.body = {
        code:0,
        data:users_books
    }
})



module.exports = BooksRouter;


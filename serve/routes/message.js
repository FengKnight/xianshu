const MessageRouter = require('koa-router')();
const Models = require('../models')
const {Sequelize:{Op} } = Models.sequelize
const { handlerAsyncError } = require('../utils/index')
const path = require('path')
const fs= require('fs')

//查询评论
MessageRouter.get('/messages',async ctx=>{
    let page = ctx.query.page || 1
    let prePage =10
    let offset = (page-1)*10;
    let rs = await Models.message_info.findAndCountAll({
        limit:prePage,
        offset:offset,
        order:[
            ["message_id","desc"]
        ]
    })

    ctx.body = {
        code:0,
        count:rs.count,
        prePage,
        data:rs.rows
    }
})

//查询个人评论
MessageRouter.get('/profile',async ctx=>{
    let page = ctx.query.page || 1
    let prePage =ctx.query.prePage || 2
    let offset = (page-1)*prePage;
    console.log(page);

    let rs = await Models.message_info.findAndCountAll({
        limit:prePage,
        offset:offset,
        where:{
            user_name:ctx.session.username
        },
        order:[
            ["message_id","desc"]
        ]
    })

    ctx.body = {
        code:0,
        count:rs.count,
        prePage,
        data:rs.rows
    }
})

//发表评论
MessageRouter.post('/add',async ctx=>{
    let content = ctx.request.body.content

    let message_id = await Models.message_info.max('message_id')
    if(isNaN(message_id)){
        message_id = 1
        let rs;
        try{
            rs = await Models.message_info.build({
                message_id:message_id,
                user_name:ctx.session.username,
                mes_content:content,
            }).save()
        }catch (err){
            return ctx.body = {
                status: '1',
                msg: err.message,
                result: '发表评论失败'
            }
        }
        if(rs){
            return ctx.body = {
                status: '0',
                msg: '发表评论成功',
            }
        }
    }
    else {
        message_id += 1;
        let rs;
        try{
            rs = await Models.message_info.build({
                message_id:message_id,
                user_name:ctx.session.username,
                mes_content:content,
            }).save()
        }catch (err){
            return ctx.body = {
                status: '1',
                msg: err.message,
                result: '发表评论失败'
            }
        }
        if(rs){
            return ctx.body = {
                status: '0',
                msg: '发表评论成功',
            }
        }
    }
})

//删除评论
MessageRouter.get('/deleteMessage',async ctx =>{
    let message_id = ctx.query.message_id
    let rs,res;
    try{
        rs = await Models.message_info.destroy({
            where:{
                message_id:message_id
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

//回复评论
MessageRouter.post('/reAdd',async ctx=>{
    let content = ctx.request.body.content
    let message_id = ctx.request.body.message_id
    let return_id = await Models.messageReturn.max('return_id')
    if(isNaN(return_id)){
        return_id = 1
        let rs;
        try{
            rs = await Models.messageReturn.build({
                message_id:message_id,
                return_id:return_id,
                user_name:ctx.session.username,
                re_content:content,
            }).save()
        }catch (err){
            return ctx.body = {
                status: '1',
                msg: err.message,
                result: '发表评论失败'
            }
        }
        if(rs){
            return ctx.body = {
                status: '0',
                msg: '发表评论成功',
            }
        }
    }
    else {
        return_id += 1;
        let rs;
        try{
            rs = await Models.messageReturn.build({
                message_id:message_id,
                return_id:return_id,
                user_name:ctx.session.username,
                re_content:content,
            }).save()
        }catch (err){
            return ctx.body = {
                status: '1',
                msg: err.message,
                result: '回复评论失败'
            }
        }
        if(rs){
            return ctx.body = {
                status: '0',
                msg: '回复评论成功',
            }
        }
    }
})

//查询回复评论
MessageRouter.get('/reMessages',async ctx=>{
    let message_id = ctx.query.id
    let page = ctx.query.page || 1
    let prePage =10
    let offset = (page-1)*10;

    let rs = await Models.messageReturn.findAndCountAll({
        limit:prePage,
        offset:offset,
        where:{
            message_id :message_id
        }

    })

    ctx.body = {
        code:0,
        count:rs.count,
        prePage,
        data:rs.rows
    }
})

//删除回复评论
MessageRouter.get('/deleteReMessage',async ctx =>{
    let return_id = ctx.query.return_id
    let res;
    try{

        res  = await Models.messageReturn.destroy({
            where:{
                return_id:return_id
            }
        })
    }catch (err){
        return ctx.body = {
            status:'1',
            message:err.message
        }
    }
    if(res){
        return ctx.body= {
            status: '0',
            message:'删除成功'
        }
    }
})
module.exports = MessageRouter;


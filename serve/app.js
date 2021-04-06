const Koa = require('koa')
const KoaBodyParser = require('koa-bodyparser')
const router = require('./routes/index')
const session = require('koa-session')
const koaBody = require('koa-body'); //解析上传文件的插件
const cors = require('koa2-cors');
const path = require('path')
const staticFiles = require('koa-static')
const http = require('http');
const socketIO = require('socket.io');
const app = new Koa()
var server = require("http").createServer(app.callback());
// 初始化 socket
const io = socketIO(server, { cors: true }
);

let currentRoom = [];
let sellsName = [];
let users = [];
let nowRoom = '';
let nowUser = '';
const connectionList = {};
let historyMsg = []

io.on('connection',(socket) => {
    console.log('有人连接了');
    socket.on('hello',(data) => {
        let currentSell = data.sells_name
        nowRoom = ''
        for(let i =0;i<sellsName.length;i++){
            if(sellsName[i] == currentSell){
                nowRoom = currentRoom[i]
                console.log(nowRoom);
                break;
            }
        }
        if(nowRoom!=''){
            socket.join(nowRoom, function () {
                let obj = {
                    code:1,
                    msg:'连接成功'
                }
                socket.emit('message',obj)

            });
        }
        else {
            historyMsg[data.sells_name] = []
            let room = data.sells_name
            users.push(data.user_name)
            sellsName.push(room)
            currentRoom.push(socket.rooms)
            socket.join(room, function () {
                let obj = {
                    code:1,
                    msg:'连接成功，可离线发信息'
                }
                socket.emit('message',obj)

            });
        }


    })
    socket.on('talk',(data) => {


        nowUser = data.user_name;
        let currentSell = data.sells_name;
        for(let i =0;i<sellsName.length;i++){
            if(sellsName[i] == currentSell){
                nowRoom = currentRoom[i]
                break;
            }
        }
        let a = sellsName.filter(item => item == currentSell)
        if(a.length>0){
            socket.join(nowRoom, function () {
                console.log(socket.rooms);
                currentRoom.push(socket.rooms)
                let time = new Date()
                time = time.toLocaleString().substring(0, 17)
                let obj = {
                    code:2,
                    msg:time+"       "+nowUser+':'+data.msg
                }
                historyMsg[data.sells_name].push(time+"       "+nowUser+':'+data.msg)
                io.sockets.in(nowRoom).emit('message',obj)

                //socket.broadcast.emit('message',nowUser+':'+data.msg)
                //socket.emit('message',nowUser+':'+data.msg)
            });
        }else {
            socket.emit('message','未找到')
        }

    })
    socket.on('history',(data)=>{
        nowUser = data.user_name;
        let currentSell = data.sells_name;
        for(let i =0;i<sellsName.length;i++){
            if(sellsName[i] == currentSell){
                nowRoom = currentRoom[i]
                break;
            }
        }
        socket.join(nowRoom, function () {
            currentRoom.push(socket.rooms)
            let obj = {
                code:3,
                msg:historyMsg[data.sells_name]
            }
            io.sockets.in(nowRoom).emit('message',obj)

        });

    })
   /* socket.on('message', function (msg) {

        var room = Object.keys(socket.rooms)[1]; //这是当前socket的房间，这个对象设置得有点怪，但是事实如此。
        io.to(room).emit('message', msg);
        console.log(room);//打印出房间。
    });*/
});






const CONFIG = {
    key: 'koa:sess',   //cookie key (default is koa:sess)
    maxAge: 86400000,  // cookie的过期时间 maxAge in ms (default is 1 days)
    overwrite: true,  //是否可以overwrite    (默认default true)
    httpOnly: true, //cookie是否只有服务器端可以访问 httpOnly or not (default true)
    signed: true,   //签名默认true
    rolling: false,  //在每次请求时强行设置cookie，这将重置cookie过期时间（默认：false）
    renew: false,  //(boolean) renew session when session is nearly expired,
};


app.keys = ['this is my secret sesssion or password']
app.use(async (ctx, next)=> {
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    await next();
});
app.use(
    cors({
        origin: function(ctx) { //设置允许来自指定域名请求
            if (ctx.url === '/test') {
                return '*'; // 允许来自所有域名请求
            }
            return 'http://localhost:8080'; //只允许http://localhost:8080这个域名的请求
        },
        maxAge: 5, //指定本次预检请求的有效期，单位为秒。
        credentials: true, //是否允许发送Cookie
        allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], //设置所允许的HTTP请求方法'
        allowHeaders: ['Content-Type', 'Authorization', 'Accept','Access-Control-Allow-Origin'], //设置服务器支持的所有头信息字段
        exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'] //设置获取其他自定义字段
    })
);
app.use(session(CONFIG, app));
app.use(koaBody({
    multipart: true,
    formidable: {
        maxFileSize: 10000 * 1024 * 1024    // 设置上传文件大小最大限制，默认10M
    }
}))
app.use(staticFiles(path.join(__dirname ,'public')))
app.use(KoaBodyParser())
app.use(router.routes())
app.use(router.allowedMethods())


server.listen(8088,()=>{
    console.log("ws服务端")
})

app.listen(9000,()=>{
    console.log('服务器已启动')
});

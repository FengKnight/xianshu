const Router = require('koa-router');

const UserRouter = require('./userRouter')
const BooksRouter = require('./booksRouter')
const MessageRouter = require('./message')
const router = new Router()

router.use('/users',UserRouter.routes())
router.use('/books',BooksRouter.routes())
router.use('/message',MessageRouter.routes())

module.exports = router;
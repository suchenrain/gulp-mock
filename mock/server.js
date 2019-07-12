const jsonServer = require('json-server')
const db = require('./db.js')
const routes = require('./routes.js')
const port = 3000

const server = jsonServer.create()
const router = jsonServer.router(db)
const middlewares = jsonServer.defaults()
const rewriter = jsonServer.rewriter(routes)

server.use(middlewares)

server.use((req, res, next) => {
    req.method = 'GET';
    next();
})

server.use(rewriter)
server.use(router)

server.listen(port, () => {
    console.log('open mock server at loclhost:' + port)
})
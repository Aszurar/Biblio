const exprees = require('express')
const routes = exprees.Router();
const books = require('./app/controllers/books')
const home = require('./app/controllers/home')

routes.get('/', function(req, res){
    res.redirect('/index')
})

routes.get('/index', home.index)

routes.get('/books', books.index)
routes.get('/books/create', books.create)
routes.get('/books/:id', books.show)
routes.get('/books/:id/edit', books.edit)
routes.put('/books', books.put)
routes.post('/books', books.post)
routes.delete('/books', books.delete)

module.exports = routes
const exprees = require('express')
const routes = exprees.Router();
const books = require('./app/controllers/books')
const home = require('./app/controllers/home')

routes.get('/', function(req, res){
    res.redirect('/index')
})

routes.get('/index', home.index)

routes.get('/books', books.index)

module.exports = routes
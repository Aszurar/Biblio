const exprees = require('express')
const routes = exprees.Router();
const books = require('./app/controllers/books')
const home = require('./app/controllers/home')
const students = require('./app/controllers/students')

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

routes.get('/students', students.index)
routes.get('/students/create', students.create)

module.exports = routes
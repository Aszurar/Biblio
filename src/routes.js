const exprees = require('express')
const routes = exprees.Router();
const books = require('./app/controllers/books')
const home = require('./app/controllers/home')
const loans = require('./app/controllers/loans')
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
routes.get('/students/:id', students.show)
routes.post('/students', students.post)
routes.get('/students/:id/edit', students.edit)
routes.put('/students', students.put)
routes.delete('/students', students.delete)

routes.get('/loans', loans.index)
routes.get('/loans/create', loans.create)
routes.post('/loans', loans.post)
routes.get('/loans/:id', loans.show)
routes.get('/loans/:id/edit', loans.edit)
routes.put('/loans', loans.put)
routes.delete('/loans', loans.delete)

module.exports = routes
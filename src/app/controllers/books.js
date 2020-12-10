const Book = require("../models/Book")
const { classifications } = require("../../lib/tools")

module.exports = {
    index(req, res){
        let { filter, page, limit } = req.query
        // console.log(filter);
        // filter = String(filter)
        // quantidade  de páginas
        page = page || 1
        // limite de livros na página
        limit = limit || 6
        // 'indíce" dos livros estarão presentes naquela página
        offset = limit * (page - 1)

        const params = {
            filter,
            page,
            limit,
            offset,
            callback(books){
                // total é o total de páginas
                if (books != "") {
                    for (const book of books) {
                        book.genero = classifications(book.genero)
                    }

                    // se a pessoa filtrar escrevendo certo:
                    const pagination = {
                        total: Math.ceil(books[0].total / limit),
                        page
                    }
                
                    return res.render("books/index", { books, pagination, filter })

                } else {
                    // se a pessoa filtrar escrevendo errado:
                    const pagination = {
                        total: 0,
                        page
                    }

                    return res.render("books/index", { books, pagination, filter })
                } 
            }
        }

        Book.paginate(params)
    },

    create(req, res){
        const textInput = {
            title: 'Novo Livro'
        }

        return res.render('books/create', { textInput })
    },

    post(req, res){
        console.log(req.body);
        const keys = Object.keys(req.body)

        keys.forEach(key => {
            if(req.body[key] == ""){
                return res.send('Por favor, preencha todos os campos!')
            }
        })

        Book.create(req.body, function(book){
           return res.redirect(`/books/${book.id}`)
        })
    },

    show(req, res){

        Book.find(req.params.id, function(book){
            if (!book) return res.send('Livro não encontrado')
            
            book.genero = classifications(book.genero)

            return res.render(`books/show`, { book }) 
        })
    },

    edit(req, res){
        const textInput = {
            title: 'Editar Livro'
        }

        Book.find(req.params.id, function(book){
            if (!book) return res.send('Livro não encontrado!')
            
            return res.render('books/edit', { book, textInput })
        })
    },

    put(req, res){
        Book.update(req.body, function(){
            return res.redirect(`/books/${req.body.id}`)
        })
    },

    delete(req, res){
        Book.delete(req.body.id, function(){
            return res.redirect('/books')
        })
    }
}
const Book = require("../models/Book")


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
    }
}
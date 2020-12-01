const db = require('../../config/db')


module.exports = {

    paginate(params){
        const { filter, limit, offset, callback } = params
        
        // caso não tenha filtro, essa será a subquery:
        let query = "",
            filterQuery = "",
            // total de livros/itens
            totalQuery = `(SELECT count(*) FROM books) AS total`
        
        // caso o usuário filtre:
        if (filter) {
            // filtragem
            filterQuery = `WHERE books.name ILIKE '%${filter}%'
                           OR books.title ILIKE '%${filter}%'
                           OR books.autor ILIKE '%${filter}%'
                           OR books.isbn ILIKE '%${filter}%'
                           OR books.disciplina ILIKE '%${filter}%'
                           OR books.genero ILIKE '%${filter}%'`
            //total de livros/itens filtrados
            totalQuery = `(SELECT count(*) FROM books ${filterQuery}) AS total`
        }

        // query final para retornar todos os livros na página principal de livros
        // seja se estiver filtrado ou não e também buscando o total de livros/itens 
        // dessa busca para a lógica da paginação.
        query = `SELECT books.*, ${totalQuery} 
                 FROM books
                 ${filterQuery}
                 ORDER BY books.name ASC
                 LIMIT $1 OFFSET $2
                `

        db.query(query,[limit, offset], function(err, results){
            if (err) throw `Database error All function: ${err}`

            callback(results.rows)
        })

    }

}


// INSERT INTO books(
	// ISBN,
//   avatar,
//   name,
//   genero,
//   disciplina,
//   idioma,
//   quantidade,
 	// paginas
// ) VALUES ('978-8595084759', 'https://images-na.ssl-images-amazon.com/images/I/41UsJRucm4L._SX325_BO1,204,203,200_.jpg', 'O Senhor dos Anéis: A Sociedade do Anel', 'Aventura, Épico e Fantasia','História Medieval: A Idade das Trevas', 'Português(BR)', 52, 576)
// 
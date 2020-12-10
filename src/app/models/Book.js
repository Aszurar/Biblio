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

    },

    create(data, callback){

        const query = `
            INSERT INTO books(
                isbn,
                avatar,
                name,
                genero,
                disciplina,
                idioma,
                quantidade,
                paginas,
                title,
                autor
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
            RETURNING id
        `

        const values = [
            data.isbn,
            data.imagem,
            data.name,
            data.genero,
            data.disciplina,
            data.idioma,
            data.quantidade,
            data.paginas,
            data.title,
            data.autor
        ]

        console.log(values);

        db.query(query, values, function(err, results){
            if(err) throw`Database erro, Create function: ${err}`

            callback(results.rows[0])
        })
    },

    find(id, callback){
        const query = `SELECT * FROM books
                       WHERE id = $1`
        
        db.query(query, [id], function(err, results){
            if(err) throw `Database erro, Find function: ${err}`

            callback(results.rows[0])
        })
    },

    update(data, callback){
        const query = `UPDATE books SET
                            isbn = ($1),
                            avatar = ($2),
                            name = ($3),
                            genero = ($4),
                            disciplina = ($5),
                            idioma = ($6),
                            quantidade = ($7),
                            paginas = ($8),
                            title = ($9),
                            autor = ($10)
                        WHERE id = $11
                      `
        
        const values = [
                data.isbn,
                data.imagem,
                data.name,
                data.genero,
                data.disciplina,
                data.idioma,
                data.quantidade,
                data.paginas,
                data.title,
                data.autor,
                data.id
        ]

        db.query(query, values, function(err, results){
            if (err) throw `Database error, Update function: ${err}`
                console.log(results.rows[0]);
                
            return callback()
        })
    },
    
    delete(id, callback){
        const query = `DELETE FROM books
                       WHERE id = $1
                      `
        db.query(query, [id], function(err, results){
            if(err) throw `Database erro, Delete function: ${err}`
            
            return callback()
        })
    }
}


const db = require('../../config/db')

module.exports = {

    paginate(params){
        const { filter, limit, offset, callback } = params
        
        // caso não tenha filtro, essa será a subquery:
        let query = "",
            filterQuery = "",
            // total de estudantes/itens
            totalQuery = `(SELECT count(*) FROM students) AS total`
        
        // caso o usuário filtre:
        if (filter) {
            // filtragem
            filterQuery = `WHERE students.name ILIKE '%${filter}%'
                           OR students.matricula ILIKE '%${filter}%'
                          `
            //total de alunos/itens filtrados
            totalQuery = `(SELECT count(*) FROM students ${filterQuery}) AS total`
        }

        // query final para retornar todos os estudantes na página principal de estudantes
        // seja se estiver filtrado ou não e também buscando o total de estudantes/itens 
        // dessa busca para a lógica da paginação.
        query = `SELECT students.*, ${totalQuery} 
                 FROM students
                 ${filterQuery}
                 ORDER BY students.name ASC
                 LIMIT $1 OFFSET $2
                `

        db.query(query,[limit, offset], function(err, results){
            if (err) throw `Database error All function: ${err}`

            callback(results.rows)
        })

    },

    create(data, callback){

        const query = `
            INSERT INTO students(
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
        const query = `SELECT * FROM students
                       WHERE id = $1`
        
        db.query(query, [id], function(err, results){
            if(err) throw `Database erro, Find function: ${err}`

            callback(results.rows[0])
        })
    },

    update(data, callback){
        const query = `UPDATE students SET
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
            
            return callback()
        })
    },
    
    delete(id, callback){
        const query = `DELETE FROM students
                       WHERE id = $1
                      `
        db.query(query, [id], function(err, results){
            if(err) throw `Database erro, Delete function: ${err}`
            
            return callback()
        })
    }
}


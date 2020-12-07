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
        const query = `INSERT INTO students(
                            name,
                            avatar_url,
                            email,
                            serie,
                            matricula
                        ) VALUES ($1, $2, $3, $4, $5)
                        RETURNING id
                      `

        const values = [
            data.name,
            data.imagem,
            data.email,
            data.grades,
            data.matricula
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
                            name = ($1),
                            avatar_url = ($2),
                            email = ($3),
                            serie = ($4),
                            matricula = ($5)
                        WHERE id = $6
                      `
        const values = [
                data.name,
                data.imagem,
                data.email,
                data.grades,
                data.matricula,
                data.id
        ]

        db.query(query, values, function(err, results){
            if (err) throw `Database error, Update function: ${err}`
            
            callback()
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


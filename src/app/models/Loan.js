const db = require('../../config/db');
const { date } = require('../../lib/tools');

module.exports = {
    paginate(params){
        // aqui ficará toda lógica de filtragem de dados do index e da paginação
        const {filter, limit, offset, callback } = params

        // caso não tenha filtragem, esse será o padrão
        let query = "",
            filterQuery = "",
            totalQuery = `(SELECT count(*) FROM loans) AS total`

        // Se a pessoa filtrar, então essa é a lógica para que se tenha
         // o total de elementos filtrados
        if (filter) {
            filterQuery = ` WHERE loans.book_isbn ILIKE '%${filter}%'
                            OR loans.regis_student ILIKE '%${filter}%'
                          `
            totalQuery = `(SELECT count(*) FROM loans
                          ${filterQuery}
                          ) AS total
                         `
        }

        // a subquery está representada  pela variável totalQuery que 
        // trará o total de elementos se estiver filtrado ou não para
        // que a paginação ocorra
        query = `SELECT students.name AS students_name, books.title AS books_name, loans.*, ${totalQuery} 
                 FROM loans
                 LEFT JOIN students ON students.matricula = loans.regis_student
                 LEFT JOIN books ON books.isbn = loans.book_isbn
                 ${filterQuery}
                 ORDER BY loans.id ASC
                 LIMIT $1 OFFSET $2
                `

        db.query(query, [limit, offset], function(err, results){
            if (err) throw `Database error, index function: ${err}`

            callback(results.rows)
        })
    },

    create(data, callback){
        const query = `INSERT INTO loans(
                            book_isbn,
                            regis_student,
                            date,
                            final_date	
                            ) VALUES ($1, $2, $3, $4)
                       `
        const values = [
            data.isbn,
            data.matricula,
            date(Date.now()).iso,
            date(Date.now() + 2592000000).iso

        ]

        db.query(query, values, function(err, results){
            if(err) throw `Database error, create function: ${err}`

            callback(results.rows[0])
        })
    },

    findAll(id, callback){
        const query = ` SELECT loans.*, stu.avatar_url AS student_avatar, stu.name AS student_name, stu.email AS student_email, stu.serie AS student_serie,
                        bo.avatar AS book_avatar, bo.name AS book_name, bo.genero AS book_genero, bo.autor AS book_autor
                        FROM loans
                        LEFT JOIN students AS stu 
                        ON stu.matricula = loans.regis_student
                        LEFT JOIN books AS bo 
                        ON bo.isbn = loans.book_isbn
                        WHERE loans.id = $1
                      `
        const value = [id]

        db.query(query, value, function(err, results){
        if(err) throw `Database error, findALl function: ${err}`

            callback(results.rows[0])
        })
    },

    findEdit(id, callback){
        const query = `SELECT loans.*, stu.avatar_url AS student_avatar, bo.avatar AS book_avatar 
                       FROM loans
                       LEFT JOIN students AS stu 
                       ON stu.matricula =  loans.regis_student
                       LEFT JOIN books AS bo 
                       ON bo.isbn = loans.book_isbn
                       WHERE loans.id = $1
                      `
        const value = [id]

        db.query(query, value, function(err, results){
            if(err) throw `Database error, findEdit function: ${err}`

            callback(results.rows[0])
        })
    },

    update(data, callback){
        const query = `UPDATE loans SET
                            book_isbn = ($1),
                            regis_student = ($2)
                       WHERE id = $3 
                      `

        const values = [
                data.isbn,
                data.matricula,
                data.id
        ]

        db.query(query, values, function(err, results){
            if (err) throw `Database error, update function: ${err}`

            return callback()
        })
    },

    delete(id, callback){
        const query = `DELETE FROM loans
                       WHERE loans.id = $1
                      `
        const values = [id]
        
        db.query(query, values, function(err, results){
            if(err) throw `Database error, delete function!: ${err}`

            return callback()
        })
    }
}
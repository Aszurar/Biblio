const db = require('../../config/db')

module.exports = {
    all(callback){
        const query = `SELECT * FROM loans`

        db.query(query, function(err, results){
            if (err) throw `Database erro, all function: ${err}`

            callback(results.rows)
        })
    },

    findByISBN(isbn, callback){
        const query=`SELECT bo.avatar FROM books AS bo
                     WHERE  bo.isbn = $1      
                    `
        const value = [isbn]
        
        db.query(query, value, function(err, results){
            if (err) throw `Database erro, all function: ${err}`

            console.log(results.rows[0]);
            callback(results.rows[0])

        })
    }
}
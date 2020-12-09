const { classifications, nameTitle, grade, date } = require("../../lib/tools")
const Loan = require('../models/Loan')

// const text = {
    // titles: ["Avatar(URL):", "Nome completo:", "Matrícula:", "Email:", "Série:"],
    // grades: ["ano do Ensino Fundamental", "ano do Ensino Médio"],
    // save: "Salvar",
    // delete: "Deletar",
    // edit: "Editar"
// }   

module.exports = {
    index(req, res){
        Loan.all(function(loans){
            let booksAvatar = []

            for (let loan of loans) {
                loan.date = date(loan.date).format

                Loan.findByISBN(loan.isbn, function(bookAvatar){
                    booksAvatar.push(bookAvatar)
                })
            
            }

            return res.render("loans/index", { loans, booksAvatar })
        })
},

    create(req, res){
        const textTitle = {
            title: 'Novo Estudante'
        }

        return res.render('students/create', { textTitle, text})
    },

    post(req, res){
        console.log(req.body);
        const keys = Object.keys(req.body)

        keys.forEach(key => {
            if(req.body[key] == ""){
                return res.send('Por favor, preencha todos os campos!')
            }
        })

        Student.create(req.body, function(student){
           return res.redirect(`/students/${student.id}`)
        })
    },

    show(req, res){

        Student.find(req.params.id, function(student){
            if (!student) return res.send('Livro não encontrado')
            
            student.serie = grade(student.serie)
            const studentTitle = {
                title: nameTitle(student.name)
            }
            // student.genero = classifications(student.genero)

            return res.render(`students/show`, { student, text, studentTitle }) 
        })
    },

    edit(req, res){
        const textTitle = {
            title: 'Editar Livro'
        }

        Student.find(req.params.id, function(student){
            if (!student) return res.send('Livro não encontrado!')
            
            return res.render('students/edit', { student, textTitle, text })
        })
    },

    put(req, res){
        Student.update(req.body, function(){
            // console.log(student);
            return res.redirect(`/students/${req.body.id}`)
        })
    },

    delete(req, res){
        Student.delete(req.body.id, function(){
            return res.redirect('/students')
        })
    }
}
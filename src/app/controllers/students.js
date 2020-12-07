const Student = require('../models/Student')
const { classifications } = require("../../lib/tools")

const text = {
    titles: ["Avatar(URL)", "Nome completo:", "Matrícula:", "Email:", "Série:"],
    grades: ["ano do Ensino Fundamental", "ano do Ensino Médio"],
    save: "Salvar"
}   

module.exports = {
    index(req, res){
        let { filter, page, limit } = req.query
        // console.log(filter);
        // filter = String(filter)
        // quantidade  de páginas
        page = page || 1
        // limite de estudantes na página
        limit = limit || 8
        // 'indíce" dos estudantes estarão presentes naquela página
        offset = limit * (page - 1)

        const params = {
            filter,
            page,
            limit,
            offset,
            callback(students){
                // total é o total de páginas
                if (students != "") {
                    // for (const student of students) {
                        // student.genero = classifications(student.genero)
                    // }

                    // se a pessoa filtrar escrevendo certo:
                    const pagination = {
                        total: Math.ceil(students[0].total / limit),
                        page
                    }
                
                    return res.render("students/index", { students, pagination, filter })

                } else {
                    // se a pessoa filtrar escrevendo errado:
                    const pagination = {
                        total: 0,
                        page
                    }

                    return res.render("students/index", { students, pagination, filter })
                } 
            }
        }

        Student.paginate(params)
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

        student.create(req.body, function(student){
           return res.redirect('/students')
        })
    },

    show(req, res){

        student.find(req.params.id, function(student){
            if (!student) return res.send('Livro não encontrado')
            
            student.genero = classifications(student.genero)

            return res.render(`students/show`, { student }) 
        })
    },

    edit(req, res){
        const textInput = {
            title: 'Editar Livro'
        }

        student.find(req.params.id, function(student){
            if (!student) return res.send('Livro não encontrado!')
            
            return res.render('students/edit', { student, textInput })
        })
    },

    put(req, res){
        student.update(req.body, function(){
            return res.redirect(`/students/${req.body.id}`)
        })
    },

    delete(req, res){
        student.delete(req.body.id, function(){
            return res.redirect('/students')
        })
    }
}
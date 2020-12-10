const { classifications, nameTitle, grade, date } = require("../../lib/tools")
const Loan = require('../models/Loan')
const { creat, edit, home, show } = require("../../lib/info")

const text = {
    titles: ["Matricula do Aluno:", "ISBN do livro a ser Emprestado:"],
    save: "Salvar",
    delete: "Deletar",
    edit: "Editar"
}   

module.exports = {
    index(req, res){
        let { filter, page, limit } = req.query
        // console.log(filter);

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
            callback(loans){
                // total é o total de páginas
                if (loans != "") {
                    for (let loan of loans) {
                        loan.date = date(loan.date).format
                        loan.students_name = nameTitle(loan.students_name)
                        loan.final_date = date(loan.final_date).format
                    }

                    // se a pessoa filtrar escrevendo certo:
                    const pagination = {
                        total: Math.ceil(loans[0].total / limit),
                        page
                    }
                
                    return res.render("loans/index", { loans, pagination, filter, home })

                } else {
                    // se a pessoa filtrar escrevendo errado:
                    const pagination = {
                        total: 0,
                        page
                    }

                    return res.render("loans/index", { loans, pagination, filter, home })
                } 
            }
        }
        Loan.paginate(params)
},

    create(req, res){
        const textTitle = {
            title: 'Novo Empréstimo'
        }
        console.log(creat);
        return res.render('loans/create', { textTitle, text, creat})
    },

    post(req, res){
        console.log(req.body);
        const keys = Object.keys(req.body)

        keys.forEach(key => {
            if(req.body[key] == ""){
                return res.send('Por favor, preencha todos os campos!')
            }
        })

        Loan.create(req.body, function(loan){
           return res.redirect(`/loans`)
        })
    },

    show(req, res){
        Loan.findAll(req.params.id, function(loan){
            if (!loan) return res.send('Empréstimo não encontrado')

            loan.date = date(loan.date).format
            loan.student_serie = grade(loan.student_serie)
            loan.book_genero = classifications(loan.book_genero)
            loan.final_date = date(loan.final_date).format
            
            console.log(loan);
            return res.render(`loans/show`, { loan, text, show }) 
        })
    },

    edit(req, res){
        const textTitle = {
            title: 'Editar Empréstimo'
        }

        Loan.findEdit(req.params.id, function(loan){
            if (!loan) return res.send('Empréstimo não encontrado!')
            
            return res.render('loans/edit', { loan, textTitle, text, edit })
        })
    },

    put(req, res){
        Loan.update(req.body, function(){
            console.log(req.body);
            return res.redirect(`/loans`)
        })
    },

    delete(req, res){
        Loan.delete(req.body.loan_id, function(){
            return res.redirect('/loans')
        })
    }
}



// seleção da página atual/visual
// endereço da página atual
const body = document.querySelector('.body')
const currentPage = location.pathname;
// pegar todos links
const links = document.querySelectorAll('.links a')

// ativar determinada classe quando for o link for clicado
links.forEach( link => {
    if (currentPage.includes(link.getAttribute('href'))) {
        link.classList.add('active')
    }

    if (currentPage.includes('students')) {
        console.log(currentPage.includes('students'));
        body.classList.add('active')
    }  
});



// selecedPage: página atual
// totalpages: total de páginas
// Ela irá retornar um vetor com a página atual, 2 páginas antes, 2 após
// e as páginas iniciais e finais:
// ex: [1, ..., 13, 14, 15, 16, 17, ... 20]
function paginate(selectedPage, totalPages) {
    let pages = [],
        oldPage

    for (let currentPage = 1; currentPage <= totalPages; currentPage++) {
        const firstAndLastPage = currentPage == 1 || currentPage == totalPages
        const pagesAfterSelectedPage = currentPage <= selectedPage + 2
        const pagesBeforeSelectedPage = currentPage >= selectedPage - 2

        if (firstAndLastPage || pagesBeforeSelectedPage && pagesAfterSelectedPage) {
            // Lógica dos "..." na paginação
            // se a diferença da pagina anterior com a página atual for maior que 2
            // então adicione o "..."  após o pagesAfterSelected
            if (oldPage && currentPage - oldPage > 2) {
                pages.push("...")
            }

            // Caso seja igual a 2, então mostre o número anterior ao último elemento
            if (oldPage && currentPage - oldPage == 2) {
                pages.push(oldPage + 1)
            }

            // adicionando a página atual
            pages.push(currentPage)

            oldPage = currentPage
        }

    }

    return pages

}

const pagination = document.querySelector(".pagination")

    // pegando os dados de quantidade de páginas e da página atual do back-end
    // e apresentando na tela(front-end)
    const page = Number(pagination.dataset.page)
    const total = Number(pagination.dataset.total)
    const filter = pagination.dataset.filter
    const pages = paginate(page, total)

    console.log(filter);

    // console.log(pages);

    let elements = ""

    for (let page of pages) {
        if (String(page).includes("...")) {
            elements += `<span>${page}</span>`
        } else {
            if ( filter ) {
                elements += `<a href="?page=${page}&filter=${filter}">${page}</a>`    
            } else{
                elements += `<a href="?page=${page}">${page}</a>`    

            }

        }

    }

    // console.log(pagination.innerHTML);
    // console.log(elements);
    pagination.innerHTML = elements
    // console.log(pagination.innerHTML);

// }



// if (pagination) {
// 
    // createPagination(paginate)
// 
// }


const students = document.querySelectorAll('.student-card')

students.forEach(student => {
    let grade = student.querySelector(".grade")

    if (Number(grade.innerHTML) <= 3) {
        let tempHTML = grade.innerHTML + "º E.M."
        grade.classList.add('orange')
        grade.innerHTML = tempHTML
    } else {
        grade.classList.add('coral')
        grade.innerHTML = grade.innerHTML + "º E.F."
    }
});
module.exports = {
    nameTitle(fullname){
        let fullNameArray = fullname.split(" ")
        let nameTitle = fullNameArray[0] + " " + fullNameArray[1]
        
        return nameTitle
    
    },

    grade(grades){
        let grade; 

        // console.log(`grade: ${grades}`);
        if (grades >= 5) {
            grade = grades + "º ano"
        } else {
            grade = grades + "º ano do Ensino Médio"
        }
       
        return grade;
    },

    classifications(classification) {
        // console.log(classes);
        if (Array.isArray(classification)) {
            return classification
        }

        let subjects;

        let re = /\b,|\be/;
        subjects = classification.split(re);

        return subjects;
    },

    date(timestamp) {
        const date = new Date(timestamp);

        //UTC - configuração para que ao pegar o ano, o mês e o dia da data timestamp seja a data universal e não seja 
        //interferida pela data local

        const year = date.getUTCFullYear();
        const month = `0${date.getUTCMonth() + 1}`.slice(-2);
        const day = `0${date.getUTCDate()}`.slice(-2);

        return {
            day,
            month,
            year,
            iso: `${year}-${month}-${day}`,
            birthDay: `${day}/${month}`,
            format: `${day}/${month}/${year}`
        };
    },
}
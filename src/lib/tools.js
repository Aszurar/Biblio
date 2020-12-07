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
    }
}
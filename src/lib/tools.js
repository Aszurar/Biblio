module.exports = {
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
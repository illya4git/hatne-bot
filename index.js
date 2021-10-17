require('dotenv').config();
const db = require('./modules/db.js');

db.addSubject('Russian Literature')
    .then(() => {
        db.getSubjects()
            .then((res) => {
                db.addLesson(0, 51, 1, "None, YAY <3")
                    .then(() => {
                        db.getLessons()
                            .then(console.log);
                    });
            });
    });
const { get } = require('http');
const sqlite3 = require('sqlite3');
const util = require('util');

let db = new sqlite3.Database('./main.db');
const run = util.promisify(db.run).bind(db);
const all = util.promisify(db.all).bind(db);

db.run('PRAGMA foreign_keys = ON')
  .run(`CREATE TABLE IF NOT EXISTS subjects (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL)`)
  .run(`CREATE TABLE IF NOT EXISTS lessons (
    date INTEGER NOT NULL,
    subject_id INTEGER NOT NULL,
    number INTEGER NOT NULL,
    homework TEXT,
    PRIMARY KEY (date, number),
    FOREIGN KEY (subject_id) REFERENCES subjects (id))`);

module.exports = {
    addSubject: async (name) =>
        await run('INSERT INTO subjects(name) VALUES(?)', [name]),
    getSubjects: async () =>
        await all('SELECT id, name FROM subjects'),
    addLesson: async (date, subjectId, number, homework) =>
        await run('INSERT INTO lessons(date, subject_id, number, homework) VALUES(?, ?, ?, ?)', [date, subjectId, number, homework]),
    getLessons: async (from, to) =>
        await all(`SELECT les.date AS date, les.number AS number, les.homework AS homework, subj.name AS subject_name
                   FROM lessons AS les INNER JOIN subjects AS subj ON les.subject_id = subj.id`)
}
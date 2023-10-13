const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./patients.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
    db.run(`
      CREATE TABLE IF NOT EXISTS patients (
        patient_id INTEGER PRIMARY KEY AUTOINCREMENT,
        patient_name TEXT,
        heart_rate INTEGER,
        body_temp REAL,
        patient_freq_sickness TEXT
      );
    `);
  }
});

module.exports = db;

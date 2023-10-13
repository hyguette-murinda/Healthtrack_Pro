const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();
app.use(bodyParser.json());

// Create a new patient record
app.post('/patients', (req, res) => {
  const { patient_name, heart_rate, body_temp, patient_freq_sickness } = req.body;
  const sql = 'INSERT INTO patients (patient_name, heart_rate, body_temp, patient_freq_sickness) VALUES (?, ?, ?, ?)';
  
  db.run(sql, [patient_name, heart_rate, body_temp, patient_freq_sickness], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: 'Patient record created successfully',
      data: {
        patient_id: this.lastID,
      },
    });
  });
});

// Retrieve all patients
app.get('/patients', (req, res) => {
  const sql = 'SELECT * FROM patients';
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: 'Patients retrieved successfully',
      data: rows,
    });
  });
});

// Retrieve a specific patient by ID
app.get('/patients/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM patients WHERE patient_id = ?';
  db.get(sql, [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: 'Patient retrieved successfully',
      data: row,
    });
  });
});

// Update a patient's data
app.put('/patients/:id', (req, res) => {
  const { id } = req.params;
  const { patient_name, heart_rate, body_temp, patient_freq_sickness } = req.body;
  const sql = 'UPDATE patients SET patient_name = ?, heart_rate = ?, body_temp = ?, patient_freq_sickness = ? WHERE patient_id = ?';
  
  db.run(sql, [patient_name, heart_rate, body_temp, patient_freq_sickness, id], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: 'Patient record updated successfully',
      changes: this.changes,
    });
  });
});

// Delete a patient's data
app.delete('/patients/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM patients WHERE patient_id = ?';
  
  db.run(sql, [id], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: 'Patient record deleted successfully',
      changes: this.changes,
    });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

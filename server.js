const express = require('express');
const fs = require('fs');
const path = require('path');
const notesData = require('./db/db.json');
// npm package generates a unique id
var uniqid = require('uniqid');

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.static('public'));

// Retrieves previously created data
app.get('/api/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './db/db.json'));
});

// Retrieves notes.html file
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/notes.html'));
});


// Pushes new note to existing data and returns newly written file
app.post('/api/notes', (req, res) => {
  // Read the existing data from db.json
  const dbPath = path.join(__dirname, 'db', 'db.json');
  fs.readFile(dbPath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading db.json: ', err);
      return res.status(500).json({ error: 'Failed to read database' });
    }

    // Parse the existing data and add the new note
    const notes = JSON.parse(data);
    const { title, text } = req.body;
    let newNote;
    if (title && text) {
      // Variable for the object we will save
      newNote = {
        title,
        text,
        id: uniqid(),
      };

      notes.push(newNote);
    };

    // Write the updated data back to db.json
    fs.writeFile(dbPath, JSON.stringify(notes, null, 2), (err) => {
      if (err) {
        console.error('Error writing to db.json', err);
        return res.status(500).json({ error: 'Failed to write to database' });
      }
      const response = {
        status: 'success',
        body: newNote,
      };

      console.log(response);
      return res.status(201).json({ message: 'Note added successfully', note: newNote });

    }
    );
  });

});

app.get('*', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));


app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
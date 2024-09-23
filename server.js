const express = require('express');
const path = require('path');
const notesData = require('./db/db.json');


const app = express();
const PORT = 3001;

app.use(express.static('public'));


// app.get('/', (req, res) => res.send('Navigate to /send or /routes'));

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.get('/api/notes', (req, res) => {
  res.json(notesData);
});

app.get('*', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));

app.post('/api/notes', (req, res) => {
    // Let the client know that their POST request was received
    res.json(`${req.method} request received`);
    
})

app.listen(PORT, () =>
    console.log(`Example app listening at http://localhost:${PORT}`)
  );
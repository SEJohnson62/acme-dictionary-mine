const express = require('express');
const path = require('path');
const app = express();
const db = require('./db');
app.use(require('cors')());
// middlewear
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.get('/',(req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
})
app.use(express.json());

//READ
app.get('/api/nouns', (req, res, next) => {
  db.readNouns()
    .then( nounz => res.send(nounz))
    .catch(next);
});
app.get('/api/verbs', (req, res, next) => {
  db.readVerbs()
    .then( verbz => res.send(verbz))
    .catch(next);
});
app.get('/api/adjectives', (req, res, next) => {
  db.readAdjectives()
    .then( adjectivez => res.send(adjectivez))
    .catch(next);
});

//CREATE
app.post('/api/nouns', (req, res, next) => {
  db.createNouns()
    .then( word => res.send(word))
    .catch(next);
});
app.post('/api/verbs', (req, res, next) => {
  db.createVerbs()
    .then( word => res.send(word))
    .catch(next);
});
app.post('/api/adjectives', (req, res, next) => {
  db.createAdjectives()
    .then( word => res.send(word))
    .catch(next);
});

//DELETE
app.delete('/api/nouns/:id', (req, res, next) => {
  db.deleteNoun(req.body)
    .then( word => res.send(word) )
    .catch(next);
})
app.delete('/api/verbs/:id', (req, res, next) => {
  db.deleteVerb(req.body)
    .then( word => res.send(word) )
    .catch(next);
})
app.delete('/api/adjectives/:id', (req, res, next) => {
  db.deleteAdjective(req.body)
    .then( word => res.send(word) )
    .catch(next);
})

const port = process.env.PORT || 3000;
db.sync()
  .then(()=> {
    console.log('synced');
    app.listen(port, ()=> console.log(`listening on port ${port}`));
  })
  .catch(ex=>console.log(ex));

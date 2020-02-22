const express = require('express');
//const path = require('path');
const app = express();
const db = require('./db');

  app.use(require('cors')());
  app.use(express.json());
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
  app.post('/api/nouns', (req, res, next)  => {
    db.createNouns(req.body)
      .then( word => res.send(word))
      .catch(next);
  });
  app.post('/api/verbs', (req, res, next)  => {
    db.createVerbs(req.body)
      .then( word => res.send(word))
      .catch(next);
  });
  app.post('/api/adjectives', (req, res, next)  => {
    db.createAdjectives(req.body)
      .then( word => res.send(word))
      .catch(next);
  });
  const port = process.env.PORT || 3000;
  db.sync()
    .then(()=> {
      console.log('synced');
      app.listen(port, ()=> console.log(`listening on port ${port}`));
    })

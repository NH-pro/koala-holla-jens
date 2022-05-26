const express = require('express');
const koalaRouter = express.Router();
const pool = require('../modules/pool');
// waiting for  modules folder to me made...

// DB CONNECTION


// GET
koalaRouter.get('/', (req, res) => {
  let queryText = 'SELECT * FROM "koalas" ORDER BY "name";';
  pool.query(queryText).then(result => {
    res.send(result.rows);
    console.log('in koalaRouter', result.rows);
  })
  .catch(error => {
    console.log('error getting koalas', error);
    res.sendStatus(500);
  });
});

// POST


// PUT


// DELETE

module.exports = koalaRouter;
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
koalaRouter.post('/', (req, res) => {
  console.log(`IN THE POST ROUTE`, req.body)
  const query = `
  INSERT INTO "koalas" ("name", "gender", "age", "ready_to_transfer", "notes")
  VALUES ($1, $2, $3, $4, $5);
  `;
  const sqlParams = [req.body.name, req.body.gender, req.body.age, req.body.readyForTransfer, req.body.notes];
  
  pool.query(query, sqlParams)
  .then(() => {
    console.log(`POST went THROUGH`)
    res.sendStatus(201);
  })
  .catch((error) => {
    console.log(`ERROR in POST`, error)
    res.sendStatus(500);
  })
});

// PUT


// DELETE
koalaRouter.delete('/:koala', (req,res) => {
let koalaId = req.params.koala;
console.log('in router.delete', koalaId);

const sqlQuery = `
  DELETE FROM "koalas"
  WHERE "id" = $1;
`;

const sqlParams = [koalaId];

pool.query(sqlQuery,sqlParams)
  .then(() => {
    console.log('in delete pool.query.then')
    res.sendStatus(201);
  })
  .catch((err) => {
    console.log('delete failed WTF',err);
    res.sendStatus(500);
  });
});

koalaRouter.put('/:koala', (req, res) => {
  console.log('in router.put');

  const sqlQuery = `
    UPDATE "koalas"
    SET "ready_to_transfer" = $2
    WHERE "id" = $1;
  `;

  const sqlParams = [
    req.params.koala,
    req.body.ready_to_transfer
  ];

  pool.query(sqlQuery, sqlParams)
  .then(() => {
    console.log('in update pool.query.then');
    res.sendStatus(201);
  })
  .catch((err) => {
    console.log('PUT update failed WTF', err);
    res.sendStatus(500);
  });
});


module.exports = koalaRouter;
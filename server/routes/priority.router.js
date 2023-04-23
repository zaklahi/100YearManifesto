const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
  const queryText = `
    SELECT "category".* FROM "priority" JOIN "category" ON "priority"."category_id" = "category"."id" 
    WHERE "user_id" = $1 ORDER BY "rank";
  `;
  pool.query(queryText, [req.user.id] ).then((result) => {
    console.log(result.rows);
    if(result.rows.length === 0) {
      // No results found, return category list
      const queryText2 = 'SELECT * FROM "category" ORDER BY "id";';
      pool.query(queryText2 ).then((result) => {
        console.log(result.rows);
        res.send(result.rows);
      }).catch((err) => {
        console.log('err w get request', err);
        res.sendStatus(500);
      });
    } else {
      res.send(result.rows);
    }
  }).catch((err) => {
    console.log('err w get request', err);
    res.sendStatus(500);
  });
});

router.put('/', (req, res) => {
  console.log('this is req.body from router', req.body)
    const entry = req.body;
    const sqlParams = [ entry.rank, entry.category_id, req.user.id]
    const sqlText = `
      -- First try to do an insert
      INSERT INTO "priority" ("rank", "category_id", "user_id")
      VALUES ($1, $2, $3)
      -- Check for existing values
      ON CONFLICT("category_id", "user_id")
      -- If existing values, update instead
      DO UPDATE SET "rank" = $1;
    `;
    pool.query(sqlText, sqlParams )
        .then((result) => {
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log(`Error making database query ${sqlText}`, error);
            res.sendStatus(500);
        });
  });


  module.exports = router;
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


// PUT questionsComplete to TRUE
router.put('/', (req, res) => {
  console.log('questionsComplete router.PUT');
  console.log('is authenticated?', req.isAuthenticated());
  console.log('user', req.user);
  // only do PUT if authenticated:
  if (req.isAuthenticated()){
    let id = req.user.id;
    const queryText = `UPDATE "user" SET "questionsComplete" = true WHERE id = $1;`;
    pool.query(queryText, [id]).then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        console.log('questionsComplete PUT ERROR:', error);
        res.sendStatus(500);
    });
  } else {
      res.sendStatus(403);
  }
});


module.exports = router;
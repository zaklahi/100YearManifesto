const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


// GET ALL from "user" table
router.get('/', (req, res) => {
  console.log('userlist GET');
  console.log('is authenticated?', req.isAuthenticated());
  console.log('user', req.user);
  // only do GET if authenticated:
  if (req.isAuthenticated() && req.user.admin){
      let queryText = `SELECT * FROM "user";`;
      pool.query(queryText).then((result) => {
          res.send(result.rows);
      }).catch((error) => {
          console.log('userlist GET ERROR:', error);
          res.sendStatus(500);
      });
  } else {
      res.sendStatus(403);
  }
});



module.exports = router;
const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

router.get("/", (req, res) => {
  const query = `SELECT "ideal_week".*, "category"."name" AS "category_name", "priority".rank AS "rank"

                   FROM "ideal_week"
                   JOIN "priority" ON "ideal_week"."category_id"= "priority"."category_id"
                   JOIN "category" ON "ideal_week"."category_id" = "category"."id"
                   WHERE "ideal_week"."user_id" = $1 AND "priority"."user_id" = $1
                    ORDER BY "start_time" ASC;`;
  const sqlParams = [req.user.id];

  pool
    .query(query, sqlParams)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log(`Error making database query ${query}`, error);
      res.sendStatus(500);
    });
});

router.post("/", (req, res) => {
  const userId = req.user.id;
  const entry = req.body;
  const sqlText = `INSERT INTO "ideal_week" ("user_id", "day", "start_time", "end_time", "category_id", "total_hours")
                     VALUES ($1, $2, $3, $4, $5, $6)
                     RETURNING "id";`;
  const sqlParams = [
    userId,
    entry.day,
    entry.start_time,
    entry.end_time,
    entry.category_id,
    entry.total_hours,
  ];
  pool
    .query(sqlText, sqlParams)
    .then((result) => {
      console.log(`Added entry to the database`, result.rows[0].id);
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log(`Error making database query ${sqlText}`, error);
      res.sendStatus(500);
    });
});

router.put("/", (req, res) => {
  const userId = req.user.id;
  const entry = req.body;
  const sqlText = `UPDATE "ideal_week" SET "user_id" = $1, "day" = $2, "start_time" = $3, "end_time" =$4, "category_id" = $5, "total_hours" = $6 WHERE "id" = $7
                     RETURNING "id";`;
  const sqlParams = [
    userId,
    entry.day,
    entry.start_time,
    entry.end_time,
    entry.category_id,
    entry.total_hours,
    entry.id,
  ];
  pool
    .query(sqlText, sqlParams)
    .then((result) => {
      console.log(`Added entry to the database`, result.rows[0].id);
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log(`Error making database query ${sqlText}`, error);
      res.sendStatus(500);
    });
});

router.delete("/:id", (req, res) => {
  console.log("hello from delete request!", req.params.id);
  const queryText = `DELETE from "ideal_week" WHERE id = ${req.params.id};`;
  pool
    .query(queryText)
    .then((result) => {
      console.log(result);
      res.sendStatus(204);
    })
    .catch((error) => {
      console.log("error making a query", error);
    });
});

module.exports = router;

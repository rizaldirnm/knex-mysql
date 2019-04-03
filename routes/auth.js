const express = require("express");
const router = express.Router();

router.get("/test", async (req, res) => {
  const users = await knex.select().table("users");
  res.json(users);
});

module.exports = router;

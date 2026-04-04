const express = require("express");

module.exports = (jobsCollection) => {
  const router = express.Router();

  router.get("/", async (req, res) => {
    try {
      const result = await jobsCollection.find().toArray();
      res.send(result);
    } catch (err) {
      res.status(500).send({ error: "Failed to fetch jobs" });
    }
  });

  return router; // ✅ THIS FIXES YOUR ERROR
};

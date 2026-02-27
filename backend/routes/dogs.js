const express = require('express');

module.exports = (Dog) => {
  const router = express.Router();

  router.get('/dogs', async (req, res) => {
    try {
      const dogs = await Dog.findAll();
      res.status(200).json(dogs);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.post('/dogs', async (req, res) => {
    try {
      const { name, breed, age } = req.body;
      const dog = await Dog.create({ name, breed, age });
      res.status(201).json(dog);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  return router;
};

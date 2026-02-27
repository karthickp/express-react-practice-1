const express = require('express');

module.exports = (Task) => {
  const router = express.Router();

  router.get('/tasks', async (req, res) => {
    try {
      const { status, sort = 'createdAt', order = 'dsc' } = req.query;

      const validStatus = ['open', 'done'];
      const validSort = ['createdAt', 'priority'];
      const validOrder = ['asc', 'dsc'];

      if (status !== undefined && !validStatus.includes(status)) {
        return res.status(400).json({ error: 'Invalid status. Use open or done.' });
      }

      if (!validSort.includes(sort)) {
        return res.status(400).json({ error: 'Invalid sort. Use createdAt or priority.' });
      }

      if (!validOrder.includes(order)) {
        return res.status(400).json({ error: 'Invalid order. Use asc or dsc.' });
      }

      const where = {};
      if (status) {
        where.status = status;
      }

      const tasks = await Task.findAll({
        where,
        order: [[sort, order === 'asc' ? 'ASC' : 'DESC']]
      });

      if (!tasks.length) {
        return res.status(404).json({ error: 'No tasks found.' });
      }

      return res.status(200).json(tasks);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });

  router.post('/tasks', async (req, res) => {
    try {
      const { title, priority, status = 'open' } = req.body;

      if (typeof title !== 'string' || title.trim() === '') {
        return res.status(400).json({ error: 'Title is required and must be non-empty.' });
      }

      if (
        priority !== undefined &&
        (!Number.isInteger(priority) || priority < 1 || priority > 5)
      ) {
        return res.status(400).json({ error: 'Priority must be an integer between 1 and 5.' });
      }

      if (!['open', 'done'].includes(status)) {
        return res.status(400).json({ error: 'Invalid status. Use open or done.' });
      }

      const taskPayload = {
        title: title.trim(),
        status
      };

      if (priority !== undefined) {
        taskPayload.priority = priority;
      }

      const task = await Task.create(taskPayload);

      if (!task) {
        return res.status(404).json({ error: 'Task not found.' });
      }

      return res.status(201).json(task);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  });

  router.patch('/tasks/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
        return res.status(400).json({ error: 'Invalid task id.' });
      }

      const bodyKeys = Object.keys(req.body || {});
      if (bodyKeys.length !== 1 || !bodyKeys.includes('status')) {
        return res.status(400).json({ error: 'Only status can be updated.' });
      }

      if (!['open', 'done'].includes(status)) {
        return res.status(400).json({ error: 'Invalid status. Use open or done.' });
      }

      const task = await Task.findByPk(id);
      if (!task) {
        return res.status(404).json({ error: 'Task not found.' });
      }

      task.status = status;
      await task.save();

      return res.status(200).json(task);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  });

  return router;
};

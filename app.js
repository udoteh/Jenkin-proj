// app.js
import express from 'express';
import { v4 as uuid } from 'uuid';

const app = express();
app.use(express.json());

const tasks = new Map();

// health check
app.get('/healthz', (_, res) => res.send('ok'));

// list tasks
app.get('/tasks', (req, res) => res.json([...tasks.values()]));

// create task
app.post('/tasks', (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: 'title is required' });
  const id = uuid();
  const task = { id, title, completed: false };
  tasks.set(id, task);
  res.status(201).json(task);
});

// delete task
app.delete('/tasks/:id', (req, res) => {
  const ok = tasks.delete(req.params.id);
  if (!ok) return res.status(404).json({ error: 'not found' });
  res.status(204).end();
});

// mark complete
app.patch('/tasks/:id/complete', (req, res) => {
  const task = tasks.get(req.params.id);
  if (!task) return res.status(404).json({ error: 'not found' });
  task.completed = true;
  res.json(task);
});

export default app;

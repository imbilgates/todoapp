import { createTodo, deleteTodo, getTodos, toggleTodo, updateTodo } from '../controllers/todoController.js';
import express from 'express';

const router = express.Router();

// Get all todos
router.get('/', getTodos);
router.post('/', createTodo);
router.put('/:id', updateTodo);
router.delete('/:id', deleteTodo);
router.patch('/:id', toggleTodo);

export default router;
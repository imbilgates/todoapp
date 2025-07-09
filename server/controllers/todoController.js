import Todo from "../models/todo.js";

const getTodos = async (req, res) => {
    try {
    const  todos = await Todo.find({}).sort({ createdAt: -1 });
    res.status(200).json(todos);
    }catch(error){
        console.error('Error fetching todos', error);
        res.status(500).json({ error: 'Internal Server Error '});
    }
}

const createTodo = async (req, res) => {
    const { title } = req.body;

    if (!title) {
        return res.status(400).json({ error: 'Title is required' });
    }

    const newTodo = new Todo({
        title,
        completed: false
    })

    try {
        const savedTodo = await newTodo.save()
        res.status(201).json(savedTodo);
    } catch (error) {
        console.error('Error creating todo:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

}

const updateTodo = async (req, res) =>{
    const { id } = req.params;
    const { title, completed } = req.body;
    if (!title) {
        return res.status(400).json({ error: 'Title is required' });
    }
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(id, {
            title,
            completed
        }, { new: true });  
        if (!updatedTodo) {
            return res.status(404).json({ error: 'Todo not found' });
        }
        res.status(200).json(updatedTodo);
    } catch (error) {
        console.error('Error updating todo:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

}

const deleteTodo = async (req, res) => {
    const { id } = req.params;
    try {

        const deletedTodo = await Todo.findByIdAndDelete(id);
        if (!deletedTodo) {
            return res.status(404).json({ error: 'Todo not found' });
        }
        res.status(200).json({ message: 'Todo deleted successfully' });
    } catch (error) {
        console.error('Error deleting todo:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const toggleTodo = async (req, res) => {

    const { id } = req.params;

    try {
        const todo = await Todo.findById(id);
        if (!todo) {
            return res.status(404).json({ error: 'Todo not found' });
        }
        todo.completed = !todo.completed;
        const updatedTodo = await todo.save();
        res.status(200).json(updatedTodo);
    } catch (error) {
        console.error('Error toggling todo:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export { getTodos, createTodo, updateTodo, deleteTodo, toggleTodo };
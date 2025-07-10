import React, { useContext } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { addTodo } from '@/services/TodoAPI';
import { TodoContext } from '@/context/TodoContext';
import { toast } from 'sonner';

const TodoInput = () => {

    const [todo, setTodo] = React.useState("");
    const [loading, setLoading] = React.useState(false);

    const { setTodos } = useContext(TodoContext);


    const handleCreateTodo = async (e) => {
        e.preventDefault();
        if (!todo.trim()) {
            toast.error('Please enter a todo');
            return;
        };

        try {
            setLoading(true);
            const createdTodo = await addTodo({ title: todo });
            setTodos((prev) => [...prev, createdTodo]);
            setTodo('');
            toast.success('Todo added!');
        } catch (error) {
            toast.error('Failed to add todo');
            console.error("Error creating todo:", error);
        } finally {
            setLoading(false);
        }
    };



    return (
        <form onSubmit={handleCreateTodo} className='flex gap-2'>
            <Input
                autoFocus
                placeholder="What's on your mind?"
                className='flex-1'
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
            />

            <Button type='submit' disabled={loading}>
                {loading ? 'Adding...' : 'Add'}
            </Button>
        </form>

    )
}

export default TodoInput
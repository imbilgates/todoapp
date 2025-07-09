import React, { useContext } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { addTodo } from '@/services/TodoAPI';
import { TodoContext } from '@/context/TodoContext';

const TodoInput = () => {

    const [todo, setTodo] = React.useState("");
    const { setTodos } = useContext(TodoContext);

    const handleCreateTodo = async (e) => {
        e.preventDefault();
        try {
            const createdTodo = await addTodo({ title: todo });
            setTodos((prevTodos) => [...prevTodos, createdTodo]);
        } catch (error) {
            console.error("Error creating todo:", error);
        }
    };

    return (
        <form onSubmit={handleCreateTodo} className='flex items-center gap-2 p-4 mb-4'>
            <Input
                onChange={(e) => setTodo(e.target.value)}
                value={todo}
            />
            <Button
                type='submit'
            >
                Add
            </Button>
        </form>
    )
}

export default TodoInput
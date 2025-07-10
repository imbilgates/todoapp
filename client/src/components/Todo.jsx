import React, { useContext } from 'react'
import TodoItem from './TodoItem'
import { TodoContext } from '@/context/TodoContext';
import TodoInput from './TodoInput';

const Todo = () => {

  const { todos } = useContext(TodoContext);

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-100 to-blue-100 p-6'>
      <div className='w-full max-w-md p-6 bg-white rounded-xl shadow-xl'>
        <h1 className='text-3xl font-semibold text-center mb-6 text-blue-600'>📝 To-Do List</h1>
        <TodoInput />
        <div className='mt-4 max-h-80 overflow-y-auto custom-scrollbar space-y-3'>
          {todos.length === 0 ? (
            <p className='text-gray-500 text-center'>No tasks yet. Add your first task above!</p>
          ) : (
            todos.map((todo) => (
              <TodoItem
                key={todo._id}
                id={todo._id}
                title={todo.title}
                completed={todo.completed}
              />
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default Todo
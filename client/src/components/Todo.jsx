import React, { useContext } from 'react'
import TodoItem from './TodoItem'
import { TodoContext } from '@/context/TodoContext';
import TodoInput from './TodoInput';

const Todo = () => {

  const { todos } = useContext(TodoContext);

  return (
    <div className='max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg'>
      <h1 className='text-2xl font-bold mb-4'>To-Do List</h1>
      <TodoInput />
      {
        todos.length === 0 ? (
          <p className='text-gray-500'>No tasks available. Please add some tasks.</p>
        ) : (
          todos.map((todo) =>
            <TodoItem
              key={todo._id}
              id={todo?._id}
              title={todo?.title}
              completed={todo?.completed} />
          )
        )
      }
    </div>
  )
}

export default Todo
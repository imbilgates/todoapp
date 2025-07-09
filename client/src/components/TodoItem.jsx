import React, { useContext, useState } from 'react'
import { Button } from './ui/button'
import { Checkbox } from './ui/checkbox'
import { Input } from './ui/input'
import { MdEditSquare } from "react-icons/md"
import { TbHttpDelete } from "react-icons/tb"
import { FaCheck, FaTimes } from "react-icons/fa"

import { deleteTodo, toggleTodo, updateTodo } from '@/services/TodoAPI'
import { TodoContext } from '@/context/TodoContext'

const TodoItem = ({ id, title, completed }) => {
  const { setTodos } = useContext(TodoContext)

  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(title)

  const handleToggle = async () => {
    try {
      const updatedTodo = await toggleTodo(id)
      setTodos((prev) =>
        prev.map((todo) => todo._id === updatedTodo._id ? updatedTodo : todo)
      )
    } catch (error) {
      console.error("Toggle failed", error)
    }
  }

  const handleDelete = async () => {
    try {
      await deleteTodo(id)
      setTodos((prev) => prev.filter((todo) => todo._id !== id))
    } catch (error) {
      console.error("Delete failed", error)
    }
  }

  const handleUpdate = async () => {
    if (!editTitle.trim()) return
    try {
      const updatedTodo = await updateTodo(id, { title: editTitle })
      setTodos((prev) =>
        prev.map((todo) => todo._id === updatedTodo._id ? updatedTodo : todo)
      )
      setIsEditing(false)
    } catch (error) {
      console.error("Update failed", error)
    }
  }

  const handleCancelEdit = () => {
    setEditTitle(title)
    setIsEditing(false)
  }

  return (
    <div className='flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow-md mb-4'>
      <div className='flex items-center gap-3 w-full' onDoubleClick={handleToggle}>
        <Checkbox
          className='mr-3'
          checked={completed}
          onCheckedChange={handleToggle}
        />

        {isEditing ? (
          <Input
            autoFocus
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="flex-1"
          />
        ) : (
          <span
            className={`text-gray-800 select-none flex-1 ${
              completed ? 'line-through text-muted-foreground' : ''
            }`}
          >
            {title}
          </span>
        )}
      </div>

      <div className='flex space-x-2 items-center'>
        {isEditing ? (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="text-green-600 hover:text-green-800"
              onClick={handleUpdate}
            >
              <FaCheck />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-red-500 hover:text-red-700"
              onClick={handleCancelEdit}
            >
              <FaTimes />
            </Button>
          </>
        ) : (
          <>
            <Button
              type="button"
              variant="ghost"
              className='text-blue-500 hover:text-blue-700'
              onClick={() => setIsEditing(true)}
            >
              <MdEditSquare className='inline-block' />
            </Button>
            <Button
              type="button"
              variant="ghost"
              className='text-red-500 hover:text-red-700'
              onClick={handleDelete}
            >
              <TbHttpDelete className='inline-block' />
            </Button>
          </>
        )}
      </div>
    </div>
  )
}

export default TodoItem

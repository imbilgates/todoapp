import React, { useContext, useState } from 'react';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { Input } from './ui/input';
import { MdEditSquare } from 'react-icons/md';
import { TbHttpDelete } from 'react-icons/tb';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { toast } from 'sonner';

import { deleteTodo, toggleTodo, updateTodo } from '@/services/TodoAPI';
import { TodoContext } from '@/context/TodoContext';
import { Loader } from '@/components/ui/Loader';

const TodoItem = ({ id, title, completed }) => {
  const { setTodos } = useContext(TodoContext);

  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);

  const [toggleLoading, setToggleLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);

  const handleToggle = async () => {
    try {
      setToggleLoading(true);
      const updated = await toggleTodo(id);
      setTodos((prev) => prev.map((t) => t._id === updated._id ? updated : t));
      toast.success(updated.completed ? 'Marked as done' : 'Marked as active');
    } catch (error) {
      toast.error('Toggle failed');
    } finally {
      setToggleLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setDeleteLoading(true);
      await deleteTodo(id);
      setTodos((prev) => prev.filter((t) => t._id !== id));
      toast.success('Deleted!');
    } catch (error) {
      toast.error('Delete failed');
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleUpdate = async () => {
    if (!editTitle.trim()) return;
    try {
      setUpdateLoading(true);
      const updated = await updateTodo(id, { title: editTitle });
      setTodos((prev) => prev.map((t) => t._id === updated._id ? updated : t));
      toast.success('Updated successfully!');
      setIsEditing(false);
    } catch (error) {
      toast.error('Update failed');
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setEditTitle(title);
    setIsEditing(false);
  };

  return (
    <div className='flex items-center justify-between px-4 py-3 bg-gray-50 border rounded-lg shadow-sm hover:shadow-md transition'>
      <div className='flex items-center gap-3 w-full min-w-0'>
        <Checkbox
          className='mt-0.5'
          checked={completed}
          disabled={toggleLoading}
          onCheckedChange={handleToggle}
        />

        {isEditing ? (
          <Input
            autoFocus
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="flex-1 border-none ring-0 focus:ring-0 focus:border-none focus:outline-none outline-none shadow-none truncate"
          />
        ) : (
          <span
            className={`flex-1 text-sm sm:text-base text-gray-800 select-none truncate ${
              completed ? 'line-through text-muted-foreground' : ''
            }`}
            title={title}
          >
            {title}
          </span>
        )}
      </div>

      <div className='flex items-center space-x-2 ml-3 flex-shrink-0'>
        {isEditing ? (
          <>
            <Button
              variant='ghost'
              size='icon'
              className='text-green-600'
              onClick={handleUpdate}
              disabled={updateLoading}
            >
              {updateLoading ? <Loader /> : <FaCheck />}
            </Button>
            <Button
              variant='ghost'
              size='icon'
              className='text-red-500'
              onClick={handleCancelEdit}
              disabled={updateLoading}
            >
              <FaTimes />
            </Button>
          </>
        ) : (
          <>
            <Button
              variant='ghost'
              size='icon'
              className='text-blue-500'
              onClick={() => setIsEditing(true)}
              disabled={deleteLoading || toggleLoading}
            >
              <MdEditSquare />
            </Button>
            <Button
              variant='ghost'
              size='icon'
              className='text-red-500'
              onClick={handleDelete}
              disabled={deleteLoading}
            >
              {deleteLoading ? <Loader /> : <TbHttpDelete />}
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default TodoItem;

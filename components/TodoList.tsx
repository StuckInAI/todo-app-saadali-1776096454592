'use client';

import { Todo } from '@/types';
import TodoItem from '@/components/TodoItem';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
}

export default function TodoList({ todos, onToggle, onDelete, onEdit }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div
        className="py-16 text-center animate-fade-in"
      >
        <div
          className="text-6xl mb-4 animate-bounce-in"
          style={{ display: 'inline-block' }}
        >
          📋
        </div>
        <p className="text-gray-400 text-lg font-medium">No tasks here!</p>
        <p className="text-gray-300 text-sm mt-1">Add a new task above to get started.</p>
      </div>
    );
  }

  return (
    <ul className="divide-y divide-gray-100 mt-2">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
}

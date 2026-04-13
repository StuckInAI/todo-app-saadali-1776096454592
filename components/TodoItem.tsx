'use client';

import { useState, useRef, useEffect } from 'react';
import { Todo } from '@/types';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
}

export default function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(todo.text);
  const [isVisible, setIsVisible] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [checkAnimating, setCheckAnimating] = useState(false);
  const itemRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    // Trigger entrance animation
    requestAnimationFrame(() => setIsVisible(true));
  }, []);

  const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editValue.trim()) return;
    onEdit(todo.id, editValue);
    setIsEditing(false);
  };

  const handleEditCancel = () => {
    setEditValue(todo.text);
    setIsEditing(false);
  };

  const handleEditKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      handleEditCancel();
    }
  };

  const handleToggle = () => {
    setCheckAnimating(true);
    setTimeout(() => setCheckAnimating(false), 350);
    onToggle(todo.id);
  };

  const handleDelete = () => {
    setIsRemoving(true);
    setTimeout(() => onDelete(todo.id), 200);
  };

  return (
    <li
      ref={itemRef}
      className="py-3 flex items-center gap-3 group"
      style={{
        transition: 'opacity 0.22s ease, transform 0.28s cubic-bezier(0.34,1.56,0.64,1)',
        opacity: isRemoving ? 0 : isVisible ? 1 : 0,
        transform: isRemoving
          ? 'translateX(12px) scale(0.97)'
          : isVisible
          ? 'translateY(0) scale(1)'
          : 'translateY(-8px) scale(0.97)',
      }}
    >
      {/* Checkbox */}
      <button
        onClick={handleToggle}
        style={{
          transition:
            'background-color 0.18s cubic-bezier(0.34,1.56,0.64,1), border-color 0.18s cubic-bezier(0.34,1.56,0.64,1), transform 0.18s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.18s ease',
        }}
        className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center active:scale-90 ${
          todo.completed
            ? 'bg-orange-500 border-orange-500 text-white shadow-md shadow-orange-200'
            : 'border-gray-300 hover:border-orange-400 hover:shadow-sm hover:shadow-orange-100'
        }`}
        aria-label={todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
      >
        {todo.completed && (
          <svg
            className={`w-3.5 h-3.5 ${
              checkAnimating ? 'animate-check-pop' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M5 13l4 4L19 7"
            />
          </svg>
        )}
      </button>

      {/* Text or Edit Form */}
      {isEditing ? (
        <form
          onSubmit={handleEditSubmit}
          className="flex-1 flex gap-2 animate-slide-in"
        >
          <input
            type="text"
            value={editValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditValue(e.target.value)}
            onKeyDown={handleEditKeyDown}
            style={{
              transition:
                'border-color 0.15s ease, box-shadow 0.15s ease',
            }}
            className="flex-1 px-3 py-1.5 rounded-lg border-2 border-orange-300 focus:border-orange-500 focus:outline-none focus:shadow-[0_0_0_3px_rgba(249,115,22,0.15)] text-gray-700 text-sm"
            autoFocus
          />
          <button
            type="submit"
            style={{
              transition:
                'background-color 0.15s ease, transform 0.18s cubic-bezier(0.34,1.56,0.64,1)',
            }}
            className="px-3 py-1.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-lg active:scale-95"
          >
            Save
          </button>
          <button
            type="button"
            onClick={handleEditCancel}
            style={{
              transition:
                'background-color 0.15s ease, transform 0.18s cubic-bezier(0.34,1.56,0.64,1)',
            }}
            className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-600 text-sm font-medium rounded-lg active:scale-95"
          >
            Cancel
          </button>
        </form>
      ) : (
        <span
          className="flex-1 text-base"
          style={{
            transition: 'color 0.2s ease, opacity 0.2s ease',
            color: todo.completed ? '#9ca3af' : '#374151',
            textDecoration: todo.completed ? 'line-through' : 'none',
            opacity: todo.completed ? 0.7 : 1,
          }}
        >
          {todo.text}
        </span>
      )}

      {/* Action buttons */}
      {!isEditing && (
        <div
          className="flex gap-1"
          style={{
            transition: 'opacity 0.18s ease, transform 0.18s cubic-bezier(0.34,1.56,0.64,1)',
          }}
        >
          <button
            onClick={() => setIsEditing(true)}
            style={{
              transition:
                'color 0.15s ease, background-color 0.15s ease, transform 0.18s cubic-bezier(0.34,1.56,0.64,1)',
            }}
            className="p-1.5 text-gray-400 hover:text-orange-500 hover:bg-orange-50 rounded-lg opacity-0 group-hover:opacity-100 active:scale-90"
            aria-label="Edit task"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </button>
          <button
            onClick={handleDelete}
            style={{
              transition:
                'color 0.15s ease, background-color 0.15s ease, transform 0.18s cubic-bezier(0.34,1.56,0.64,1)',
            }}
            className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg opacity-0 group-hover:opacity-100 active:scale-90"
            aria-label="Delete task"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      )}
    </li>
  );
}

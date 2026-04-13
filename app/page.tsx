'use client';

import { useState } from 'react';
import TodoForm from '@/components/TodoForm';
import TodoList from '@/components/TodoList';
import TodoFilter from '@/components/TodoFilter';
import { Todo, FilterType } from '@/types';

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');

  const addTodo = (text: string) => {
    if (!text.trim()) return;
    const newTodo: Todo = {
      id: Date.now().toString(),
      text: text.trim(),
      completed: false,
      createdAt: new Date(),
    };
    setTodos((prev) => [newTodo, ...prev]);
  };

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const editTodo = (id: string, newText: string) => {
    if (!newText.trim()) return;
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, text: newText.trim() } : todo
      )
    );
  };

  const clearCompleted = () => {
    setTodos((prev) => prev.filter((todo) => !todo.completed));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const activeTodosCount = todos.filter((t) => !t.completed).length;
  const completedTodosCount = todos.filter((t) => t.completed).length;

  return (
    <main className="min-h-screen py-12 px-4">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div
          className="text-center mb-10 animate-slide-in"
        >
          <h1
            className="text-5xl font-extrabold text-orange-500 tracking-tight mb-2"
            style={{
              display: 'inline-block',
              transition: 'transform 0.2s cubic-bezier(0.34,1.56,0.64,1)',
            }}
          >
            ✅ Todo App
          </h1>
          <p className="text-gray-500 text-lg">Stay organized and get things done</p>
        </div>

        {/* Card */}
        <div
          className="bg-white rounded-3xl shadow-2xl overflow-hidden"
          style={{
            animation: 'slide-in 0.38s cubic-bezier(0.34,1.56,0.64,1) 0.05s both',
          }}
        >
          {/* Add Todo Form */}
          <div className="p-6 border-b border-gray-100">
            <TodoForm onAdd={addTodo} />
          </div>

          {/* Filter Tabs */}
          <div className="px-6 pt-4">
            <TodoFilter
              currentFilter={filter}
              onFilterChange={setFilter}
              activeTodosCount={activeTodosCount}
              completedTodosCount={completedTodosCount}
              totalCount={todos.length}
            />
          </div>

          {/* Todo List */}
          <div className="px-6 pb-4">
            <TodoList
              todos={filteredTodos}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
              onEdit={editTodo}
            />
          </div>

          {/* Footer */}
          {todos.length > 0 && (
            <div
              className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between animate-fade-in"
            >
              <span
                className="text-sm text-gray-500"
                style={{ transition: 'opacity 0.2s ease' }}
              >
                {activeTodosCount === 0
                  ? 'All tasks complete! 🎉'
                  : `${activeTodosCount} task${
                      activeTodosCount !== 1 ? 's' : ''
                    } remaining`}
              </span>
              {completedTodosCount > 0 && (
                <button
                  onClick={clearCompleted}
                  style={{
                    transition:
                      'color 0.15s ease, transform 0.18s cubic-bezier(0.34,1.56,0.64,1)',
                  }}
                  className="text-sm text-red-400 hover:text-red-600 font-medium active:scale-95"
                >
                  Clear completed ({completedTodosCount})
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

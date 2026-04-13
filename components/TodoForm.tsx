'use client';

import { useState } from 'react';

interface TodoFormProps {
  onAdd: (text: string) => void;
}

export default function TodoForm({ onAdd }: TodoFormProps) {
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    onAdd(inputValue);
    setInputValue('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <input
        type="text"
        value={inputValue}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder="What needs to be done?"
        style={{
          transition:
            'border-color 0.18s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.18s cubic-bezier(0.34,1.56,0.64,1), transform 0.18s cubic-bezier(0.34,1.56,0.64,1)',
          transform: isFocused ? 'scale(1.012)' : 'scale(1)',
          boxShadow: isFocused ? '0 0 0 3px rgba(249,115,22,0.15)' : '0 0 0 0px rgba(249,115,22,0)',
        }}
        className={`flex-1 px-4 py-3 rounded-xl border-2 focus:outline-none text-gray-700 placeholder-gray-400 text-base ${
          isFocused ? 'border-orange-400' : 'border-gray-200'
        }`}
      />
      <button
        type="submit"
        disabled={!inputValue.trim()}
        style={{
          transition:
            'background-color 0.15s ease, transform 0.18s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.18s ease, opacity 0.15s ease',
        }}
        className="px-5 py-3 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-semibold rounded-xl flex items-center gap-2 text-base active:scale-95 hover:shadow-md hover:shadow-orange-200"
      >
        <span
          style={{
            display: 'inline-block',
            transition: 'transform 0.18s cubic-bezier(0.34,1.56,0.64,1)',
          }}
          className="text-lg leading-none"
        >
          +
        </span>
        Add
      </button>
    </form>
  );
}

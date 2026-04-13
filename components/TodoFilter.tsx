'use client';

import { FilterType } from '@/types';

interface TodoFilterProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  activeTodosCount: number;
  completedTodosCount: number;
  totalCount: number;
}

export default function TodoFilter({
  currentFilter,
  onFilterChange,
  activeTodosCount,
  completedTodosCount,
  totalCount,
}: TodoFilterProps) {
  const filters: { label: string; value: FilterType; count: number }[] = [
    { label: 'All', value: 'all', count: totalCount },
    { label: 'Active', value: 'active', count: activeTodosCount },
    { label: 'Completed', value: 'completed', count: completedTodosCount },
  ];

  return (
    <div className="flex gap-1 mb-4">
      {filters.map((f) => (
        <button
          key={f.value}
          onClick={() => onFilterChange(f.value)}
          className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
            currentFilter === f.value
              ? 'bg-orange-500 text-white shadow-sm'
              : 'text-gray-500 hover:bg-gray-100'
          }`}
        >
          {f.label}
          {f.count > 0 && (
            <span
              className={`ml-1.5 inline-flex items-center justify-center w-5 h-5 text-xs rounded-full ${
                currentFilter === f.value ? 'bg-orange-400 text-white' : 'bg-gray-200 text-gray-600'
              }`}
            >
              {f.count}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}

import React, { useMemo } from 'react';
import { format, subMonths, startOfMonth, isSameMonth } from 'date-fns';
import { Calendar } from 'lucide-react';
import type { JournalEntry } from '../types';

interface DateFilterProps {
  onTimeFrameChange: (timeFrame: 'all' | 'week' | 'month' | 'year') => void;
  onMonthSelect: (date: Date | null) => void;
  selectedTimeFrame: string;
  selectedMonth: Date | null;
  entries: JournalEntry[];
}

export function DateFilter({
  onTimeFrameChange,
  onMonthSelect,
  selectedTimeFrame,
  selectedMonth,
  entries
}: DateFilterProps) {
  const availableMonths = useMemo(() => {
    const months = new Set<string>();
    entries.forEach(entry => {
      const date = new Date(entry.createdAt);
      months.add(format(date, 'yyyy-MM'));
    });
    return Array.from(months)
      .map(dateStr => new Date(dateStr))
      .sort((a, b) => b.getTime() - a.getTime());
  }, [entries]);

  const timeFrames = [
    { id: 'week', label: 'This Week' },
    { id: 'month', label: 'This Month' },
    { id: 'year', label: 'This Year' },
  ];

  return (
    <div className="flex flex-wrap items-center gap-4 bg-white p-4 rounded-lg shadow-sm">
      <div className="flex items-center gap-2">
        <Calendar className="w-5 h-5 text-gray-500" />
        <span className="text-sm font-medium text-gray-700">Filter by:</span>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {timeFrames.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => {
              onTimeFrameChange(id as any);
              onMonthSelect(null);
            }}
            className={`px-3 py-1.5 rounded-md text-sm ${
              selectedTimeFrame === id && !selectedMonth
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {availableMonths.length > 0 && (
        <select
          value={selectedMonth ? format(selectedMonth, 'yyyy-MM') : ''}
          onChange={(e) => {
            const value = e.target.value;
            onMonthSelect(value ? new Date(value) : null);
            onTimeFrameChange('all');
          }}
          className="px-3 py-1.5 rounded-md text-sm bg-gray-100 text-gray-700 hover:bg-gray-200 cursor-pointer"
        >
          <option value="">Select Month</option>
          {availableMonths.map(date => (
            <option key={format(date, 'yyyy-MM')} value={format(date, 'yyyy-MM')}>
              {format(date, 'MMMM yyyy')}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}
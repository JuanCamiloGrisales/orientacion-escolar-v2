"use client";
import { Search } from 'lucide-react';
import { useState } from 'react';
import StudentList from './StudentList';
import UpcomingEvents from './UpcomingEvents';

const MainContent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState('General');
  const tabs = ['General', 'Orientación', 'Prevención', 'Intervención'];

  const normalizeText = (text: string): string => {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .split('')
      .sort()
      .join('')
      .trim();
  };

  return (
    <main className="flex-1 p-8 flex flex-col bg-gray-50/50">
      {/* Header with gradient background */}
      <header className="w-full mb-8 rounded-2xl bg-gradient-to-br from-white to-gray-50 shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Panel de Control</h1>
        <div className="relative w-full max-w-lg">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-indigo-400" />
          <input
            type="text"
            placeholder="Buscar alumno..."
            className="pl-12 pr-4 py-3 border-2 border-indigo-100 rounded-xl w-full bg-white shadow-sm 
                     focus:outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 
                     transition-all duration-200"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </header>

      {/* Content Area */}
      <div className="flex gap-8 flex-1">
        {/* Left Column */}
        <div className="flex-[3] flex flex-col">
          <div className="flex space-x-3 mb-6 bg-white p-2 rounded-xl shadow-sm">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`px-6 py-2.5 rounded-lg transition-all duration-200 font-medium
                  ${tab === selectedTab
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-50'
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <StudentList searchTerm={normalizeText(searchTerm)} selectedTab={selectedTab} />
        </div>

        {/* Right Column */}
        <div className="flex-1">
          <UpcomingEvents />
        </div>
      </div>
    </main>
  );
};

export default MainContent;
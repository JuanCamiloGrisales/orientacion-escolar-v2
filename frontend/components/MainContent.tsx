"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Bell, Search } from 'lucide-react';
import { useState } from 'react';
import PatientList from './StudentList';

const MainContent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState('General');
  const tabs = ['General', 'Orientación', 'Prevención', 'Intervención'];


  return (
    <main className="flex-1 p-8">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar alumno"
              className="pl-10 pr-4 py-2 border rounded-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <Avatar>
            <AvatarImage src="/placeholder.svg?height=32&width=32" />
            <AvatarFallback>AG</AvatarFallback>
          </Avatar>
        </div>
      </header>

      {/* Tabs */}
      <div className="flex space-x-4 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded-full ${tab === selectedTab ? 'bg-indigo-600 text-white' : 'text-gray-600'}`}
            onClick={() => setSelectedTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Patients List */}
      <PatientList searchTerm={searchTerm} selectedTab={selectedTab} />
    </main>
  );
};

export default MainContent;
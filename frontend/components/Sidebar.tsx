"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import {
  Home,
  Users,
  User,
  BookOpen,
  BarChart,
  FileText,
  Settings,
  HelpCircle,
  LogOut,
  GraduationCap, // Añadido para Profesores
  Layers // Añadido para Departamentos
} from 'lucide-react';


const Sidebar: React.FC = () => {
  const [activeItem, setActiveItem] = useState<string>('Inicio');

  const menuItems = [
    { label: 'Inicio', icon: Home, href: '/' },
    { label: 'Registro de Atención', icon: FileText, href: '/registro-de-atencion' },
    { label: 'Profesores', icon: GraduationCap, href: '/profesores' },
    { label: 'Departamentos', icon: Layers, href: '/departamentos' },
    { label: 'Empleados', icon: Users, href: '/empleados' },
    { label: 'Biblioteca', icon: BookOpen, href: '/biblioteca' },
    { label: 'Analíticas', icon: BarChart, href: '/analiticas' },
    { label: 'Facturas', icon: FileText, href: '/facturas' },
    { label: 'Informes', icon: FileText, href: '/informes' },
  ];

  const otherMenuItems = [
    { label: 'Settings', icon: Settings, href: '/settings' },
    { label: 'Help & Support', icon: HelpCircle, href: '/help-and-support' },
    { label: 'Logout', icon: LogOut, href: '/logout' },
  ];

  const handleItemClick = (item: string) => {
    setActiveItem(item);
  };

  return (
    <aside className="w-72 bg-white p-6 shadow-md h-full">
      <div className="flex items-center mb-8">
        <div className="w-8 h-8 bg-indigo-600 rounded-lg mr-2"></div>
        <div>
          <h2 className="font-bold text-lg">Amparo Garcés</h2>
          <p className="text-xs text-gray-500">Orientación Escolar</p>
        </div>
      </div>
      <nav>
        {menuItems.map((item) => (
          <Link key={item.label} href={item.href}>
            <div
              onClick={() => handleItemClick(item.label)}
              className={`flex items-center py-2 px-4 rounded-lg mb-1 ${activeItem === item.label ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.label}
            </div>
          </Link>
        ))}
      </nav>
      <div className="mt-auto">
        {otherMenuItems.map((item) => (
          <Link key={item.label} href={item.href}>
            <div
              onClick={() => handleItemClick(item.label)}
              className="flex items-center py-2 px-4 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.label}
            </div>
          </Link>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
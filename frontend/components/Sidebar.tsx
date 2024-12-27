"use client";
import { BarChart, FileText, Home, Settings } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

const Sidebar: React.FC = () => {
  const [activeItem, setActiveItem] = useState<string>("Inicio");

  const menuItems = [
    { label: "Inicio", icon: Home, href: "/" },
    { label: "Analíticas", icon: BarChart, href: "/analiticas" },
  ];

  const otherMenuItems = [
    { label: "Configuración", icon: Settings, href: "/settings" },
  ];

  const handleItemClick = (item: string) => {
    setActiveItem(item);
  };

  return (
    <aside className="w-72 min-w-[18rem] max-w-[18rem] bg-white p-6 shadow-lg h-full flex flex-col">
      <div className="mb-8">
        <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <span className="text-white text-xl font-bold">AG</span>
            </div>
            <div className="text-white">
              <h2 className="font-bold text-lg leading-tight">Amparo Garcés</h2>
              <p className="text-xs text-white/80">Orientación Escolar</p>
            </div>
          </div>
        </div>
      </div>

      <nav className="flex-1">
        {menuItems.map((item) => (
          <Link key={item.label} href={item.href}>
            <div
              onClick={() => handleItemClick(item.label)}
              className={`flex items-center py-3 px-4 rounded-xl mb-2 transition-all duration-200 ${
                activeItem === item.label
                  ? "bg-indigo-50 text-indigo-600 shadow-sm"
                  : "text-gray-600 hover:bg-gray-50 hover:scale-[1.02]"
              }`}
            >
              <item.icon
                className={`mr-3 h-5 w-5 ${
                  activeItem === item.label
                    ? "text-indigo-600"
                    : "text-gray-400"
                }`}
              />
              {item.label}
            </div>
          </Link>
        ))}
      </nav>

      <div className="pt-4 border-t border-gray-100">
        {otherMenuItems.map((item) => (
          <Link key={item.label} href={item.href}>
            <div
              onClick={() => handleItemClick(item.label)}
              className={`flex items-center py-3 px-4 rounded-xl transition-all duration-200 ${
                activeItem === item.label
                  ? "bg-gray-50 text-gray-800"
                  : "text-gray-600 hover:bg-gray-50 hover:scale-[1.02]"
              }`}
            >
              <item.icon className="mr-3 h-5 w-5 text-gray-400" />
              {item.label}
            </div>
          </Link>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;

import React, { useState } from "react";
import {
  FileText,
  Users,
  Crown,
  HelpCircle,
  MessageSquare,
  LayoutGrid,
} from "lucide-react";
import Sidebar from "../components/Sidebar";
import logo from '../assets/logo.png'

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const mobileTabItems = [
    { id: "overview", icon: LayoutGrid, label: "OVERVIEW" },
    { id: "feed", icon: FileText, label: "ALL FEED" },
    { id: "profiles", icon: Users, label: "PROFILES" },
  ];

  return (
    <div className="min-h-screen bg-zinc-900 text-white flex">
      {/* Sidebar (always left) */}
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main Section */}
      <div className="flex-1 flex flex-col">
        {/* Desktop Header */}
        <header className="hidden lg:flex items-center justify-between px-6 py-4 border-b border-zinc-800">
          {/* Breadcrumb (left side now, no logo/text) */}
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <span>DASHBOARD</span>
            <span>/</span>
            <span className="text-white capitalize">{activeTab}</span>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 px-4 py-2 bg-yellow-600 hover:bg-yellow-700 rounded-lg transition-colors">
              <Crown className="w-4 h-4" />
              <span className="text-sm font-medium">UPGRADE TO PREMIUM</span>
            </button>

            <button className="flex items-center space-x-2 px-4 py-2 text-gray-300 hover:text-white transition-colors">
              <HelpCircle className="w-4 h-4" />
              <span className="text-sm font-medium">HELP CENTER</span>
            </button>

            <button className="flex items-center space-x-2 px-4 py-2 text-gray-300 hover:text-white transition-colors">
              <MessageSquare className="w-4 h-4" />
              <span className="text-sm font-medium">FEEDBACK</span>
            </button>

            <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">M</span>
            </div>
          </div>
        </header>

        {/* Mobile Header */}
        <header className="lg:hidden flex items-center justify-between px-4 py-3 border-b border-zinc-800">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img
              src={logo} // <-- replace with your logo image path
              alt="Logo"
              className="w-8 h-8"
            />
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-1 px-3 py-1 bg-yellow-600 hover:bg-yellow-700 rounded text-xs font-medium transition-colors">
              <Crown className="w-3 h-3" />
              <span>UPGRADE</span>
            </button>

            <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">M</span>
            </div>
          </div>
        </header>

        {/* Mobile Tabs */}
        <div className="lg:hidden border-b border-zinc-800">
          <nav className="flex px-2 py-2 space-x-2">
            {mobileTabItems.map((item) => {
              const Icon = item.icon;
              const isActive = item.id === activeTab;

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-xs font-medium transition-colors ${
                    isActive
                      ? "bg-indigo-600 text-white"
                      : "bg-zinc-800 text-gray-400 hover:text-white"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Mobile Breadcrumb */}
        <div className="lg:hidden px-4 py-2 border-b border-zinc-800">
          <div className="flex items-center space-x-2 text-xs text-gray-400">
            <span>DASHBOARD</span>
            <span>/</span>
            <span className="text-white capitalize">{activeTab}</span>
          </div>
        </div>

        {/* Content */}
        <main className="flex-1 p-6 lg:p-12">
          <div className="max-w-4xl">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-300 mb-4">
              Hi Murdock,
            </h1>
            <p className="text-lg text-gray-400 mb-12">
              Here's your summary for the day
            </p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;

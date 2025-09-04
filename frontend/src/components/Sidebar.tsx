import React from 'react';
import { 
  LayoutGrid, 
  FileText, 
  Users, 
  AlertTriangle, 
  Flag
} from 'lucide-react';
import logo from '../assets/logo.png'

interface SidebarProps {
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab = 'overview', onTabChange }) => {
  const sidebarItems = [
    { id: 'overview', icon: LayoutGrid, label: 'OVERVIEW' },
    { id: 'feed', icon: FileText, label: 'ALL FEED' },
    { id: 'profiles', icon: Users, label: 'PROFILES' },
    { id: 'incidents', icon: AlertTriangle, label: 'INCIDENTS' },
    { id: 'campaigns', icon: Flag, label: 'CAMPAIGNS' },
  ];

  const handleItemClick = (itemId: string) => {
    if (onTabChange) {
      onTabChange(itemId);
    }
  };

  return (
    <aside className="hidden lg:block w-64 bg-zinc-900 border-r border-zinc-800 min-h-screen">
      {/* Company Logo */}
      <div className="p-6 border-b border-zinc-800">
        <div className="flex justify-center">
          <img 
            src={logo}
            alt="FalconFeeds Logo" 
            className="w-12 h-12 rounded-lg object-cover"
          />
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="p-6 space-y-4">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.id === activeTab;
          
          return (
            <button
              key={item.id}
              onClick={() => handleItemClick(item.id)}
              className={`w-full flex flex-col items-center space-y-2 px-4 py-6 rounded-lg text-center transition-all duration-200 ${
                isActive 
                  ? 'bg-[#17171F] text-white' 
                  : 'text-gray-400 hover:text-white hover:bg-zinc-800'
              }`}
            >
              <Icon className="w-6 h-6" />
              <span className="text-xs font-medium tracking-wide">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
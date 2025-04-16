import { Link, useLocation } from 'react-router-dom';
import { 
  HomeIcon, 
  ServerIcon,
  XMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';

const NavItem = ({ to, icon, label, expanded, isActive }) => (
  <Link
    to={to}
    className={`flex items-center ${expanded ? 'justify-start' : 'justify-center'} px-3 sm:px-4 py-2 sm:py-3 rounded-lg transition-colors ${
      isActive
        ? 'bg-blue-700 text-white'
        : 'text-gray-600 hover:bg-gray-100'
    }`}
  >
    <div className="w-5 h-5">{icon}</div>
    {expanded && <span className="font-medium ml-3 text-sm sm:text-base">{label}</span>}
  </Link>
);

const Sidebar = ({ expanded, isOpen, toggleSidebar, closeSidebar }) => {
  const location = useLocation();
  const isSmallScreen = window.innerWidth < 1024;

  const navItems = [
    { path: '/', label: 'Dashboard', icon: <HomeIcon /> },
    { path: '/data-sources', label: 'Data Sources', icon: <ServerIcon /> },
  ];

  return (
    <aside 
      className={`fixed top-0 left-0 z-40 h-screen transition-all duration-300 bg-white border-r border-gray-200 
        ${expanded ? 'w-64' : 'w-16 sm:w-20'} 
        ${isSmallScreen && !isOpen ? '-translate-x-full' : 'translate-x-0'}`}
    >
      <div className="p-2 sm:p-4 border-b border-gray-200 flex items-center justify-between">
        {expanded ? (
          <h1 className="text-lg sm:text-xl font-bold text-blue-700 truncate">IndustryLLM</h1>
        ) : (
          <h1 className="text-lg sm:text-xl font-bold text-blue-700">ILM</h1>
        )}
        
        <button 
          onClick={toggleSidebar}
          className="p-1 rounded-md hover:bg-gray-100 text-gray-500"
          aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
        >
          {expanded ? (
            <ChevronLeftIcon className="w-4 h-4 sm:w-5 sm:h-5" />
          ) : (
            <ChevronRightIcon className="w-4 h-4 sm:w-5 sm:h-5" />
          )}
        </button>
      </div>
      
      <nav className="mt-4 sm:mt-6 px-1 sm:px-2 space-y-1">
        {navItems.map((item) => (
          <NavItem
            key={item.path}
            to={item.path}
            icon={item.icon}
            label={item.label}
            expanded={expanded}
            isActive={location.pathname === item.path}
          />
        ))}
      </nav>

      {isSmallScreen && isOpen && (
        <div className="absolute top-0 right-0 transform translate-x-full mt-2 mr-2">
          <button 
            onClick={closeSidebar}
            className="p-2 rounded-full bg-white shadow-md text-gray-500 hover:bg-gray-100"
            aria-label="Close sidebar"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>
      )}
    </aside>
  );
};

export default Sidebar; 
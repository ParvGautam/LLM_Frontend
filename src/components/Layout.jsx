import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  // Function to toggle sidebar expanded state
  const toggleSidebar = () => {
    if (isSmallScreen) {
      setIsSidebarOpen(!isSidebarOpen);
    } else {
      setSidebarExpanded(!sidebarExpanded);
    }
  };

  // Function to close sidebar (used on small screens)
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  // Check screen size on mount and window resize
  useEffect(() => {
    const handleResize = () => {
      const smallScreen = window.innerWidth < 1024;
      setIsSmallScreen(smallScreen);
      
      // Auto-collapse sidebar on small screens
      if (smallScreen && sidebarExpanded) {
        setIsSidebarOpen(false);
      } else if (!smallScreen) {
        setIsSidebarOpen(true);
      }
    };

    // Set initial states based on screen size
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gray-50">
      {/* Sidebar */}
      <Sidebar 
        expanded={sidebarExpanded} 
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar} 
        closeSidebar={closeSidebar}
      />

      {/* Main Content */}
      <div className={`flex flex-col flex-1 w-full transition-all duration-300 ${
        sidebarExpanded ? 'lg:ml-64' : 'lg:ml-20'
      } ${isSmallScreen && isSidebarOpen ? 'ml-0' : 'ml-0'}`}>
        <Header toggleSidebar={toggleSidebar} />
        
        <main className="flex-1 p-2 sm:p-4 md:p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
      
      {/* Backdrop for mobile sidebar */}
      {isSmallScreen && isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-gray-900 bg-opacity-50 z-30 lg:hidden"
          onClick={closeSidebar}
        />
      )}
    </div>
  );
};

export default Layout; 
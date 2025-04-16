import { useState } from "react";
import {
  BellIcon,
  UserCircleIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";

const Header = ({ toggleSidebar }) => {
  const [notifications, setNotifications] = useState(3);

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="flex items-center justify-between px-2 sm:px-4 py-2 sm:py-3">
        <div className="flex items-center">
          <button
            onClick={toggleSidebar}
            className="mr-2 sm:mr-3 p-1 rounded-md hover:bg-gray-100 text-gray-500 block lg:hidden"
            aria-label="Menu"
          >
            <Bars3Icon className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
            Dashboard
          </h1>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-4">
          <button className="relative p-1 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100">
            <BellIcon className="h-5 w-5 sm:h-6 sm:w-6" />
            {notifications > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                {notifications}
              </span>
            )}
          </button>

          <div className="hidden sm:flex items-center bg-gray-900 text-white rounded-md px-2 sm:px-3 py-1.5 sm:py-2">
            <UserCircleIcon className="h-5 w-5 sm:h-6 sm:w-6 mr-1.5 sm:mr-2" />
            <span className="text-xs sm:text-sm font-medium">Admin</span>
          </div>

          <div className="sm:hidden">
            <UserCircleIcon className="h-6 w-6 sm:h-8 sm:w-8 text-gray-900" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

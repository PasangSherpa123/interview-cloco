import React from "react";
import { NavLink } from "react-router";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white flex flex-col">
      <h2 className="text-2xl font-bold p-4 border-b border-gray-700">
        Admin Panel
      </h2>
      <nav className="flex-1">
        <ul className="space-y-2 p-4">
          <li>
            <NavLink
              to="/users"
              className={({ isActive }) =>
                isActive
                  ? "block p-2 rounded bg-gray-700"
                  : "block p-2 rounded hover:bg-gray-700"
              }
            >
              Users
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/artists"
              className={({ isActive }) =>
                isActive
                  ? "block p-2 rounded bg-gray-700"
                  : "block p-2 rounded hover:bg-gray-700"
              }
            >
              Artists
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/logout"
              className={({ isActive }) =>
                isActive
                  ? "block p-2 rounded bg-gray-700"
                  : "block p-2 rounded hover:bg-gray-700"
              }
            >
              Logout
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;

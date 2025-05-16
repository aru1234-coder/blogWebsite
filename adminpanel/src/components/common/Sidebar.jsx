"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { FaBook, FaTags, FaUsers, FaSignOutAlt } from "react-icons/fa";
import { FiHome } from "react-icons/fi";

const Sidebar = () => {
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", icon: <FiHome />, path: "/admin" },
    { name: "Blogs", icon: <FaBook />, path: "/admin/blogs" },
    { name: "Categories", icon: <FaTags />, path: "/admin/categories" },
    { name: "Users", icon: <FaUsers />, path: "/admin/users" },
  ];

  return (
    <div className="bg-white w-64 h-screen shadow-lg flex flex-col">
      {/* Heading */}
      <div className="border-b-2 font-semibold text-lg text-center p-4">
        Blog Management
      </div>

      {/* Menu Items */}
      <div className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const isActive = item.path === pathname;
            return (
              <li key={item.name}>
                <Link
                  href={item.path}
                  className={`flex items-center w-full p-3 rounded-lg hover:bg-gray-100 ${
                    isActive ? "bg-gray-100 text-blue-700" : "text-gray-700"
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Footer */}
      <div className="border-t p-4">
        <button className="flex items-center w-full p-2 text-red-600 hover:bg-red-50 rounded">
          <FaSignOutAlt className="mr-3" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

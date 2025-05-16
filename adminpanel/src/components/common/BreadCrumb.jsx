"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaChevronRight } from "react-icons/fa";

const BreadCrumb = () => {
  const pathname = usePathname();
  // Split the path and remove empty strings
  const pathSegments = pathname.split("/").filter((segment) => segment !== "");
  // Create breadcrumb items
  const breadCrumbItems = pathSegments.map((segment, index) => {
    // Reconstruct the path up to the current segment
    const path = `/${pathSegments.slice(0, index + 1).join("/")}`;
    return {
      name: segment.charAt(0).toUpperCase() + segment.slice(1), // Capitalize first letter
      path: path,
      isLast: index === pathSegments.length - 1,
    };
  });

  return (
    <div className="flex items-center gap-2 text-sm text-gray-600">
      {breadCrumbItems.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          {item.isLast ? (
            <span className="font-medium text-gray-900">{item.name}</span>
          ) : (
            <>
              <Link
                href={item.path}
                className="hover:text-blue-600 hover:underline"
              >
                {item.name}
              </Link>
              <FaChevronRight className="h-3 w-3 text-gray-400" />
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default BreadCrumb;

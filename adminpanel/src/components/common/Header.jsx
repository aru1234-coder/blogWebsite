import React from "react";
import BreadCrumb from "./BreadCrumb";

const Header = () => {
  return (
    <div className="border-b border-gray-200 flex items-center justify-between p-4">
      <BreadCrumb />
    </div>
  );
};

export default Header;

import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Content from "../components/Content";

function List() {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = (collapsed) => {
    setCollapsed(collapsed);
  };

  return (
    <div>
      <Header />
      <div className="flex w-full h-screen">
        <div className={`${collapsed ? "w-20" : "w-1/7"}`}>
          {" "}
          <Sidebar collapsed={collapsed} onCollapse={toggleSidebar} />
        </div>
        <div className={`${collapsed ? "w-full" : "w-6/7"} `}>
          {" "}
          <Content />
        </div>
      </div>
    </div>
  );
}

export default List;

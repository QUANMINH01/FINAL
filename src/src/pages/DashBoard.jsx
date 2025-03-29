import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

function DashBoard() {
  return (
    <div>
      <Header />
      <div className="flex w-full h-screen">
        <div className="w-1/7">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}

export default DashBoard;

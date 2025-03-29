import React, { useState } from "react";
import { Layout, Menu, Button } from "antd";
import {
  DashboardOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";

const { Sider } = Layout;

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userData");
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Sider
      width={collapsed ? 80 : 200}
      collapsed={collapsed}
      onCollapse={toggleSidebar}
      theme="light"
      style={{ height: "100vh", position: "fixed", top: 0, left: 0 }}
    >
      <div className="logo" style={{ padding: "20px", textAlign: "center" }}>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRV2Qm0s2BuyqGs9nwBEPaWfvl27nxF_vvSbQ&s"
          alt="logo"
          style={{ width: "50px", height: "50px" }}
        />
      </div>

      <Menu theme="light" mode="inline" defaultSelectedKeys={["1"]}>
        {/* Mục Dashboard */}
        <Menu.Item key="1" icon={<DashboardOutlined />}>
          <Link to="/dashboard">Dashboard</Link>
        </Menu.Item>

        {/* Mục List Patients */}
        <Menu.Item key="2" icon={<UserOutlined />}>
          <Link to="/list">List Patients</Link>
        </Menu.Item>

        {/* Mục Logout */}
        <Menu.Item key="3" icon={<LogoutOutlined />} onClick={handleLogout}>
          Logout
        </Menu.Item>
      </Menu>

      {/* Nút Toggle Sidebar */}
      <div
        style={{
          position: "absolute",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          transition: "transform 0.3s ease",
        }}
      >
        <Button
          type="primary"
          onClick={toggleSidebar}
          style={{
            fontSize: collapsed ? "16px" : "20px",
            padding: collapsed ? "5px 10px" : "10px 20px",
          }}
        >
          {collapsed ? ">" : "<"}
        </Button>
      </div>
    </Sider>
  );
};

export default Sidebar;

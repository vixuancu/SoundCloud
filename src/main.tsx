import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import UsersPage from "./screens/users.page.tsx";
import "./App.scss";

import { useEffect, useState } from "react";
import { AudioOutlined, HomeOutlined, UserOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import TracksPage from "./screens/tracks.page.tsx";
type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    label: <Link to={"/"}>Home</Link>,
    key: "home",
    icon: <HomeOutlined />,
  },
  {
    label: <Link to={"/users"}>Manage Users</Link>,
    key: "users",
    icon: <UserOutlined />,
    disabled: false,
  },
  {
    label: <Link to={"/tracks"}>Manage Tracks</Link>,
    key: "tracks",
    icon: <AudioOutlined />,
    disabled: false,
  },
];

const Header = () => {
  const [current, setCurrent] = useState("home");

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  );
};
const LayoutAdmin = () => {
  const getData = async () => {
    const res = await fetch("http://localhost:8000/api/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: "hoidanit@gmail.com",
        password: "123456",
      }),
    });
    const d = await res.json(); // parse dữ liệu JSON
    if (d.data) {
      localStorage.setItem("access_token", d.data.access_token);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <Header />
      <Outlet />
      {/* Outlet này để thằng con render vào */}
      <footer> Footer</footer>
    </div>
  );
};
const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutAdmin />,
    children: [
      //index:true tượng trưng cho trang chủ khi vào / không biết render ra cái gì thì nó render ra component app
      { index: true, element: <App /> },
      {
        path: "users",
        element: <UsersPage />,
      },
      {
        path: "tracks",
        element: <TracksPage />,
      },
    ],
  },

  // {
  //   path: "/tracks",
  //   element: <div>Manage Tracks</div>,
  // },
]);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

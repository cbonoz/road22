import React, { useState } from "react";

import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./components/Home";
import CreatePolysign from "./components/CreatePolysign";
import { Layout, Menu, Breadcrumb } from "antd";
import { APP_NAME } from "./util/constants";
import History from "./components/History";
import Sign from "./components/Sign";
import logo from "./assets/logo.png";

import "./App.css";

const { Header, Content, Footer } = Layout;

function App() {
  const [account, setAccount] = useState();

  const navigate = useNavigate();
  const path = window.location.pathname;

  const isPayment = path.startsWith("/sign");

  return (
    <div className="App">
      <Layout className="layout">
        {!isPayment && (
          <Header>
            {/* <div className="logo" /> */}

            <Menu
              // theme="dark"
              mode="horizontal"
              defaultSelectedKeys={[]}
            >
              <Menu.Item key={0}>
                <img
                  src={logo}
                  className="header-logo pointer"
                  onClick={() => navigate("/")}
                />
              </Menu.Item>
              <Menu.Item key={1} onClick={() => navigate("/create")}>
                Create esignature request
              </Menu.Item>
              <Menu.Item key={2} onClick={() => navigate("/history")}>
                Lookup
              </Menu.Item>
            </Menu>
          </Header>
        )}
        <Content style={{ padding: "0 50px" }}>
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/sign/:signId" element={<Sign />} />
              <Route path="/create" element={<CreatePolysign />} />
              <Route path="/history" element={<History />} />
            </Routes>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          {APP_NAME} ©2022 - Created for Road to Web3 2022
        </Footer>
      </Layout>
    </div>
  );
}

export default App;

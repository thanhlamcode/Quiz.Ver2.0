import React from "react";
import { Outlet, Link } from "react-router-dom";
import { Layout, Menu, Button, Space } from "antd";
import { useSelector } from "react-redux";
import LogOut from "../../components/LogOut";
import "./layout.scss";

const { Header, Content, Footer } = Layout;

function LayoutDefault() {
  const isLogin = useSelector((state) => state.loginReducer);

  return (
    <Layout className="layout">
      <Header className="layout__header">
        <Link to="/">
          <div className="logo">QUIZ</div>
        </Link>
        <Menu theme="dark" mode="horizontal" className="menu-right">
          <Space>
            {isLogin ? (
              <LogOut />
            ) : (
              <>
                <Link to="/login">
                  <Button type="primary">Login</Button>
                </Link>
                <Link to="/register">
                  <Button type="default">Register</Button>
                </Link>
              </>
            )}
          </Space>
        </Menu>
      </Header>

      <Content className="layout__main">
        <div className="site-layout-content">
          <Outlet />
        </div>
      </Content>

      <Footer className="layout__footer">
        Copy right @ 2024 by thanhlamcode
      </Footer>
    </Layout>
  );
}

export default LayoutDefault;

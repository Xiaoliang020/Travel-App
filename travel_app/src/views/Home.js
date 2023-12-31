import {
  HomeOutlined,
  HistoryOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { useState } from 'react';
import '../App.css';
import { Outlet, useNavigate, useLocation } from "react-router-dom"

const { Header, Sider, Content } = Layout;
const Home = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigateTo = useNavigate();
  const location = useLocation();
  // Extract the pathname from the current URL
  const currentPathname = location.pathname;

  const menuClick = (e) => {
    console.log("Side bar clicked", e.key);
    if (location.pathname === '/map' && e.key !== '/map') {
      // open a new window when user at map view
      window.open(e.key);
    } else {
      // Navigate to corresponding router
      navigateTo(e.key);
    }
  }

  return (
    <div style={{ height: '100vh' }}>
      <Layout style={{ minHeight: '100%' }}>
        <Sider trigger={null} collapsible collapsed={collapsed} collapsedWidth={0}>
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['/map']}
            selectedKeys={[currentPathname]}
            items={[
              {
                key: '/settings',
                icon: <UserOutlined />,
                label: 'User Settings',
              },
              {
                key: '/map',
                icon: <HomeOutlined />,
                label: 'Map View',
              },
              {
                key: '/community',
                icon: <TeamOutlined />,
                label: 'Community',
              },
              {
                key: '/paths',
                icon: <HistoryOutlined />,
                label: 'History Paths',
              }
            ]}
            onClick={menuClick}
          />
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
              display: 'flex', // Set display to flex
              alignItems: 'center', // Align items vertically center
            }}
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
                marginLeft: '10px', // Add left margin
              }}
            />
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            {/* Window to show content */}
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};
export default Home;
import {
  HomeOutlined,
  HistoryOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  TeamOutlined,
  UserOutlined,
  LogoutOutlined,
  MessageOutlined,
  BellOutlined,
  SettingOutlined
} from '@ant-design/icons';
import { Button, Layout, Menu, theme, Avatar, Dropdown } from 'antd';
import { useState } from 'react';
import '../App.css';
import '../assets/styles/post.css';
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

  let userStr = localStorage.getItem("user") || "{}"
  let user = JSON.parse(userStr);

  const handleLogout = () => {
    // 清除存储在localStorage或sessionStorage的User Token
    localStorage.removeItem('user');
  
    // （可选）发送登出请求到后端，让后端使Token失效
    // fetch('/api/logout', {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': `Bearer ${localStorage.getItem('token')}`,
    //     'Content-Type': 'application/json',
    //   },
    //   // 无需发送具体的Token，因为它已经在请求头中
    // })
    // .then(response => {
    //   // 根据响应处理，如重定向到登录页面
    //   if (response.ok) {
    //     // 重定向到登录页或显示登出成功消息
    //     window.location.href = '/login';
    //   }
    // })
    // .catch(error => console.error('Logout error:', error));
  
    // 重定向到登录页或其他处理
    window.location.href = '/login';
  };

  const handleMessage = () => {
    window.location.href = '/message';
  }

  const handleProfile = () => {
    window.location.href = `/profile/${user.id}`;
  }

  // 用户操作菜单
  const userMenu = (
    <Menu>
      <Menu.Item key="0" icon={<UserOutlined />} onClick={handleProfile}>
        Profile
      </Menu.Item>
      <Menu.Item key="1" icon={<MessageOutlined />} onClick={handleMessage}>
        View Messages
      </Menu.Item>
      <Menu.Item key="2" icon={<BellOutlined />}>
        View Notifications
      </Menu.Item>
      <Menu.Item key="3" icon={<LogoutOutlined />} onClick={handleLogout}>
        Log Out
      </Menu.Item>
    </Menu>
  );

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
              },
              {
                key: '/settings',
                icon: <SettingOutlined />,
                label: 'User Settings',
              },
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

            {/* 这个 div 用于推动其它元素到两侧 */}
            <div style={{ flexGrow: 1 }}></div>

            {/* Logo 和 Menu 省略，直接跳到新增的头像部分 */}
            <div className="avatar-container" style={{ padding: '10px', textAlign: 'center', marginRight: "10px"}}>
              <Dropdown overlay={userMenu} trigger={['click']}>
                <a onClick={(e) => e.preventDefault()}>
                  <Avatar 
                    src={user.avatar ? user.avatar : undefined} // 当user.avatar存在时使用user.avatar，否则不设置src，显示默认图标
                    icon={!user.avatar ? <UserOutlined /> : undefined} // 当user.avatar不存在时，显示默认的UserOutlined图标
                    style={{ backgroundColor: '#f56a00' }} 
                  />
                  <span style={{ marginLeft: '10px', color: 'black' }}>{user.username}</span>
                </a>
              </Dropdown>
            </div>
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
import {
    AreaChartOutlined,
    LogoutOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    ProfileOutlined,
    SendOutlined,
    TransactionOutlined,
    UserOutlined
} from '@ant-design/icons';
import { Button, Layout, Menu } from "antd";
import React, { Fragment, useEffect, useState } from "react";
import logo from "../../assets/logo.png";
import Account from './Account/Account';
import './AdminHome.css';
const { Header, Sider, Content } = Layout;

const AdminHome = () => {
    const [activeComponent, setActiveComponent] = useState('dashboard');
    const [collapsed, setCollapsed] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const token = localStorage.getItem("token");

    useEffect(() => {
        setIsLoggedIn(token != null);
    }, [token]);

    const handleDashBoardClick = () => {
        setActiveComponent('dashboard');
    };
    const handleAccountClick = () => {
        setActiveComponent('account');
    };
    const handleTransactionClick = () => {
        setActiveComponent('transaction');
    };
    const handleRequestClick = () => {
        setActiveComponent('request');
    };
    const handleProfileClick = () => {
        setActiveComponent('profile');
    };
    const handleLogoutClick = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        window.location.href = '/';
    };

    const renderActiveComponent = () => {
        if (activeComponent === 'dashboard') {
            return;
        } else if (activeComponent === 'account') {
            return <Account />;
        } else if (activeComponent === 'transaction') {
            return;
        } else if (activeComponent === 'request') {
            return;
        } else if (activeComponent === 'profile') {
            return;
        }
    };

    return (
        <Fragment>
            <Layout style={{ height: '100vh' }}>
                <Sider trigger={null} collapsible collapsed={collapsed}>
                    <a href='/home' style={{ display: 'flex', justifyContent: 'center' }}>
                        <img src={logo} className='w-[124px] h-[124px]' alt="Logo" />
                    </a>
                    <Menu
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        items={[
                            {
                                key: '1',
                                icon: <AreaChartOutlined />,
                                label: 'Dashboards',
                                style: { fontSize: '1rem', width: '80%', marginLeft: 'auto', marginRight: 'auto' },
                                onClick: () => handleDashBoardClick()
                            },
                            {
                                key: '2',
                                icon: <ProfileOutlined />,
                                label: 'Accounts',
                                style: { fontSize: '1rem', width: '80%', marginLeft: 'auto', marginRight: 'auto' },
                                onClick: () => handleAccountClick()
                            },
                            {
                                key: '3',
                                icon: <TransactionOutlined />,
                                label: 'Transactions',
                                style: { fontSize: '1rem', width: '80%', marginLeft: 'auto', marginRight: 'auto' },
                                onClick: () => handleTransactionClick()
                            },
                            {
                                key: '4',
                                icon: <SendOutlined />,
                                label: 'Creator Requests',
                                style: { fontSize: '1rem', width: '80%', marginLeft: 'auto', marginRight: 'auto' },
                                onClick: () => handleRequestClick()
                            },
                            {
                                key: '5',
                                icon: <UserOutlined />,
                                label: 'Profile',
                                style: { fontSize: '1rem', width: '80%', marginLeft: 'auto', marginRight: 'auto' },
                                onClick: () => handleProfileClick()
                            },
                            {
                                key: '6',
                                icon: <LogoutOutlined />,
                                label: 'Log Out',
                                style: { fontSize: '1rem', width: '80%', marginLeft: 'auto', marginRight: 'auto' },
                                onClick: () => handleLogoutClick()
                            },
                        ]}
                    />
                </Sider>
                <Layout>
                    <Header style={{ padding: 0, backgroundColor: 'whitesmoke' }}>
                        <Button
                            type="text"
                            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                            onClick={() => setCollapsed(!collapsed)}
                            style={{
                                fontSize: '16px',
                                width: 64,
                                height: 64,
                            }}
                        />
                        <div className='w-full bg-whitesmoke-100'>
                            {renderActiveComponent()}
                        </div>
                    </Header>
                </Layout>
            </Layout>
        </Fragment >
    )
}

export default AdminHome;
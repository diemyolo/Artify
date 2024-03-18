import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu } from "antd";
import React, { Fragment, useState } from "react";
import logo from "../assets/logo.png";
import './SideBar.css';
const { Header, Sider, Content } = Layout;

const SideBar = () => {
    const [collapsed, setCollapsed] = useState(false);
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
                                icon: <UserOutlined />,
                                label: 'Dashboards',
                                style: { fontSize: '1rem' }
                            },
                            {
                                key: '2',
                                icon: <UserOutlined />,
                                label: 'Accounts',
                                style: { fontSize: '1rem' }
                            },
                            {
                                key: '3',
                                icon: <VideoCameraOutlined />,
                                label: 'Transactions',
                                style: { fontSize: '1rem' }
                            },
                            {
                                key: '4',
                                icon: <UploadOutlined />,
                                label: 'Creator Requests',
                                style: { fontSize: '1rem' }
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
                    </Header>
                </Layout>
            </Layout>
        </Fragment >
    )
}

export default SideBar;
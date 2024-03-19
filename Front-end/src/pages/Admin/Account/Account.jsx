import {
    EditOutlined
} from '@ant-design/icons';
import { Button, Spin, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Account = () => {
    const token = localStorage.getItem("token");
    const [customerList, setCustomerList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8080/api/auth/admin/user/list`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                setCustomerList(response.data.payload);
                if (response) setIsLoading(true);
            } catch (error) {
                console.error('Error fetching customer list:', error);
            }
        };
        fetchData();
    }, [token]);

    const columns = [
        {
            title: 'Name',
            dataIndex: 'userName',
            key: 'userName',
        },
        {
            title: 'Email',
            dataIndex: 'emailAddress',
            key: 'emailAddress',
        },
        {
            title: 'Telephone',
            dataIndex: 'telephone',
            key: 'telephone',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Role',
            dataIndex: 'roleName',
            key: 'roleName',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Button icon={<EditOutlined />} onClick={() => handleEdit(record)}>
                    Edit
                </Button>
            ),
        },
    ];

    return (
        <>
            <Spin spinning={!isLoading} fullscreen />
            <h1>Account Management</h1>
            <Table dataSource={customerList} columns={columns} rowKey="userId" />
        </>
    );
};

export default Account;
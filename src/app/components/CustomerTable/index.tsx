'use client'
import { UserOutlined } from '@ant-design/icons';
import type { TableColumnsType } from 'antd';
import { Card, Image, Skeleton, Table } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

interface DataType {
    key: React.Key;
    user_id: number;
    user_name: string;
    password: string;
    user_role: string;
    img_url: string | null;
    email: string | null;
}

const columns: TableColumnsType<DataType> = [
    {
        title: 'ID',
        dataIndex: 'user_id',
    },
    {
        title: 'Image',
        dataIndex: 'img_url',
        render: (img_url: string | null) => (
            <div className=''>
                {img_url ? (
                    <Image className='rounded-md' src={img_url} alt="User" width={60} height={60} />
                ) : (
                    <div className='flex justify-center items-center rounded-md bg-gray-300 size-[60px]'>
                        <UserOutlined className='text-xl' />
                    </div>
                )}
            </div>
        ),
    },
    {
        title: 'Name',
        dataIndex: 'user_name',
    },
    {
        title: 'Role',
        dataIndex: 'user_role',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        render: (email: string | null) => (email ? email : '[ No email ]'),
    },
];

const CustomerTable: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState<DataType[]>([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const url = process.env.NEXT_PUBLIC_GET_USER ?? '';
            const response = await axios.get<any[]>(url);
            setUsers(response.data.map((user: any, index: number) => ({
                key: index,
                user_id: user.user_id,
                user_name: user.user_name,
                password: user.password,
                user_role: user.user_role,
                img_url: user.img_url,
                email: user.email,
            })));
        } catch (error) {
            console.error('Failed to fetch users:', error);
        } finally {
            setLoading(false);
        }
    };


    // Custom item renderer for pagination
    const itemRender = (current: number, type: string, originalElement: React.ReactNode) => {
        return originalElement;
    };

    return (
        <div>
            <h2 className='text-base font-medium mb-2'>Customer List</h2>
            {users !== null ?
                <Table
                    className='rounded-md border w-[26rem] sm:w-auto'
                    columns={columns}
                    scroll={{ x: true }}
                    dataSource={users}
                    loading={loading}
                    pagination={{ itemRender }}
                />
                : <Card><Skeleton paragraph={{ rows: 7 }} active /></Card>
            }
        </div>
    );
};

export default CustomerTable;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ProductProps } from '../Types/product';
import { Card, Table, Tag } from 'antd';

const LowStockList: React.FC = () => {
    const [products, setProducts] = useState<ProductProps[]>([]);

    useEffect(() => {
        const url = process.env.NEXT_PUBLIC_LOW_STOCK;
        axios.get(url || '')
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                // Optionally, you can handle the error state here
            });
    }, []);

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            sorter: (a: ProductProps, b: ProductProps) => a.id - b.id, // Sort function for the "ID" column

        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: (a: ProductProps, b: ProductProps) => a.name.localeCompare(b.name), // Sort function for the "Name" column

        },
        {
            title: 'Category',
            dataIndex: 'category_name',
            key: 'category_name',
        },
        {
            title: 'Stock',
            dataIndex: 'inStock',
            key: 'inStock',
            sorter: (a: ProductProps, b: ProductProps) => a.inStock - b.inStock, // Sort function for the "ID" column

        },
        {
            title: 'Status',
            dataIndex: 'inStock',
            key: 'status',
            render: (inStock: number) => {
                if (inStock === 0) {
                    return <Tag color="red">Out of Stock</Tag>;
                } else if (inStock < 5) {
                    return <Tag color="orange">Low Stock</Tag>;
                } else {
                    return <Tag color="lime">Sufficient Stock</Tag>;
                }
            },
        },
    ];

    return (
        <>
            <Card title="Low Stock Products" style={{ width: 'max-content' }}>
                {products.length > 0 ? (
                    <Table dataSource={products} className='bg-slate-100 rounded-md border' columns={columns} rowKey="id" />
                ) : (
                    <p>All products have sufficient stock.</p>
                )
                }
            </Card>
        </>
    );
}

export default LowStockList;

'use client'
import { useEffect, useState } from 'react';

// Import axios for making HTTP requests
import axios from 'axios';

// Import antd components
import { Button, Card, Form, Image, Input, InputNumber, Modal, Select, Skeleton, Spin, Table, Upload, message } from 'antd';

// Import antd icons
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { UploadChangeParam, UploadFile } from 'antd/es/upload';

// Destructure Option from Select
const { Option } = Select;

// Define interface for Product
interface Product {
    id: number;
    name: string;
    price: number;
    category: string;
    description: string;
    inStock: number;
    image_url: string;
    category_name?: string; // Make it optional if necessary
}
const truncateDescription = (description: string, maxLength: number) => {
    return description.length > maxLength ? description.substring(0, maxLength) + '...' : description;
};

// Define columns for the table
const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        sorter: (a: Product, b: Product) => a.id - b.id, // Sort function for the "ID" column
    },
    {
        title: 'Image',
        dataIndex: 'image_url',
        key: 'image_url',
        render: (image_url: string) => (
            <Image width={60} height={60} className='rounded-md object-cover' src={image_url} alt="Product" />
        ),
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        sorter: (a: Product, b: Product) => a.name.localeCompare(b.name), // Sort function for the "Name" column
    },
    {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
        sorter: (a: Product, b: Product) => a.price - b.price, // Sort function for the "ID" column
    },
    {
        title: 'Category',
        key: 'category',
        render: (text: any, record: Product) => record.category || record.category_name,
    },
    {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
        render: (description: string) => (
            <div>
                <span className='text-ellipsis line-clamp-1'>
                    {truncateDescription(description, 20)}
                </span>
            </div>
        ),
    },
    {
        title: <span className='text-nowrap'>In Stock</span>,
        dataIndex: 'inStock',
        key: 'inStock',
    }
];

// Define ProductTable component
const ProductTable = () => {
    const urlProduct = process.env.NEXT_PUBLIC_GET_PRODUCT || ''; // Provide a default value ('') if NEXT_PUBLIC_GET_PRODUCT is undefined

    // State variables
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [fileList, setFileList] = useState<File[]>([]);
    const [uploading, setUploading] = useState(false);
    const [formData, setFormData] = useState<Omit<Product, 'id'>>({
        name: '',
        price: 0,
        category: '',
        description: '',
        inStock: 1,
        image_url: ''
    });
    const [products, setProducts] = useState<Product[]>([]);

    // useEffect to fetch products on component mount
    useEffect(() => {
        fetchProducts();
    }, []);



    // Function to fetch products from the backend API
    const fetchProducts = async () => {
        try {
            const response = await axios.get<Product[]>(urlProduct);
            setProducts(response.data);
        } catch (error) {
            console.error('Failed to fetch products:', error);
            // Display error message to the user
            message.error('Failed to fetch products');
        }
    };

    // Function to show modal for adding a new product
    const showModal = () => {
        setOpen(true);
    };

    // Function to handle modal cancel
    const handleCancel = () => {
        setOpen(false);
    };

    // Function to handle modal ok
    const handleOk = async () => {
        try {
            setConfirmLoading(true);

            // Validate form data
            if (!formData.name || !formData.price || !formData.category || !fileList.length) {
                throw new Error('Please fill in all required fields');
            }

            // Upload image
            const imageUrl = await uploadThumbnailToImgbb(fileList[0]);

            // Create new product object
            const newProduct = {
                ...formData,
                id: Math.max(0, ...products.map(product => product.id)) + 1,
                image_url: imageUrl
            };

            // Add new product to the database

            await axios.post(urlProduct, newProduct);

            // Update products state with the new product
            setProducts([...products, newProduct]);

            // Display success message to the user
            message.success('Product added successfully');
        } catch (error: any) {
            console.error('Failed to submit product:', error.message);
            // Display error message to the user
            message.error(error.message);
        } finally {
            setConfirmLoading(false);
            setUploading(false)
            setFileList([]);
            setFormData({
                name: '',
                price: 1,
                category: '',
                description: '',
                inStock: 1,
                image_url: ''
            });
            setOpen(false);

        }
    };

    // Function to handle image change
    const handleImageChange = (info: UploadChangeParam<UploadFile<any>>) => {
        // Map UploadFile objects to standard File objects
        const files = info.fileList.map(file => file.originFileObj as File);
        setFileList(files);
    };

    // Function to upload image to ImgBB
    const uploadThumbnailToImgbb = async (file: File) => {
        try {
            setUploading(true);
            const formData = new FormData();
            formData.append('key', 'bf63b1ec6c2eb22ee04a1a715cdb780a');
            formData.append('image', file);

            const response = await fetch('https://api.imgbb.com/1/upload', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                const imageUrl = data.data.url;
                return imageUrl;
            } else {
                console.error('Failed to upload image to ImgBB');
                throw new Error('Failed to upload image to ImgBB');
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            throw new Error('Error uploading image');
        } finally {
            setUploading(false);
        }
    };
    return (
        <>
            <Modal
                title="Add Product"
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                <Form layout="vertical">
                    <Form.Item
                        label="Name"
                        rules={[{ required: true, message: 'Please enter the product name' }]}
                    >
                        <Input
                            placeholder="Product Name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Price"
                        rules={[{ required: true, message: 'Please enter the product price' }]}
                    >
                        <InputNumber
                            min={0}
                            step={0.01}
                            style={{ width: '100%' }}
                            placeholder="123.45"
                            value={formData.price}
                            onChange={(value) => {
                                if (typeof value === 'number') {
                                    setFormData({ ...formData, price: value });
                                }
                            }}
                        />

                    </Form.Item>
                    <Form.Item
                        label="Category"
                        rules={[{ required: true, message: 'Please select a category' }]}
                    >
                        <Select
                            placeholder="Select a category"
                            value={formData.category}
                            onChange={(value) => setFormData({ ...formData, category: value })}
                        >
                            <Option value="Men">Men</Option>
                            <Option value="Women">Women</Option>
                            <Option value="Kids">Kids</Option>
                            <Option value="Unisex">Unisex</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Description"
                        rules={[{ required: true, message: 'Please enter the product description' }]}
                    >
                        <Input.TextArea
                            rows={4}
                            placeholder="Enter description..."
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                    </Form.Item>
                    <Form.Item
                        label="In Stock"
                        rules={[{ required: true, message: 'Please enter the stock quantity' }]}
                    >
                        <InputNumber
                            min={0}
                            step={1}
                            style={{ width: '100%' }}
                            placeholder="0"
                            value={formData.inStock}
                            onChange={(value) => {
                                if (typeof value === 'number') {
                                    setFormData({ ...formData, inStock: value });
                                }
                            }}
                        />

                    </Form.Item>
                    <Spin spinning={uploading} size="large">
                        <Form.Item label="Image">
                            <Upload
                                listType="picture"
                                fileList={fileList.map(file => ({
                                    uid: file.name,
                                    name: file.name,
                                    status: 'done',
                                    url: URL.createObjectURL(file),
                                }))}
                                beforeUpload={() => false}
                                onChange={handleImageChange} // Ensure that this is passing the correct type
                            >
                                <Button icon={<UploadOutlined />}>Upload</Button>
                            </Upload>
                        </Form.Item>
                    </Spin>
                </Form>
            </Modal>
            {products !== null ?
                <div>
                    <div className='flex justify-between mb-4'>
                        <h2 className='text-base font-medium mb-2'>Inventory</h2>
                        <Button
                            icon={<PlusOutlined />}
                            type='dashed'
                            onClick={showModal}>
                            Add Product
                        </Button>
                    </div>
                    <Table
                        className='bg-slate-100 rounded-md border overflow-x-auto w-[26rem] sm:w-auto'
                        rowKey="id"
                        scroll={{ x: true }}
                        columns={columns}
                        dataSource={products} />
                </div >
                : <Card><Skeleton paragraph={{ rows: 7 }} active /></Card>

            }
        </>
    );
};

export default ProductTable; 
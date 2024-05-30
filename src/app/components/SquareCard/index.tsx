'use client'

import { Card, Image, Skeleton } from 'antd'
import Meta from 'antd/es/card/Meta'
import React from 'react'
import { ProductProps } from '../Types/product'

const SquareCard = ({ product }: { product: ProductProps | null }) => {

    return (
        <>
            {product! !== null ?
                <Card hoverable >
                    <Image className='object-cover object-top' src={product?.image_url[0] || '../../../../public/defaultImage.jpg'} />
                    <Meta title={product?.name || "Europe Street beat"} description={`Item sold: ${product?.num_purchases || 0}` || "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsa excepturi voluptatum error qui nemo officia."} />
                </Card>
                : <Card><Skeleton active /></Card>}
        </>
    )
}

export default SquareCard


import { Card } from 'antd';
import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';
import SquareCard from '../SquareCard';
import { ProductProps } from '../Types/product';

const GroupCard = () => {
    const [topSaleProduct, setTopSaleProduct] = useState<ProductProps | null>(null);
    const [leastSaleProduct, setLeastSaleProduct] = useState<ProductProps | null>(null);
    useEffect(() => {
        // Fetch the top sale product
        axios.get(process.env.NEXT_PUBLIC_TOP_SALE || '')
            .then(response => setTopSaleProduct(response.data))
            .catch(error => console.error("Error fetching top sale product:", error));

        // Fetch the least sale product
        axios.get(process.env.NEXT_PUBLIC_LEAST_SALE || '')
            .then(response => setLeastSaleProduct(response.data))
            .catch(error => console.error("Error fetching least sale product:", error));
    }, []);

    // Memoize the components to avoid re-renders
    const memoizedTopSaleProduct = useMemo(() => topSaleProduct, [topSaleProduct]);
    const memoizedLeastSaleProduct = useMemo(() => leastSaleProduct, [leastSaleProduct]);

    return (
        <>
            <h2 className='text-base font-medium mb-2'>Product Performance</h2>
            <div className=" grid grid-cols-1 sm:grid-cols-2 gap-2">
                <SquareCard product={memoizedTopSaleProduct} />
                <SquareCard product={memoizedLeastSaleProduct} />
            </div>
        </>
    )
}

export default GroupCard


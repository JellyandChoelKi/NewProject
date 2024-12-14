import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import '../../../css/Product/ProductList.css';
import { ProductCardProps } from '../../types/Product/productlist';


interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    discounted_price: number | null;
    quantity: number;
    image_url: string | null;
}

const ProductList: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/products');
                setProducts(response.data.slice(0, 10)); // 최대 10개의 제품을 가져옴
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="product-list">
            {products.map(product => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
};

export default ProductList;

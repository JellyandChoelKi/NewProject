import React, { useEffect, useState } from 'react';
import axios from '../../axios';
import LoginForm from './LoginForm';
import ProductAdmin from './ProductAdmin';
import ProductSwiper from './ProductSwiper';
import { Product } from '../../types/Product/productlist';
import '../../../css/Product/ProductList.css';
import { useNavigate } from 'react-router-dom';

const ProductList: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [warning, setWarning] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/products');
                setProducts(response.data.slice(0, 10));
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <header className="header">
                <div className="logo">
                    <h1><img src="/images/Logo.png" alt="Logo" title="Logo" /></h1>
                </div>
                <div className="login-form-container">
                    <LoginForm
                        setIsLoggedIn={setIsLoggedIn}
                        setIsAdmin={setIsAdmin}
                        setWarning={setWarning}
                        isLoggedIn={isLoggedIn}
                        isAdmin={isAdmin}
                        navigate={navigate}
                    />
                </div>
            </header>
            <section className="section">
                {warning && <div className="warning">{warning}</div>}
                <ProductAdmin setProducts={setProducts} isAdmin={isAdmin} /> {/* isAdmin 상태 전달 */}
                <ProductSwiper products={products} /> {/* Swiper 컴포넌트 추가 */}
            </section>
        </div>
    );
};

export default ProductList;

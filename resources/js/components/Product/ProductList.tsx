import React, { useEffect, useState } from 'react';
import axios from '../../axios';
import ProductCard from './ProductCard';
import LoginForm from './LoginForm';
import { Product,NewProduct} from '../../types/Product/productlist';
import '../../../css/Product/ProductList.css';

const ProductList: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [warning, setWarning] = useState<string | null>(null); // 경고 메시지 상태 추가
    const [newProduct, setNewProduct] = useState<NewProduct>({
        name: '',
        description: '',
        price: 0,
        discounted_price: null,
        quantity: 0,
        image_url: null,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/products');
                setProducts(response.data.slice(0, 10));
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        const checkAdmin = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const response = await axios.get('/api/check-admin'); 
                    setIsAdmin(response.data.is_admin);
                    setIsLoggedIn(true);
                } catch (error: any) {
                    if (axios.isAxiosError(error)){
                        if (error.response && error.response.status === 401) {
                            // console.warn('Unauthorized. Admin status check failed.');
                            // setWarning('관리자 확인에 실패했습니다. 로그인해 주세요.');
                        } else {
                            console.error('Error checking admin status:', error);
                        }
                    }else{
                        console.error('Unexpected error:', error);
                    }
                }
            }else{
                console.warn('No token found. Please log in.');
            }
        };

        fetchData();
        checkAdmin();
    }, []);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, files } = event.target;
        if (files && files.length > 0) {
            setNewProduct(prevState => ({ ...prevState, [name]: files[0] }));
        } else {
            setNewProduct(prevState => ({ ...prevState, [name]: value }));
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const formData = new FormData();
        Object.keys(newProduct).forEach(key => {
            formData.append(key, newProduct[key as keyof NewProduct] as any);
        });

        try {
            const token = localStorage.getItem('token');
            if (token) {
                const response = await axios.post('/api/products', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                setProducts([response.data, ...products]);
            }
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        setIsAdmin(false);
    };

    return (
        <div>
            <header className="header">
                <div className="logo">
                    <h1><img src="/images/Logo.png" alt="Logo" title="Logo" /></h1>
                </div>
                <div className="login-form-container">
                    {isLoggedIn ? (
                        <button onClick={handleLogout}>로그아웃</button>
                    ) : (
                        <LoginForm />
                    )}
                </div>
            </header>
            <section className="section">
                {warning && <div className="warning">{warning}</div>} {/* 경고 메시지 표시 */}
                {isLoggedIn && isAdmin && (
                    <form onSubmit={handleSubmit}>
                        <h2>제품 등록</h2>
                        <label>
                            제품명:
                            <input type="text" name="name" value={newProduct.name} onChange={handleInputChange} />
                        </label>
                        <label>
                            설명:
                            <input type="text" name="description" value={newProduct.description} onChange={handleInputChange} />
                        </label>
                        <label>
                            가격:
                            <input type="number" name="price" value={newProduct.price} onChange={handleInputChange} />
                        </label>
                        <label>
                            할인 가격:
                            <input type="number" name="discounted_price" value={newProduct.discounted_price || ''} onChange={handleInputChange} />
                        </label>
                        <label>
                            수량:
                            <input type="number" name="quantity" value={newProduct.quantity} onChange={handleInputChange} />
                        </label>
                        <label>
                            이미지:
                            <input type="file" name="image_url" onChange={handleInputChange} />
                        </label>
                        <button type="submit">등록</button>
                    </form>
                )}
                <div className="product-list">
                    {products.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default ProductList;

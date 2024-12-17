import React, { useState } from 'react';
import ProductForm from './ProductForm';
import { NewProduct } from '../../types/Product/ProductForm.d';
import { Product } from '../../types/Product/productlist.d'; 
import axios from '../../axios';
import '../../../css/Product/Modal.css'; // 모달 스타일을 위한 CSS 임포트

const ProductAdmin: React.FC<{ setProducts: React.Dispatch<React.SetStateAction<Product[]>>, isAdmin: boolean }> = ({ setProducts, isAdmin }) => {
    const [newProduct, setNewProduct] = useState<NewProduct>({
        name: '',
        description: '',
        price: 0,
        discounted_price: null,
        quantity: 0,
        image: null,
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setNewProduct(prevState => ({ ...prevState, [name]: value }));
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, files } = event.target;
        if (files && files.length > 0) {
            setNewProduct(prevState => ({ ...prevState, [name]: files[0] }));
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setErrorMessage(null);
        setSuccessMessage(null);

        if (!newProduct.image) {
            setErrorMessage('이미지를 등록해주세요.');
            return;
        }

        const formData = new FormData();
        Object.keys(newProduct).forEach(key => {
            formData.append(key, newProduct[key as keyof NewProduct] as any);
        });

        try {
            const token = localStorage.getItem('token');
            if (token) {
                const response = await axios.post('/products', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                setProducts(prevProducts => [response.data, ...prevProducts]);
                setNewProduct({
                    name: '',
                    description: '',
                    price: 0,
                    discounted_price: null,
                    quantity: 0,
                    image: null,
                });
                setIsModalOpen(false); // 폼 제출 후 모달 닫기
                setSuccessMessage('상품 등록이 완료되었습니다.');
            }
        } catch (error: any) {
            console.error('Error adding product:', error);
            const errors = error.response?.data?.errors || {};
            const errorMessage = errors.image ? errors.image[0] : '상품 등록 중 오류가 발생했습니다.';
            setErrorMessage(errorMessage);
        }
    };

    const openModal = () => {
        if (isAdmin) {
            setIsModalOpen(true);
        } else {
            alert('관리자 계정만 등록이 가능합니다. 관리자 계정으로 진행해주세요.');
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setErrorMessage(null);
        setSuccessMessage(null);
    };

    return (
        <div>
            <button className="open-modal-button" onClick={openModal}>제품 등록</button>
            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close-button" onClick={closeModal}>&times;</span>
                        <ProductForm
                            newProduct={newProduct}
                            handleInputChange={handleInputChange}
                            handleFileChange={handleFileChange} // 파일 변경 핸들러 추가
                            handleSubmit={handleSubmit}
                            errorMessage={errorMessage}
                            successMessage={successMessage}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductAdmin;

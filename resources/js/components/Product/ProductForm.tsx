import React from 'react';
import { ProductFormProps } from '../../types/Product/ProductForm.d';
import '../../../css/Product/ProductForm.css'; // CSS 파일을 임포트

const ProductForm: React.FC<ProductFormProps> = ({ newProduct, handleInputChange, handleFileChange, handleSubmit, errorMessage, successMessage }) => {
    return (
        <form onSubmit={handleSubmit} className="product-form">
            <h2>제품 등록</h2>
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            {successMessage && <div className="alert alert-success">{successMessage}</div>}
            <div className="form-group">
                <label>제품명:</label>
                <input type="text" name="name" value={newProduct.name} onChange={handleInputChange} />
            </div>
            <div className="form-group">
                <label>설명:</label>
                <input type="text" name="description" value={newProduct.description} onChange={handleInputChange} />
            </div>
            <div className="form-group">
                <label>가격:</label>
                <input type="number" name="price" value={newProduct.price} onChange={handleInputChange} />
            </div>
            <div className="form-group">
                <label>할인 가격:</label>
                <input type="number" name="discounted_price" value={newProduct.discounted_price || ''} onChange={handleInputChange} />
            </div>
            <div className="form-group">
                <label>수량:</label>
                <input type="number" name="quantity" value={newProduct.quantity} onChange={handleInputChange} />
            </div>
            <div className="form-group">
                <label>이미지:</label>
                <input type="file" name="image" onChange={handleFileChange} />
            </div>
            <button type="submit" className="submit-button">등록</button>
        </form>
    );
};

export default ProductForm;

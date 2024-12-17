import React from 'react';
import { ProductCardProps } from '../../types/Product/productlist.d';
import '../../../css/Product/ProductCard.css'; // CSS 파일을 임포트

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const price = Number(product.price).toFixed(2);
    const discountedPrice = product.discounted_price ? Number(product.discounted_price).toFixed(2) : null;

    return (
        <div className="product-card">
            <div className="product-image-container">
                <img className="product-image" src={product.image || '/default-image.jpg'} alt={product.name} />
            </div>
            <div className="product-details">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-description">{product.description}</p>
                <div className="product-price">
                    {discountedPrice && (
                        <>
                            <span className="original-price">${price}</span>
                            <span className="discounted-price">${discountedPrice}</span>
                        </>
                    )}
                    {!discountedPrice && <span>${price}</span>}
                </div>
                <p className={`product-quantity ${product.quantity < 6 ? 'low-stock' : ''}`}>
                    수량: {product.quantity} {product.quantity < 6 && <span className="low-stock-text">(품절임박)</span>} 
                </p>
                <button className="buy-button">구매하기</button>
            </div>
        </div>
    );
};

export default ProductCard;

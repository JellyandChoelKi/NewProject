import React from 'react';
import { ProductCardProps } from '../../types/Product/productlist';

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    return (
        <div className="product-card">
            {product.image_url && (
                <img src={product.image_url} alt={product.name} className="product-image" />
            )}
            <div className="product-details">
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p className="product-price">
                    {product.discounted_price ? (
                        <>
                            <span className="original-price">${product.price.toFixed(2)}</span>
                            <span className="discounted-price">${product.discounted_price.toFixed(2)}</span>
                        </>
                    ) : (
                        `$${product.price.toFixed(2)}`
                    )}
                </p>
                <p className="product-quantity">In Stock: {product.quantity}</p>
            </div>
        </div>
    );
};

export default ProductCard;

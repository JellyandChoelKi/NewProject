import React from 'react';
import { ProductCardProps } from '../../types/Product/productlist';

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const price = Number(product.price).toFixed(2);
    const discountedPrice = product.discounted_price ? Number(product.discounted_price).toFixed(2) : null;

    return (
        <div className="product-card">
            <img src={product.image_url || '/default-image.jpg'} alt={product.name} />
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>Price: ${price}</p>
            {discountedPrice && <p>Discounted Price: ${discountedPrice}</p>}
            <p>Quantity: {product.quantity}</p>
        </div>
    );
};

export default ProductCard;

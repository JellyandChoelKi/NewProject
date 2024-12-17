import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade'; // 효과 스타일 임포트
import { Navigation, Pagination, EffectFade } from 'swiper/modules';
import { Product } from '../../types/Product/productlist';
import ProductCard from './ProductCard';
import '../../../css/Product/ProductSwiper.css'; // CSS 파일 임포트

interface ProductSwiperProps {
    products: Product[];
}

const ProductSwiper: React.FC<ProductSwiperProps> = ({ products }) => {
    return (
        <div className="product-swiper">
            <h2>#오늘의 추천 등록 제품</h2>
            <Swiper
                spaceBetween={20}
                slidesPerView={3}
                navigation
                pagination={{ clickable: true }}
                effect="fade" // 페이드 효과 추가
                modules={[Navigation, Pagination, EffectFade]}
                className="custom-swiper"
            >
                {products.map((product) => (
                    <SwiperSlide key={product.id}>
                        <ProductCard product={product} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default ProductSwiper;

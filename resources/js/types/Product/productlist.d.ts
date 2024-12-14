export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    discounted_price: number | null;  // 여기에 discounted_price 필드를 추가합니다.
    quantity: number;
    image_url: string | null;
}

export interface ProductCardProps {
    product: {
        id: number;
        name: string;
        description: string;
        price: number;
        discounted_price: number | null;
        quantity: number;
        image_url: string | null;
    };
}

export interface NewProduct { 
    name: string; 
    description: string; 
    price: number;
    discounted_price: number | null; 
    quantity: number; 
    image_url: File | null;
}
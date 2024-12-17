export interface NewProduct {
    name: string;
    description: string;
    price: number;
    discounted_price?: number | null;
    quantity: number;
    image?: File | null;
}

export interface ProductFormProps {
    newProduct: NewProduct;
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (event: React.FormEvent) => void;
    errorMessage: string | null;
    successMessage: string | null;
}

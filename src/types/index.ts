export interface IProduct {
    id: string;
    title: string;
    description: string;
    image: string;
    category: string;
    price: number | null;
}

export interface IBasket {
    items: string[];
    totalPrice: number;
}

export interface IOrder {
    address: string;
    status: string;
    email: string;
    phone: string;
    items: string[];
    total: number;
}

export interface IOrderResult {
    id: string;
    total: number;
}

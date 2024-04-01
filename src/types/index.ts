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
    total: number;
}

export type PaymentMethod = 'cash' | 'card';

export interface IOrder {
    address: string;
    payment: PaymentMethod;
    email: string;
    phone: string;
    items: string[];
    total: number;
}

export type OrderForm = Omit<IOrder, 'total' | 'items'>

export interface IOrderResult {
    id: string;
    total: number;
}

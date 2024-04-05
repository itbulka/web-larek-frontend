import {IBasket, IOrder, IProduct, OrderForm, PaymentMethod} from "../types";
import {EventEmitter} from "./base/Events";

export type FormErrors = Partial<Record<keyof IOrder, string>>;

export class AppData {
    items: IProduct[] = [];

    basket: IBasket = {
        items: [],
        total: 0
    };

    order: IOrder = {
        address: '',
        payment: 'online',
        email: '',
        phone: '',
        items: [],
        total: 0
    }

    preview: IProduct = null;

    formErrors: FormErrors = {};

    constructor(protected events: EventEmitter) {
    }

    setItems(items: IProduct[]) {
        console.log(items);
        this.items = items;
        this.events.emit('items:change', this.items);
    }

    setPreview(item: IProduct) {
        this.preview = item;
        this.events.emit('preview:change', item);
    }

    // Проверить есть ли товар в корзине
    inBasket(item: IProduct): boolean {
        return this.basket.items.includes(item.id);
    }

    // Добавить в корзину
    addBasket(item: IProduct) {
        this.basket.items.push(item.id);
        this.basket.total += item.price;
        this.events.emit('basket:change', this.basket);
    }

    // Удалить из корзины
    removeBasket(item: IProduct) {
        this.basket.items = this.basket.items.filter(id => id !== item.id);
        this.basket.total -= item.price;
        this.events.emit('basket:change', this.basket);
    }

    // Очистить корзину
    clearBasket() {
        this.basket.items = [];
        this.basket.total = 0;
        this.events.emit('basket:change', this.basket);
    }

    // Заполнить поля заказа
    setOrderField(field: keyof OrderForm, value: string) {
        if (field === 'payment') {
            this.order.payment = value as PaymentMethod;
        } else {
            this.order[field] = value;
        }

        console.log(this.order)

        if (this.order.payment && this.validationField()) {
            this.order.items = this.basket.items;
            this.order.total = this.basket.total;
            this.events.emit('order:ready', this.order);
        }

    }

    // Проверить валидацию полей
    validationField(): boolean {
        const errors: typeof this.formErrors = {};
        if(!this.order.address) {
            errors.address = 'Необходимо указать адрес'
        }
        if (!this.order.email) {
            errors.email = 'Необходимо указать email';
        }
        if (!this.order.phone) {
            errors.phone = 'Необходимо указать телефон';
        }
        this.formErrors = errors;
        this.events.emit('formErrors:change', this.formErrors);
        return Object.keys(errors).length === 0;

        console.log(errors);
    }

}

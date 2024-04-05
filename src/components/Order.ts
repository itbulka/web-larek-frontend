import {Form} from "./common/Form";
import {IOrder, OrderForm, PaymentMethod} from "../types";
import {EventEmitter} from "./base/Events";
import {ensureElement} from "../utils/utils";

export class Order extends Form<OrderForm> {
    protected _paymentCard: HTMLButtonElement;
    protected _paymentCash: HTMLButtonElement;

    constructor(events: EventEmitter, container: HTMLFormElement) {
        super(events, container);

        this._paymentCard = ensureElement<HTMLButtonElement>('.button_alt[name=card]', this.container);
        this._paymentCash = ensureElement<HTMLButtonElement>('.button_alt[name=cash]', this.container);

        this._paymentCard.addEventListener('click', () => {
            this.payment = 'online';
            this.emitChanges('payment', 'online')
        })

        this._paymentCash.addEventListener('click', () => {
            this.payment = 'cash';
            this.emitChanges('payment', 'cash')
        })

    }

    set address(value: string) {
        (this.container.elements.namedItem('address') as HTMLInputElement).value = value;
    }

    set payment(value: PaymentMethod) {
        this.toggleClass(this._paymentCard, 'button_alt-active', value === 'online');
        this.toggleClass(this._paymentCash, 'button_alt-active', value === 'cash');
    }
}

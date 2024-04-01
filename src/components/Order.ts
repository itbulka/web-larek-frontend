import {Form} from "./common/Form";
import {IOrder, PaymentMethod} from "../types";
import {EventEmitter} from "./base/events";
import {ensureElement} from "../utils/utils";

class Order extends Form<IOrder> {
    protected _paymentCard: HTMLButtonElement;
    protected _paymentCash: HTMLButtonElement;

    constructor(events: EventEmitter, container: HTMLFormElement) {
        super(events, container);

        this._paymentCard = ensureElement<HTMLButtonElement>('.button[name=card]', this.container);
        this._paymentCash = ensureElement<HTMLButtonElement>('.button[name=cash]', this.container);

        this._paymentCard.addEventListener('click', () => {
            this.payment = 'card';
            this.emitChanges('payment', 'card')
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
        this._paymentCard.classList.toggle('button_alt-active', value === 'card');
        this._paymentCash.classList.toggle('button_alt-active', value === 'cash');
    }
}

import {View} from "../base/View";
import {IOrderResult} from "../../types";
import {EventEmitter} from "../base/events";
import {ensureElement} from "../../utils/utils";

class Success extends View<IOrderResult> {
    protected _total: HTMLElement;
    protected _button: HTMLElement;

    constructor(events: EventEmitter, container: HTMLElement) {
        super(events, container);

        this._total = ensureElement('.order-success__description', this.container);
        this._button = ensureElement('.order-success__close', this.container);

        this._button.addEventListener('click', event => {
            this.events.emit('order:result');
        })

    }

    set total(value: number) {
        this.setText(this._total, `Списано ${String(value)} синапсов`);
    }
}

import {View} from "./base/View";
import {IProduct} from "../types";
import {EventEmitter} from "./base/Events";
import {ensureElement} from "../utils/utils";

interface IPageData {
    catalog: HTMLElement[];
    counter: number;
    locked: boolean;
}

export class Page extends View<IPageData> {
    protected _counter: HTMLElement;
    protected _catalog: HTMLElement;
    protected _wrapper: HTMLElement;
    protected _basket: HTMLElement;

    constructor(events: EventEmitter, container: HTMLElement) {
        super(events, container);

        this._counter = ensureElement('.header__basket-counter');
        this._catalog = ensureElement('.gallery');
        this._wrapper = ensureElement('.page__wrapper');
        this._basket = ensureElement('.header__basket');

        this._basket.addEventListener('click', () => {
            this.events.emit('basket:open');
        })

    }

    set catalog(items: HTMLElement[]) {
        this._catalog.replaceChildren(...items);
    }

    set counter(value: number) {
        this.setText(this._counter, String(value));
    }

    set locked(value: boolean) {
        if (value) {
            this._wrapper.classList.add('page__wrapper_locked');
        } else {
            this._wrapper.classList.remove('page__wrapper_locked');
        }
    }

}

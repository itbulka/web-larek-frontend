import {View} from "../base/View";
import {EventEmitter} from "../base/events";
import {ensureElement} from "../../utils/utils";

interface IModalData {
    content: HTMLElement;
}

export class Modal extends View<IModalData> {
    protected _button: HTMLButtonElement;
    protected _content: HTMLElement;

    constructor(events: EventEmitter, container: HTMLElement) {
        super(events, container);

        this._button = ensureElement<HTMLButtonElement>('.modal__close', container);
        this._content = ensureElement('.modal__content', container);


    }

    set content(value: HTMLElement) {
        this._content.replaceChildren(value);
    }

    open() {
        this.container.classList.add('modal_active');
        this.events.emit('modal:open');
    }

    close() {
        this.container.classList.remove('modal_active');
        this.content = null;
        this.events.emit('modal:close');
    }

}

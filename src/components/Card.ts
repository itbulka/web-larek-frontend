import {Component} from "./base/Component";
import {IProduct} from "../types";
import {ensureElement} from "../utils/utils";

interface ICardAction {
    onClick: () => void;
}

class Card extends Component<IProduct> {
    protected _title: HTMLElement;
    protected _price: HTMLElement;
    protected _image: HTMLImageElement;
    protected _description?: HTMLElement;
    protected _category?: HTMLElement;
    protected _button?: HTMLElement;

    constructor(container: HTMLElement, action: ICardAction) {
        super(container);

        this._title = ensureElement('.card__title', this.container);
        this._price = ensureElement('.card__price', this.container);
        this._image = ensureElement<HTMLImageElement>('.card__image', this.container);
        this._description = ensureElement('.card__text', this.container);
        this._category = ensureElement('.card__category', this.container);
        this._button = ensureElement('.card__button', this.container);

        this._button.addEventListener('click', action.onClick.bind(this));

    }

    set title(value: string) {
        this.setText(this._title, value);
    }

    set price(value: number) {
        this.setText(this._price, String(value));
    }

    set image(value: string) {
        this.setImage(this._image, value);
    }

    set description(value: string) {
        this.setText(this._description, value);
    }

    set category(value: string) {
        this.setText(this._category, value);
    }

    set button(value: string) {
        this.setText(this._button, value);
    }


}

import {Component} from "./base/Component";
import {colorCategory, IProduct} from "../types";
import {ensureElement} from "../utils/utils";

interface ICardAction {
    onClick: (event: MouseEvent) => void;
}

export class Card extends Component<IProduct> {
    protected _title: HTMLElement;
    protected _price: HTMLElement;
    protected _image?: HTMLImageElement;
    protected _description?: HTMLElement;
    protected _category?: HTMLElement;
    protected _button?: HTMLElement;

    constructor(container: HTMLElement, action?: ICardAction) {
        super(container);

        this._title = ensureElement('.card__title', container);
        this._price = ensureElement('.card__price', container);
        this._image = container.querySelector('.card__image');
        this._description = container.querySelector('.card__text');
        this._category = container.querySelector('.card__category');
        this._button = container.querySelector('.card__button');

        if (action?.onClick) {
            if (this._button) {
                this._button.addEventListener('click', action.onClick);
            } else {
                container.addEventListener('click', action.onClick);
            }
        }

    }

    set id(value: string) {
        this.container.dataset.id = value;
    }

    get id(): string {
        return this.container.dataset.id || '';
    }

    set title(value: string) {
        this.setText(this._title, value);
    }

    get title(): string {
        return this._title.textContent || '';
    }

    set price(value: string) {
        this.setDisabled(this._button, !value);
        this.setText(this._price, value ? `${value} синапсов` : 'Нельзя купить');
    }

    get price(): string {
        return this._price.textContent || '';
    }

    set category(value: string) {
        if (this._category) {
            this._category.className = ''
            this._category.classList.add('card__category', `card__category_${colorCategory.get(value)}`);
        }
        this.setText(this._category, value);
    }

    get category(): string {
        return this._category.textContent || '';
    }

    set image(value: string) {
        this.setImage(this._image, value, this.title)
    }

    set description(value: string) {
        this.setText(this._description, value);
    }

    set button(value: string) {
        this.setText(this._button, value);
    }

}

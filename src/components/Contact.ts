import {Form} from "./common/Form";
import {IOrder} from "../types";
import {EventEmitter} from "./base/events";

class Contact extends Form<IOrder> {
    constructor(events: EventEmitter, container: HTMLFormElement) {
        super(events, container);
    }

    set phone(value: string) {
        (this.container.elements.namedItem('phone') as HTMLInputElement).value = value;
    }

    set email(value: string) {
        (this.container.elements.namedItem('email') as HTMLInputElement).value = value;
    }

}

import {Component} from "./Component";
import {EventEmitter} from "./Events";

export class View<T> extends Component<T> {
    constructor(protected events: EventEmitter, container: HTMLElement) {
        super(container);
    }

}

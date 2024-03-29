import {View} from "../base/View";
import {EventEmitter} from "../base/events";
import {ensureAllElements, ensureElement} from "../../utils/utils";

interface IFormState {
    valid: boolean;
}

export class Form<T> extends View<IFormState> {
    protected _submit: HTMLButtonElement;

    constructor(events: EventEmitter, protected container: HTMLFormElement) {
        super(events, container);

        this._submit = ensureElement<HTMLButtonElement>('button[type=submit]', this.container);

        this.container.addEventListener('input', (event) => {
            const target = event.target as HTMLInputElement;
            const name = target.name as keyof T;
            const value = target.value;
            this.emitChanges(name, value);
        })

        this.container.addEventListener('submit', (event) => {
            event.preventDefault()
            this.events.emit(`${this.container.name}:submit`);
        })

    }

    emitChanges(inputName: keyof T, value: string) {
        this.events.emit(`${this.container.name}.${String(inputName)}:change`, { inputName, value});
    }

    set valid(value: boolean) {
        this._submit.disabled = !value;
    }

    render(state: Partial<T> & IFormState) {
        const {valid, ...inputs} = state;
        super.render({ valid });
        Object.assign(this, inputs);
        return this.container;
    }

}

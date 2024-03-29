export abstract class Component<T> {
    protected constructor(protected container: HTMLElement) {
    }

    toggleClass(element: HTMLElement, className: string){
        element.classList.toggle(className);
    }

    setHidden(element: HTMLElement) {
        element.style.display = 'none';
    }

    setVisible(element: HTMLElement) {
        element.style.removeProperty('display');
    }

    setText(element: HTMLElement, value: string) {
        element.textContent = value
    }

    setImage(element: HTMLImageElement, src: string, alt?: string) {
        if (element) {
            element.src = src;
            element.src = alt ?? '';
        }
    }

    setDisabled(element: HTMLElement, state: boolean) {
        if (element) {
            if (state) element.setAttribute('disabled', 'disabled');
            else element.removeAttribute('disabled');
        }
    }

    render(data?: Partial<T>): HTMLElement {
        Object.assign(this as object, data ?? {})
        return this.container;
    }

}

import './scss/styles.scss';
import {WebLarekApi} from "./components/WebLarekApi";
import {API_URL, CDN_URL} from "./utils/constants";
import {EventEmitter} from "./components/base/events";
import {cloneTemplate, ensureElement} from "./utils/utils";
import {Page} from "./components/Page";
import {Modal} from "./components/common/Modal";
import {Order} from "./components/Order";
import {Contact} from "./components/Contact";
import {Basket} from "./components/common/Basket";
import {AppData, FormErrors} from "./components/AppData";
import {IBasket, IOrder, IProduct, OrderForm} from "./types";
import {Card} from "./components/Card";
import {data} from "autoprefixer";
import {Success} from "./components/common/Success";

const modalTemplate = ensureElement<HTMLElement>('#modal-container');
const successTemplate = ensureElement<HTMLTemplateElement>('#success');
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');

const api = new WebLarekApi(CDN_URL, API_URL);
const events = new EventEmitter();
const appData = new AppData(events);

const page = new Page(events, document.body);
const modal = new Modal(events, modalTemplate);

const basket = new Basket(events, cloneTemplate(basketTemplate));

const orderForm = new Order(events, cloneTemplate(orderTemplate));
const contactsForm = new Contact(events, cloneTemplate(contactsTemplate));

const success = new Success(events, cloneTemplate(successTemplate));

events.on('order:result', () => {
    appData.clearBasket();
    modal.close();
})

events.on('contacts:submit', () => {
    api.createOrder(appData.order)
        .then(result => {
            modal.render({
                content: success.render({
                    total: result.total,
                })
            })
        })
        .catch(err => console.log(err))
})

events.on('order:submit', () => {
    modal.render({
        content: contactsForm.render({
            phone: '',
            email: '',
            valid: false,
            errors: []
        })
    })
})

events.on('formErrors:change', (error: FormErrors) => {
    const {address, payment, email, phone} = error;
    orderForm.valid = !address && !payment;
    contactsForm.valid = !email && !phone;
})

events.on(/^contacts\..*:change/, (data: {inputName: keyof OrderForm, value: string}) => {
    appData.setOrderField(data.inputName, data.value);
})

events.on(/^order\..*:change/, (data: {inputName: keyof OrderForm, value: string}) => {
    appData.setOrderField(data.inputName, data.value);
})

events.on('order:open', () => {
    modal.render({
        content: orderForm.render({
            address: '',
            payment: 'online',
            valid: false,
            errors: [],
        })
    })
})

events.on('basket:open', () => {
    modal.render({
        content: basket.render()
    })
})

events.on('basket:change', () => {
    page.counter = appData.basket.items.length;

    basket.items = appData.basket.items.map(id => {
        const item = appData.items.find(item => item.id === id);

        const card = new Card(cloneTemplate(cardBasketTemplate), {
            onClick: () => {
                appData.removeBasket(item);
            }
        })

        return card.render(item);
    })

    basket.total = appData.basket.total;
})

events.on('preview:change', (item: IProduct) => {
    const card = new Card(cloneTemplate(cardPreviewTemplate), {
        onClick: () => {
            if(appData.inBasket(item)) {
                appData.removeBasket(item);
                card.button = 'В корзину';
            } else {
                appData.addBasket(item)
                card.button = 'Убрать из корзины';
            }
        }
    })

    card.button = appData.inBasket(item) ? 'Убрать из корзины' : 'В корзину';

    modal.render({
        content: card.render(item)
    })
})

events.on('card:select', (item: IProduct) => {
    appData.setPreview(item);
})

events.on('items:change', (items: IProduct[]) => {
    page.catalog = items.map(item => {
        const card = new Card(cloneTemplate(cardCatalogTemplate), {
            onClick: () => {
                events.emit('card:select', item);
            }
        })
        return card.render(item);
    })
})

events.on('modal:open', () => {
    page.locked = true;
})

events.on('modal:close', () => {
    page.locked = false;
})

api.getProducts()
    .then(appData.setItems.bind(appData))
    .catch(err => console.log(err));

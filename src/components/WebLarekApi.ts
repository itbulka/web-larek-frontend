import {Api} from "./base/api";
import {IOrder, IOrderResult, IProduct} from "../types";

export type ApiListResponse<Type> = {
    total: number,
    items: Type[]
};

export interface IWebLarekApiAPI {
    getProducts: () => Promise<IProduct[]>;
    getProduct: (id: string) => Promise<IProduct>;
    createOrder: (item: IOrder) => Promise<IOrderResult>;
}

export class WebLarekApi extends Api implements IWebLarekApiAPI {
    readonly cdn: string;

    constructor(cdn: string, baseUrl: string, options?: RequestInit) {
        super(baseUrl, options);
        this.cdn = cdn;
    }

    getProducts(): Promise<IProduct[]> {
        return this.get('/product').then((data: ApiListResponse<IProduct>) =>
            data.items.map((item) => ({
                ...item,
                image: this.cdn + item.image
            }))
        );
    }

    getProduct(id: string): Promise<IProduct> {
        return this.get(`/lot/${id}`).then(
            (item: IProduct) => ({
                ...item,
                image: this.cdn + item.image,
            })
        );
    }

    createOrder(item: IOrder): Promise<IOrderResult> {
        return this.post('/order', item).then(
            (data: IOrderResult) => data
        );
    }

}

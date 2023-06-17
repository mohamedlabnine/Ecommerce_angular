import { Customer } from "./customer";
import { Product } from "./product";

export interface Order {
    id: number
    customer: Customer;
    amount: number;
    date: Date;
    products: Array<Product>;
}

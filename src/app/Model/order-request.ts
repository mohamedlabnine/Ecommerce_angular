export class OrderRequest {
    id_customer: number;
    amount: number;
    date: Date;
    list_product_id: Array<number>;

    constructor(id_customer: number,
        amount: number,
        date: Date,
        list_product_id: Array<number>) {
        this.id_customer = id_customer;
        this.amount = amount;
        this.date = date;
        this.list_product_id = list_product_id;
    }


}

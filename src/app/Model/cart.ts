export class Cart {
    product_id: number
    product_name: string
    product_image: string
    price: number
    quantiy: number
    constructor(product_id: number, name: string, image: string, price: number, quantity: number) {
        this.product_id = product_id
        this.product_name = name
        this.product_image = image
        this.price = price
        this.quantiy = quantity
    }

}

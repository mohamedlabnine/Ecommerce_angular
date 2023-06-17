export class Product {
    Tostring(): any {
      throw new Error('Method not implemented.')
    }
    id!: number
    name: string
    description: string
    category: string
    offer: number
    quantity: number
    price: number
    image: string

    public constructor(name: string, description: string,
        category: string, offer: number, quantity: number, price: number,
        image: string, id?: number) {
        if (id) {
            this.id = id
        }
        this.name = name
        this.description = description
        this.category = category
        this.offer = offer
        this.quantity = quantity
        this.price = price
        this.image = image
    }

}

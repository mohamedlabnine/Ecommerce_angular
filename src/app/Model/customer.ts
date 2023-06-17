export class Customer {
    firstname: string
    lastname: string
    email: string
    password: string
    id: number | undefined
    role: string
    code: string
    constructor(
        firstname: string,
        lastname: string,
        email: string,
        password: string,
        role?: string, id?: number) {
        this.firstname = firstname
        this.lastname = lastname
        this.password = password
        this.email = email
        if (id && role) {
            this.id = id
            this.role = role
        }
        this.role = "USER"
        this.code = (Math.floor(Math.random() * 10) + 1000).toString()


    }
}


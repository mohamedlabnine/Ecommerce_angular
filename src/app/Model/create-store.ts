export class CreateStore {
    name: string
    email: string
    code_verification: string
    constructor(name: string,
        email: string,
        code_verification: string) {
        this.name = name
        this.email = email
        this.code_verification = code_verification

    }
}

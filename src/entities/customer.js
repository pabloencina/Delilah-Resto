import { InvalidObjectError } from "../error.js";
export class Customer {
    constructor(customerId, address,  userId, name, surname, email, phone, password) {
        this.customerId = customerId;
        this.address = address;
        this.user = {
            "userId": userId,
            "name": name,
            "surname": surname,
            "email": email,
            "phone": phone,
            "password": password
        }
    }

    static validate(object) {

        if (object.address === null || object.address === undefined) {
            throw new InvalidObjectError("address can't be null or udefined");
        } else if
            (!(typeof object.address === 'string')) {
            throw new InvalidObjectError("address must be a string");
        }

        if (object.user === null || object.user === undefined) {
            throw new InvalidObjectError("user can't be null or udefined");
        } else if
            (!(typeof object.user === 'string')) {
            throw new InvalidObjectError("user must be a string");
        }

        if (object.userId === null || object.userId === undefined) {
            throw new InvalidObjectError("userId can't be null or udefined");
        } else if (!(typeof object.userId === 'number')) {
            throw new InvalidObjectError("userId must be a number");
        } else if (object.userId < 0) {
            throw new InvalidObjectError("userId can't be 0 or minor");
        }

        if (object.name === null || object.name === undefined) {
            throw new InvalidObjectError("name can't be null or udefined");
        } else if (!(typeof object.name === 'string')) {
            throw new InvalidObjectError("name must be a string");
        }

        if (object.surname === null || object.surname === undefined) {
            throw new InvalidObjectError("surname can't be null or udefined");
        } else if (!(typeof object.surname === 'string')) {
            throw new InvalidObjectError("surname must be a string");
        }

        if (object.email === null || object.email === undefined) {
            throw new InvalidObjectError("email can't be null or udefined");
        } else if
            (!(typeof object.email === 'string')){
            throw new InvalidObjectError("email must be a string");
        }

        if (object.phone === null || object.phone === undefined) {
            throw new InvalidObjectError("phone can't be null or udefined");
        } else if (!(typeof object.phone === 'number')) {
            throw new InvalidObjectError("phone must be a number");
        } else if (object.phone < 0) {
            throw new InvalidObjectError("phone can't be 0 or minor");
        }

        if (object.password === null || object.password === undefined) {
            throw new InvalidObjectError("password can't be null or udefined");
        } else if
            (!(typeof object.password === 'string')) {
            throw new InvalidObjectError("password must be a string");
        }
    }
}

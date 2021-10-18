import { InvalidObjectError } from "../error.js";

export class User {
    constructor(userId, name, surname, email, phone, password, admin) {

        this.userId = userId;
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.phone = phone;
        this.password = password;
        this.admin = admin;

    }

    static validate(object) {

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
            (!(typeof object.email === 'string')) {
            throw new InvalidObjectError("email must be a string");
        }
        
                if (object.phone === null || object.phone === undefined) {
                    throw new InvalidObjectError("phone can't be null or udefined");
                } else if (!(typeof object.phone === 'string')) {
                    throw new InvalidObjectError("phone must be a string");
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

import { InvalidObjectError } from "../error.js";

export class Customer {
    constructor(customerId, address, user) {
        this.customerId = customerId;
        this.address = address;
        this.user = user;
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
        }

    }
}

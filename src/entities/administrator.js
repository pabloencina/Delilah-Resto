import { InvalidObjectError } from "../error.js";

export class Administrator {
    
    constructor(administratorId, identificationNumber, user) {

        this.administratorId = administratorId;
        this.identificationNumber = identificationNumber;
        this.user = user;

    }

    static validate(object) {

        if (object.identificationNumber === null || object.identificationNumber === undefined) {
            throw new InvalidObjectError("identificationNumber can't be null or udefined");
        } else if
            (!(typeof object.identificationNumber === 'string')) {
            throw new InvalidObjectError("identificationNumber must be a string");
        }

        if (object.user === null || object.user === undefined) {
            throw new InvalidObjectError("user can't be null or udefined");
        }

    }
}
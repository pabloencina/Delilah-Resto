import { InvalidIdError } from "../error.js"

export const validateId = (id) => {

    if (id === null || id === undefined) {
        throw new InvalidIdError("Id can't be null or undefined.");
    }
    let idNum = parseInt(id);
    console.log(idNum);
    if (isNaN(idNum)) {
        throw new InvalidIdError("Id must be a number.");
    }
    if (idNum <= 0) {
        throw new InvalidIdError("Id can't be 0 or minor.");
    }

    return idNum;

}
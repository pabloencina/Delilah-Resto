import { InvalidObjectError } from "../error.js";
export class Product {
    constructor(productId, productNumber, productName, productPrice, productPhoto) {
        this.productId = productId;
        this.productNumber = productNumber;
        this.productName = productName;
        this.productPrice = productPrice;
        this.productPhoto = productPhoto;
    }

    static validate(object) {

        //product.productNumber
        if (object.productNumber === null || object.productNumber === undefined) {
            throw new InvalidObjectError("productNumber can't be null or udefined");
        } else if (!(typeof object.productNumber === 'number')) {
            throw new InvalidObjectError("productNumber must be a number");
        } else if (object.productNumber < 0) {
            throw new InvalidObjectError("productNumber can't be 0 or minor");
        }

         //product.productName
         if (object.productName === null || object.productName === undefined) {
            throw new InvalidObjectError("productName can't be null or udefined");
        } else if (!(typeof object.productName === 'string')) {
            throw new InvalidObjectError("productName must be a string");
        }
    
        //object.productPrice
        if (object.productPrice === null || object.productPrice === undefined) {
            throw new InvalidObjectError("productPrice can't be null or udefined");
        } else if (!(typeof object.productPrice === 'number')) {
            throw new InvalidObjectError("productPrice must be a number");
        }else if (object.productPrice < 0) {
            throw new InvalidObjectError("productPrice can't be 0 or minor");
        }
    }
}
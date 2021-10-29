import { InvalidObjectError } from "../error.js";

export class OrderDetails {
    constructor(orderDetailId, productPrice, productQuantify,product) {
        this.orderDetailId = orderDetailId;
        this.productPrice = productPrice;
        this. productQuantify =  productQuantify;
        this.product = product
    }

    static validate(object) {

        if (object.productPrice === null || object.productPrice === undefined) {
            throw new InvalidObjectError("productPrice can't be null or udefined");
        } else if
            (!(typeof object.productPrice === 'number')) {
            throw new InvalidObjectError("productPrice must be a number");
        }

        if (object.productQuantify === null || object.productQuantify === undefined) {
            throw new InvalidObjectError("productQuantify can't be null or udefined");
        } else if
            (!(typeof object.productQuantify === 'number')) {
            throw new InvalidObjectError("productQuantify must be a number");
        }

        if (object.product === null || object.product === undefined) {
            throw new InvalidObjectError("product can't be null or udefined");
        }

    }
}

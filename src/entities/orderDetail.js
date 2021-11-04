import { validateId } from "../controllers/idValidator.js";
import { InvalidObjectError } from "../error.js";

export class OrderDetail {
    constructor(orderDetailId, productPrice, productQuantify, productId) {
        this.orderDetailId = orderDetailId;
        this.productPrice = productPrice;
        this.productQuantify =  productQuantify;
        this.productId = productId
    }

    static validate(object) {

        if (object.productPrice === null || object.productPrice === undefined) {

            throw new InvalidObjectError("productPrice can't be null or udefined");

        } else if
            (!(typeof object.productPrice === 'number')) {

            throw new InvalidObjectError("productPrice must be a number");

        }

        if (object.productQuantity === null || object.productQuantity === undefined) {

            throw new InvalidObjectError("productQuantity can't be null or udefined");

        } else if
            (!(typeof object.productQuantity === 'number')) {

            throw new InvalidObjectError("productQuantity must be a number");
            
        }

        validateId(object.productId);

    }
}

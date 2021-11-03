import { InvalidObjectError } from "../error.js";

export class Order {
    
    constructor(orderNumber, description, address, totalPrice, customerId, paymentMethod, orderState, orderDetails) {
        this.orderNumber = orderNumber;
        this.description = description;
        this.address = address;
        this.totalPrice = totalPrice;
        this.customerId = customerId;
        this.paymentMethod = paymentMethod;
        this.orderState = orderState;
        this.orderDetails = orderDetails
    }

    static validate(object) {

        if (object.orderNumber === null || object.orderNumber === undefined) {
            throw new InvalidObjectError("orderNumber can't be null or udefined");
        } else if
            (!(typeof object.orderNumber === 'number')) {
            throw new InvalidObjectError("orderNumber must be a number");
        }

        if (object.description === null || object.description === undefined) {
            throw new InvalidObjectError("address can't be null or udefined");
        } else if
            (!(typeof object.description === 'string')) {
            throw new InvalidObjectError("description must be a string");
        }

        if (object.address === null || object.address === undefined) {
            throw new InvalidObjectError("address can't be null or udefined");
        } else if
            (!(typeof object.address === 'string')) {
            throw new InvalidObjectError("address must be a string");
        }

        if (object.totalPrice === null || object.totalPrice === undefined) {
            throw new InvalidObjectError("totalPrice can't be null or udefined");
        } else if
            (!(typeof object.totalPrice === 'number')) {
            throw new InvalidObjectError("totalPrice must be a number");
        }

        if (object.paymentMethod === null || object.paymentMethod === undefined) {
            throw new InvalidObjectError("paymentMethod can't be null or udefined");
        } else if
            (!(typeof object.paymentMethod === 'string')) {
            throw new InvalidObjectError("paymentMethod must be a string");
        }else if(

            object.paymentMethod != "CARD" &&
            object.paymentMethod != "CASH"

        ){

            throw new InvalidObjectError("invalid paymentMethod. Must be in ('CARD', 'CASH')");

        }

        if (object.orderState === null || object.orderState === undefined) {
            throw new InvalidObjectError("orderState can't be null or udefined");
        } else if
            (!(typeof object.orderState === 'string')) {
            throw new InvalidObjectError("orderState must be a string");
        }else if (

            object.orderState != "NEW" &&
            object.orderState != "CONFIRMED" &&
            object.orderState != "PREPARED" &&
            object.orderState != "SENT" &&
            object.orderState != "DELIVERED" &&
            object.orderState != "CANCELLED" 
            
            ){

                throw new InvalidObjectError("Invalid orderstate. Must be in ('NEW', 'CONFIRMED', 'PREPARED', 'SENT', 'DELIVERED', 'CANCELLED')");

        }

        if (object.customerId === null || object.customerId === undefined) {
            throw new InvalidObjectError("customerId can't be null or udefined");
        }

        if (object.orderDetails === null || object.orderDetails === undefined) {
            throw new InvalidObjectError("orderDetails can't be null or udefined");
        }

    }
}

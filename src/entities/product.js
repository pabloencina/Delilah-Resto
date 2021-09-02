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
            throw new Error("productNumber can't be null or udefined");
        } else if (!(typeof object.productNumber === 'number')) {
            throw new Error("productNumber must be a number");
        } else if (object.productNumber < 0) {
            throw new Error("productNumber can't be 0 or minor");
        }

         //product.productNumber
         if (object.productName === null || object.productName === undefined) {
            throw new Error("productName can't be null or udefined");
        } else if (!(typeof object.productName === 'string')) {
            throw new Error("productName must be a string");
        }
    
        //object.productPrice
        if (object.productPrice === null || object.productPrice === undefined) {
            throw new Error("productPrice can't be null or udefined");
        } else if (!(typeof object.productPrice === 'number')) {
            throw new Error("productPrice must be a number");
        }else if (object.productPrice < 0) {
            throw new Error("productPrice can't be 0 or minor");
        }

        //object.productPhoto
        if (object.productPhoto === null || object.productPhoto === undefined) {
            throw new Error("productPhoto can't be null or udefined");
        } else if (!(typeof object.productPhoto === 'string')) {
            throw new Error("productPhoto must be a string");
        }
    }
}
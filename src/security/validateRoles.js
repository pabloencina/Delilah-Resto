export const validateAdminstrator = async (request, response, next) => {

    if (!request.user.admin) {
        response.status(401).json({
            error: "User is not an ADMINISTRATOR",
        });
    } else {
        next();
    }

}

export const validateRequestedCustomer = async (request, response, next) => {
    // Condicional del cliente.
    //Comparar el Id del customer logeuado con el id que viene por request param (URL)
    console.log("userCustomerID")
    console.log(request.user.customerId)
    console.log("paramCustomerId")
    console.log(request.params.customerId)

    if (request.user.customerId != request.params.customerId) {
        response.status(401).json({
            error: "User is not CUSTOMER",
        });
    } else {
        console.log("CustomerValidated")
        next();
    }

}
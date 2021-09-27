-- CREATE USER 'delilah-resto'@'localhost' IDENTIFIED BY 'password1234'
-- CREATE DATABASE 

CREATE TABLE IF NOT EXISTS `delilah-resto`.`Product` (
  `productId` INT NOT NULL AUTO_INCREMENT,
  `productNumber` INT NULL,
  `productName` VARCHAR(30) NULL,
  `productPrice` DOUBLE NULL,
  `productPhoto` VARCHAR(300) NULL,
  PRIMARY KEY (`productId`))
ENGINE = InnoDB

CREATE TABLE IF NOT EXISTS `delilah-resto`.`User` (
  `userId` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(30) NULL,
  `surname` VARCHAR(30) NULL,
  `email` VARCHAR(30) NOT NULL,
  `phone` VARCHAR(15) NULL,
  `password` VARCHAR(20) NULL,
  PRIMARY KEY (`userId`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE
  )
ENGINE = InnoDB

CREATE TABLE IF NOT EXISTS `delilah-resto`.`Administrator` (
  `administratorId` INT NOT NULL AUTO_INCREMENT,
  `identificationNumber` VARCHAR(20) NOT NULL,
  `userId` INT NOT NULL,
  PRIMARY KEY (`administratorId`),
  INDEX `fk_administrator_user_idx` (`userId` ASC) VISIBLE,
  CONSTRAINT `fk_administrator_user`
    FOREIGN KEY (`userId`)
    REFERENCES `delilah-resto`.`User` (`userId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB

CREATE TABLE IF NOT EXISTS `delilah-resto`.`Customer` (
  `customerId` INT NOT NULL AUTO_INCREMENT,
  `address` VARCHAR(80) NULL,
  `userId` INT NOT NULL,
  PRIMARY KEY (`customerId`),
  INDEX `fk_Customer_user_idx` (`userId` ASC) VISIBLE,
  CONSTRAINT `fk_customer_user`
    FOREIGN KEY (`userId`)
    REFERENCES `delilah-resto`.`User` (`userId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB

CREATE TABLE IF NOT EXISTS `delilah-resto`.`Order` (
  `orderId` INT NOT NULL AUTO_INCREMENT,
  `orderNumber` INT NOT NULL,
  `description` VARCHAR(100) NULL,
  `address` VARCHAR(80) NULL,
  `totalPrice` DOUBLE NOT NULL,
  `orderCreateDateTime` DATETIME NULL,
  `orderConfirmedDateTime` DATETIME NULL,
  `orderPreparedDateTime` DATETIME NULL,
  `orderSentDateTime` DATETIME NULL,
  `orderDeliveredDateTime` DATETIME NULL,
  `orderCancelledDateTime` DATETIME NULL,
  `customerId` INT NOT NULL,
  `paymentMethod` ENUM('CARD', 'CASH') NOT NULL,
  `orderState` ENUM('NEW', 'CONFIRMED', 'PREPARED', 'SENT', 'DELIVERED', 'CANCELLED') NOT NULL,
  PRIMARY KEY (`orderId`),
  INDEX `fk_Order_customer_idx` (`customerId` ASC) VISIBLE,
  CONSTRAINT `fk_order_customer`
    FOREIGN KEY (`customerId`)
    REFERENCES `delilah-resto`.`Customer` (`customerId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB

CREATE TABLE IF NOT EXISTS `delilah-resto`.`OrderDetail` (
  `orderDetailId` INT NOT NULL AUTO_INCREMENT,
  `productPrice` DOUBLE NULL,
  `productQuantity` INT NULL,
  `productId` INT NOT NULL,
  `orderId` INT NOT NULL,
  PRIMARY KEY (`orderDetailId`),
  INDEX `fk_order_detail_product_idx` (`productId` ASC) VISIBLE,
  INDEX `fk_orderDetail_order_idx` (`orderId` ASC) VISIBLE,
  CONSTRAINT `fk_order_detail_product`
    FOREIGN KEY (`productId`)
    REFERENCES `delilah-resto`.`Product` (`productId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_order_detail_order`
    FOREIGN KEY (`orderId`)
    REFERENCES `delilah-resto`.`Order` (`orderId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB

CREATE TABLE IF NOT EXISTS `delilah-resto`.`FavoriteProducts` (
  `customerId` INT NOT NULL,
  `productId` INT NOT NULL,
  PRIMARY KEY (`customerId`, `productId`),
  CONSTRAINT `fk_FavoriteProducts_customer`
    FOREIGN KEY (`customerId`)
    REFERENCES `delilah-resto`.`Customer` (`customerId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_FavoriteProducts_product`
    FOREIGN KEY (`productId`)
    REFERENCES `delilah-resto`.`Product` (`productId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
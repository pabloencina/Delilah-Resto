-- CREATE USER 'delilah-resto1'@'localhost' IDENTIFIED BY 'password1234';

-- GRANT ALL PRIVILEGES ON *.* TO 'delilah-resto1'@'localhost';

-- CREATE DATABASE IF NOT EXISTS `delilah-resto`;

-- Table creation

CREATE TABLE IF NOT EXISTS `delilah-resto`.`Product` (
  `productId` INT NOT NULL AUTO_INCREMENT,
  `productNumber` INT NULL,
  `productName` VARCHAR(30) NULL,
  `productPrice` DOUBLE NULL,
  `productPhoto` VARCHAR(300) NULL,
  PRIMARY KEY (`productId`));

CREATE TABLE IF NOT EXISTS `delilah-resto`.`User` (
  `userId` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(30) NULL,
  `surname` VARCHAR(30) NULL,
  `email` VARCHAR(30) NOT NULL,
  `phone` VARCHAR(15) NULL,
  `password` VARCHAR(20) NULL,
  PRIMARY KEY (`userId`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE
  );

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
    ON UPDATE NO ACTION);

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
    ON UPDATE NO ACTION);

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
    ON UPDATE NO ACTION);

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
    ON UPDATE NO ACTION);

-- Table population

-- User
INSERT INTO `delilah-resto`.`User`
(userId, name, surname, email, phone, password)
VALUES(1, 'Pablo', 'Encina', 'encina.pd@gmail.com', '2994231917', 'password4321');
INSERT INTO `delilah-resto`.`User`
(userId, name, surname, email, phone, password)
VALUES(2, 'Rodrigo', 'Lescano', 'rodrigo.l@hotmail.com', '299555123', 'pass1234');
INSERT INTO `delilah-resto`.`User`
(userId, name, surname, email, phone, password)
VALUES(3, 'Carmela', 'Rodriguez', 'carmela.rt@hotmail.com', '299321444', 'password123456');
INSERT INTO `delilah-resto`.`User`
(userId, name, surname, email, phone, password)
VALUES(4, 'Amparo', 'Levinston', 'amparo.lev@hotmail.com', '299877752', 'constrasena159');


-- Administrator
INSERT INTO `delilah-resto`.Administrator
(administratorId, identificationNumber, userId)
VALUES(1, '33285138', 1);


-- Customer
INSERT INTO `delilah-resto`.Customer
(customerId, address, userId)
VALUES(1, 'Felix Frias 290', 2);
INSERT INTO `delilah-resto`.Customer
(customerId, address, userId)
VALUES(2, 'Felix Frias 290', 3);
INSERT INTO `delilah-resto`.Customer
(customerId, address, userId)
VALUES(3, 'Av. 24 de Septiembre 215', 4);


-- Product
INSERT INTO `delilah-resto`.Product
(productId, productNumber, productName, productPrice, productPhoto)
VALUES(1, 1, 'Papas con chedar vegano', 50.0, 'null');
INSERT INTO `delilah-resto`.Product
(productId, productNumber, productName, productPrice, productPhoto)
VALUES(2, 2, 'Hamburguesa de chia', 800.0, 'string');
INSERT INTO `delilah-resto`.Product
(productId, productNumber, productName, productPrice, productPhoto)
VALUES(3, 3, 'Pizza muzzarella sin gluten', 750.0, 'null');
INSERT INTO `delilah-resto`.Product
(productId, productNumber, productName, productPrice, productPhoto)
VALUES(4, 4, 'Salchicha alemana de porotos', 600.0, 'null');
INSERT INTO `delilah-resto`.Product
(productId, productNumber, productName, productPrice, productPhoto)
VALUES(5, 5, 'Fideos con veg salteados', 650.0, 'null');


-- Order
INSERT INTO `delilah-resto`.`Order`
(orderId, orderNumber, description, address, totalPrice, orderCreateDateTime, orderConfirmedDateTime, orderPreparedDateTime, orderSentDateTime, orderDeliveredDateTime, orderCancelledDateTime, customerId, paymentMethod, orderState)
VALUES(1, 0, 'las papas sin chedar', 'Chile 410', 500.0, '2021-11-12 19:12:50', NULL, NULL, NULL, NULL, NULL, 1, 'CASH', 'NEW');
INSERT INTO `delilah-resto`.`Order`
(orderId, orderNumber, description, address, totalPrice, orderCreateDateTime, orderConfirmedDateTime, orderPreparedDateTime, orderSentDateTime, orderDeliveredDateTime, orderCancelledDateTime, customerId, paymentMethod, orderState)
VALUES(2, 0, 'Hamburguesa sin aderezo', 'Felix Frias 290', 1550.0, '2021-11-12 19:20:00', '2021-11-12 20:26:47', NULL, NULL, NULL, '2021-11-12 21:58:43', 2, 'CARD', 'CANCELLED');
INSERT INTO `delilah-resto`.`Order`
(orderId, orderNumber, description, address, totalPrice, orderCreateDateTime, orderConfirmedDateTime, orderPreparedDateTime, orderSentDateTime, orderDeliveredDateTime, orderCancelledDateTime, customerId, paymentMethod, orderState)
VALUES(3, 0, '', 'Av. 24 de Septiembre 215', 2000.0, '2021-11-12 19:27:31', '2021-11-12 20:29:41', '2021-11-12 20:42:03', NULL, NULL, NULL, 3, 'CARD', 'PREPARED');
INSERT INTO `delilah-resto`.`Order`
(orderId, orderNumber, description, address, totalPrice, orderCreateDateTime, orderConfirmedDateTime, orderPreparedDateTime, orderSentDateTime, orderDeliveredDateTime, orderCancelledDateTime, customerId, paymentMethod, orderState)
VALUES(4, 0, 'la salchicha sin mostaza', 'Chile 410', 1100.0, '2021-11-12 19:31:35', '2021-11-12 20:29:55', '2021-11-12 20:45:25', '2021-11-12 20:47:41', NULL, NULL, 1, 'CARD', 'SENT');
INSERT INTO `delilah-resto`.`Order`
(orderId, orderNumber, description, address, totalPrice, orderCreateDateTime, orderConfirmedDateTime, orderPreparedDateTime, orderSentDateTime, orderDeliveredDateTime, orderCancelledDateTime, customerId, paymentMethod, orderState)
VALUES(5, 0, '', 'Chile 410', 1600.0, '2021-11-12 19:36:23', '2021-11-12 20:30:02', '2021-11-12 20:48:35', '2021-11-12 20:48:52', '2021-11-12 20:50:55', NULL, 1, 'CARD', 'DELIVERED');
INSERT INTO `delilah-resto`.`Order`
(orderId, orderNumber, description, address, totalPrice, orderCreateDateTime, orderConfirmedDateTime, orderPreparedDateTime, orderSentDateTime, orderDeliveredDateTime, orderCancelledDateTime, customerId, paymentMethod, orderState)
VALUES(6, 0, 'los fideos extra salsa de soja', 'Felix Frias 290', 650.0, '2021-11-12 19:40:02', '2021-11-12 20:53:13', '2021-11-12 20:53:40', '2021-11-12 20:53:53', '2021-11-12 20:54:03', NULL, 2, 'CASH', 'DELIVERED');


-- OrderDetail
INSERT INTO `delilah-resto`.OrderDetail
(orderDetailId, productPrice, productQuantity, productId, orderId)
VALUES(1, 500.0, 1, 1, 1);
INSERT INTO `delilah-resto`.OrderDetail
(orderDetailId, productPrice, productQuantity, productId, orderId)
VALUES(2, 800.0, 1, 2, 2);
INSERT INTO `delilah-resto`.OrderDetail
(orderDetailId, productPrice, productQuantity, productId, orderId)
VALUES(3, 750.0, 1, 3, 2);
INSERT INTO `delilah-resto`.OrderDetail
(orderDetailId, productPrice, productQuantity, productId, orderId)
VALUES(4, 600.0, 1, 4, 3);
INSERT INTO `delilah-resto`.OrderDetail
(orderDetailId, productPrice, productQuantity, productId, orderId)
VALUES(5, 650.0, 1, 5, 3);
INSERT INTO `delilah-resto`.OrderDetail
(orderDetailId, productPrice, productQuantity, productId, orderId)
VALUES(6, 750.0, 1, 3, 3);
INSERT INTO `delilah-resto`.OrderDetail
(orderDetailId, productPrice, productQuantity, productId, orderId)
VALUES(7, 600.0, 1, 4, 4);
INSERT INTO `delilah-resto`.OrderDetail
(orderDetailId, productPrice, productQuantity, productId, orderId)
VALUES(8, 500.0, 1, 1, 4);
INSERT INTO `delilah-resto`.OrderDetail
(orderDetailId, productPrice, productQuantity, productId, orderId)
VALUES(9, 800.0, 2, 2, 5);
INSERT INTO `delilah-resto`.OrderDetail
(orderDetailId, productPrice, productQuantity, productId, orderId)
VALUES(10, 650.0, 1, 5, 6);



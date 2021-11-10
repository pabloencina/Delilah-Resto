# Delilah-Resto
This project proposes the creation of an online ordering system for a restaurant.

Starting  🚀
These instructions will allow you to get a copy of the project running on your local machine for development and testing purposes.

Prerequisites 📋
Code Editor (Visual Studio Code or similar)
NodeJS
Express
DBeaver
MySQL
Postman

Installation 🔧
Step 1:
Create a local folder to host the repository

Step 2:
Position yourself in the created folder and clone the repository:
  git clone https://github.com/pabloencina/acamica-delilah-resto

With this, you will have created the file structure and the content of the BackEnd of the application.

Step 3:
Run XAMPP and activate the MySQL Server. Then go to BDeaver.
    
Step 4:
In BDeaver create a Schena with the name "Delilah-resto".

Step 5:
In  BDeaver go to the menu: FILE> Open SQL Script and in the file selection window, navigate inside the local folder that you created, to the "./Delilah-resto-server / scriptsSQL-postman" folder.
Inside that folder choose the file "Create Delilah-resto Tables.sql".
Run that script in  BDeaver. With this you will have created the necessary tables to use in the API (always within the "Delilah-resto" schema.

Step 7:
Enter your Code editor (Visual Studio Code).
Open a terminal window and position yourself in the local folder that you created and within it in the "Delilah-resto" folder.
Type npm install. With that you will have installed all the necessary Dependencies.

Step 8:
Run node server.js. This will start up the server and you will be able to verify on the terminal screen that it has connected to the "Delilah-resto" Base.

Step 9:
Enter Postman and go to the menu and select FILE / IMPORT and click on the "Upload File:" button.
Navigate inside the local folder you created, and go to the folder "./delilah-resto-server / scriptsSQL-postman" and select the file "API Delilah-resto.postman_collection.json" "
This will create a collection in Postman with the name API Delilah-resto, where you can find different Requests to test the API.

Running the tests ⚙️
First you must execute the LOGIN Request, since you must obtain the JWT in the response, to paste it later in each request you use.

You can use the different Requests created in Postman, to:

Make LOGIN (necessary to execute the rest)
Get all the customer,
Get the customer by ID,
Get customer orders ordered,
Get the order status through the orderId,
Get the data of the administrators by administratorId,
Get the order status by ProductId,
Get the order list,
Get all products,
Post an user,
Post an order by customerId,
Post an product,
Put an order,
Put an product by productId,
Delete an product

Built with 🛠️
JavaScript
NodeJS
Express
Sequelize
MySQL

Authors ✒️
Encina Pablo David
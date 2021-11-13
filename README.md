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
        Or download from the Github site as .zip

        With this, you will have created the file structure and the content of the BackEnd of the application.

    Step 3:
        Run XAMPP and activate the MySQL Server. Then go to BDeaver.
    
    Step 4:
        Create a user for the DB with these sentences:
            CREATE USER 'delilah-resto1'@'localhost' IDENTIFIED BY 'password1234';
            GRANT ALL PRIVILEGES ON *.* TO 'delilah-resto1'@'localhost';

    Step 5:
        Then create the Database with the sentence:
            CREATE DATABASE IF NOT EXISTS `delilah-resto`;

    Step 6:
        In  BDeaver right click to your local MySQL connection and from the Menu choose SQL Editor > SQL Script.
        Paste there the content of the file "creation_script.sql".
        Run that script in  BDeaver. With this you will have created the necessary tables to use in the API and populate the tables (always within the "delilah-resto" schema).

    Step 7:
        Enter your Code editor (Visual Studio Code).
        Open a terminal window and position yourself in the local folder that you created and within it in the "acamica-delilah-resto" folder.
        Type npm install. With that you will have installed all the necessary dependencies.

    Step 8:
        Run npm start. This will start up the server and you will be able to verify on the terminal screen that it has connected to the "delilah-resto" db.

    Step 9:
        Enter Postman and go to the menu and select FILE / IMPORT and click on the "Upload File:" button.
        Navigate inside the local folder you created and select the file "delilah-resto.postman_collection.json"
        This will create a collection in Postman with the name API Delilah-resto, where you can find different Requests to test the API.

Running the tests ⚙️
    First you must execute the Login Request for the Administrator, since you must obtain the JWT in the response, to paste it later in each request you use.

    You can use the different Requests created in Postman, to:

    Make LOGIN (necessary to execute the rest)

        Checkin (Customer)
        LogIn (existing Admin or Customer)
        List of all products
        Create a product (Admin)
        Modify a product (Admin)
        Delete a product (Admin)
        List of all customers (Admin)
        Get a customer (Customer)
        Get orders by customer (Customer)
        Create orders by customerId (Customer)
        Get order by orderId (Customer)
        Cancel the order (Customer)
        List of all administrators (Admin)
        Create an adminstrator (Admin)
        Get administrator by Id (Admin)
        List of all orders (Admin)
        Get order by Id (Admin)
        Change order State (Administrator)

Built with 🛠️
    JavaScript
    NodeJS
    Express
    Sequelize
    MySQL

Author ✒️
    Encina Pablo David

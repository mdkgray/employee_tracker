# Employee Tracker

### By Mackenzie Gray

## Technologies Used

- mySQL
- Javascript
- npm packages (Inquirer, dotenv, console.table)

## Description 

The motivation for this project was to create a command line application that can be used by a business owner to view and manage the departments, roles and employees in the company. Data in the database can be added, deleted and modified using prompts presented to the user in the command line. 

## Usage

The application will be invoked using the following command:

`node server.js`

## Outline of codebase writing

- Installation of the inquirer, dotenv and console.table npm packages.
- Set up of .env file to store data such as database host, database name, database username, database password.

mySQL:
- Creating database employee_tracker_db
- Creating department table with id and name columns
- Creating role table with id, title, salary and department_id columns
- Creating employee table with id, first_name, last_name, role_id and manager_id columns
- Creating foreign keys in role and employee tables for linking data
- Inserting seed data into the seeds.sql file for the tables

Javascript:
- Writing of code for connection to the database in the connection.js file to be exported. 
- Creating class of dbQueryUtil in the dbUtils.js file to contain functions for database queries.
- Writing of functions for database queries to generate and display data in tables.
- Exporting the dbUtils.js file to be imported in the server.js file. 
- Declaring variables for dependencies for the application.
- Writing of startQuestion to prompt the user with options for the application. 
- Writing of functions to execute query statements based on the user selection to modify data in the database. 

## Demonstration Video 
[Click here to view the video](https://drive.google.com/file/d/1-xUQzjXhL3TxfNd_mNlZ5kjTG1yYC0Ca/view)
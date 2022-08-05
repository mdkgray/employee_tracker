//require for mysql, express and inquirer
const express = require('express');
const inquirer = require('inquirer');
const mysql = require('mysql2');

// require for console.table and dotenv
require('console.table');
require('dotenv').config();

//PORT connection
const PORT = process.env.PORT || 3001;
const app = express();

// mysql database connection
const db = mysql.createConnection(
    {
        host: process.env.DB_HOST,
        user: process.env.DB_USER, 
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    },
);

db.connect(function (err) {
    if (err) throw err;
    console.log(`Connected to the employee_tracker_db database`)
    console.log(`---------------------------------------------`)
    startQuestion();
});

// inquirer question to begin application
function startQuestion() {
    inquirer.prompt({
        message: 'What would you like to do?',
        type: 'list',
        name: 'choices',
        choices: 
        [
            'View all employees',
            'Add employee',
            'Update employee role',
            'View all roles',
            'Add role',
            'View all departments',
            'Add department',
            'Quit'
        ],
    }).then(answers => {
        // console.log(answers.choices);
        switch (answers.choices) {
            case 'View all employees':
                viewAllEmployees();
                break;
            case 'Add employee':
                addEmployee();
                break;
            case 'Update employee role':
                updateEmployeeRole();
                break;
            case 'View all roles':
                viewAllRoles();
                break;
            case 'Add role':
                addRole();
                break;
            case 'View all departments':
                viewAllDepartments();
                break;
            case 'Add department':
                addDepartment();
                break;
            case 'Quit':
                db.end();
                console.log('See you next time');
                break;
        }
    });
};

// function for view all employees
function viewAllEmployees() {
    db.query('SELECT * from employee', function(err, results) {
        console.table(results);
        startQuestion();
    })
};

// function to add employees 
function addEmployee() {
    inquirer.prompt([
        {
        message: 'What is the employees first name?',
        type: 'input',
        name: 'firstName',
        },
        {
        message: 'What is the employees last name?',
        type: 'input',
        name: 'lastName',
        },
        {
        message: 'What is the employees role?',
        type: 'list',
        name: 'role',
        choices:
        [
            'Salesperson',
            'Sales Lead',
            'Lead Engineer',
            'Software Engineer',
            'Account Manager',
            'Accountant',
            'Legal Team Lead',
            'Lawyer'
        ]
        },
        {
        message: 'Who is the employees manager?',
        type: 'list',
        name: 'manager',
        choices:
        [
            'None',
            'Mark Smith',
            'John Doe',
            'Jane Burns',
            'Samantha Jean',
            'Rob Mills',
            'Hank Stevens',
            'Sarah Wells',
            'Mike Horne'
        ]
        },
    ]).then(function(res) {
        db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [res.firstName, res.lastName, res.role, res.manager], function(err, data) {
            if (err) throw err;
            console.table('Added new employee');
            startQuestion();
        });
    });
};


//function to update employee role 


// function to view all roles
function viewAllRoles() {
    db.query('SELECT * from role', function(err, results) {
        console.table(results);
        startQuestion();
    })
};

// function to add role 


// function to view all departments 
function viewAllDepartments() {
    db.query('SELECT * from department', function(err, results) {
        console.table(results);
        startQuestion();
    })
};

// function to add department 


// BONUS functions

// function to delete departments, roles, and employees.


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
  


// have this in a separate db.js file

    // viewRoles(){
    //     return Connection.promise().query(`SELECT * FROM roles`);
    // }


// have this in the server.js file and call from db.js file

    // viewRoles(

    // ).then((roles)=> {

    // }))
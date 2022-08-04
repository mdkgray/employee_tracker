const express = require('express');
const inquirer = require('inquirer');
const mysql = require('mysql2');

require('console.table');
require('dotenv').config();

const PORT = process.env.PORT || 3001;
const app = express();

// link to database with mysql connection
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '1111',
        database: 'employee_tracker_db'

        // process.env.DB_NAME,
        // process.env.DB_USER, 
        // process.env.DB_PASSWORD,
    },
);

db.connect(function (err) {
    if (err) throw err;
    console.log(`Connected to the employee_tracker_db database`)
    console.log(`-----------------------------`)
    startQuestion();
});

// inquirer question to start application
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


//function to update employee role 


//function to view all roles
function viewAllRoles() {
    db.query('SELECT * from role', function(err, results) {
        console.table(results);
        startQuestion();
    })
};

//function to add role 


//function to view all departments 
function viewAllDepartments() {
    db.query('SELECT * from department', function(err, results) {
        console.table(results);
        startQuestion();
    })
};

//function to add department 


// BONUS functions

// function to delete departments, roles, and employees.



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
  
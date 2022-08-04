const inquirer = require('inquirer');
const mysql = require('mysql2');

require('console.table');
require('dotenv').config();

// link to database with mysql connection
const db = mysql.createConnection(
    {
        host: 'localhost',
        port: 3001,
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
        console.log(answers.choice);
        switch (answers.choice) {
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


// function for view employees


// function to add employees 


//function to update employee role 


//function to view all roles


//function to add role 


//function to view all departments 


//function to add department 


// BONUS functions

// function to delete departments, roles, and employees.


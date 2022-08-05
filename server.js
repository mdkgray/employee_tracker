const express = require('express');
const inquirer = require('inquirer');
// const mysql = require('mysql2');

const db = require('./connection/connection');
const dbUtils = require('./models/dbUtils');
const dbQueryUtil = require('./models/dbUtils');

// require for console.table and dotenv
require('console.table');
require('dotenv').config();

//PORT connection
const PORT = process.env.PORT || 3001;
const app = express();

// shows user that connection is made and initializes the application
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
            'Delete employee',
            'Update employee role',
            'View all roles',
            'Add role',
            'Delete role',
            'View all departments',
            'Add department',
            'Delete department',
            'Quit'
        ],
    }).then(answers => {
        switch (answers.choices) {
            case 'View all employees':
                viewAllEmployees();
                break;
            case 'Add employee':
                addEmployee();
                break;
            case 'Delete employee':
                deleteEmployee();
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
            case 'Delete role':
                deleteRole();
                break;
            case 'View all departments':
                viewAllDepartments();
                break;
            case 'Add department':
                addDepartment();
                break;
            case 'Delete department':
                deleteDepartment();
                break;
            case 'Quit':
                db.end();
                console.log('See you next time');
                break;
        }
    });
};

// function for view all employees
async function viewAllEmployees() {
    const allEmployees = await dbQueryUtil.viewAllEmployees();
    console.table(allEmployees);
    startQuestion();
};

// function to add employees 
async function addEmployee() {
    const currentRoles = await dbQueryUtil.viewAllRoles();
    const hasManager = await dbQueryUtil.viewAllEmployees();

    const addNewEmployee = await inquirer.prompt([
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
    ]);

    const roleChoices = currentRoles.map(({ id, title }) => ({ name: title, value: id }));
    const { role } = await inquirer.prompt([
        {
            message: 'What is the employees role?',
            type: 'list',
            name: 'role',
            choices: roleChoices,    
        }
    ]);

    const managerChoices = hasManager.map(({ first_name, last_name, id }) => ({ name: first_name + last_name, value: id }));
    if (managerChoices && managerChoices.length > 0) {
        const { manager } = await inquirer.prompt([
            {
                message: 'Who is the employees manager?',
                type: 'list',
                name: 'manager',
                choices: managerChoices,         
            }
        ]);
        addNewEmployee.manager_id = manager;
    }
    addNewEmployee.role_id = role;

    await dbUtils.createNewEmployee(addNewEmployee); 
};

//function to update employee role 


// function to view all roles
async function viewAllRoles() {
    const allRoles = await dbQueryUtil.viewAllRoles();
    console.table(allRoles);
    startQuestion();
};

// function to add role 


// function to view all departments 
async function viewAllDepartments() {
    const allDepartments = await dbQueryUtil.viewAllDepartments();    
    console.table(allDepartments);
    startQuestion();
};

// function to add department 
async function addDepartment() {
    const newDepartment = await inquirer.prompt([
        {
            message: 'What is the name of the department you want to add?',
            type: 'input',
            name: 'name',
        }
    ]);
    await dbQueryUtil.createDepartment(newDepartment);
    startQuestion();
};

// BONUS functions

// function to delete departments, roles, and employees.


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

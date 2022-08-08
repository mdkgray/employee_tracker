const express = require('express');
const inquirer = require('inquirer');
const mysql = require('mysql2');
// const { start } = require('repl');

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
        choices: [
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
    const employeeList = await dbQueryUtil.viewAllEmployees();
    console.table(employeeList);
    startQuestion();
};

// function to add employees 
async function addEmployee() {
    const currentRoles = await dbQueryUtil.viewAllRoles();
    const hasManager = await dbQueryUtil.viewAllEmployees();

    const employeeName = await inquirer.prompt([
        {
            message: 'What is the employees first name?',
            type: 'input',
            name: 'first_name',
        },
        {
            message: 'What is the employees last name?',
            type: 'input',
            name: 'last_name',
        }
    ]);

    const roleChoices = currentRoles.map(({ id, title }) => ({ name: title, value: id }));

    const role = await inquirer.prompt([
        {
            message: 'What is the employees role?',
            type: 'list',
            name: 'role_id',
            choices: roleChoices,
        }
    ]);

    const managerChoices = hasManager.map(({ first_name, last_name, id }) => ({ name: first_name + last_name, value: id }));

    if (managerChoices && managerChoices.length > 0) {
        const manager = await inquirer.prompt([
            {
                message: 'Who is the employees manager?',
                type: 'list',
                name: 'manager_id',
                choices: managerChoices,
            }
        ])
            .then(res => {
                let addNewEmployee = {
                    first_name: employeeName.first_name,
                    last_name: employeeName.last_name,
                    role_id: role.role_id,
                    manager_id: res.manager_id,
                }
                dbUtils.createNewEmployee(addNewEmployee);
            })
            .then(() => console.log(`Added new employee`))
            .then(() => startQuestion())
            .catch(err => console.log(err)); 
    }
};

//function to delete employee
async function deleteEmployee() {
    const employeeList = await dbQueryUtil.viewAllEmployees();
    const employeeListOptions = employeeList.map(({ id, first_name, last_name }) => ({ name: first_name + last_name, value: id }));

    const employee = await inquirer.prompt([
        {
            message: 'Which employee do you want to delete?',
            type: 'list',
            name: 'id',
            choices: employeeListOptions,
        },
    ]);
    await dbQueryUtil.deleteEmployee(employee.id);
    console.log(`Employee deleted successfully`);
    startQuestion();
}

//function to update employee role 
async function updateEmployeeRole() {
    const employeeList = await dbQueryUtil.viewAllEmployees();
    const employeeRoles = await dbQueryUtil.viewAllRoles();

    const employeeListOptions = employeeList.map(({ id, first_name, last_name }) => ({ name: first_name + last_name, value: id }));

    const employeeRolesOptions = employeeRoles.map(({ id, title }) => ({ name: title, value: id }));

    const employee = await inquirer.prompt([
        {
            message: 'Which employee do you want to change role?',
            type: 'list',
            name: 'id',
            choices: employeeListOptions,
        },
    ]);

    const role = await inquirer.prompt([
        {
            message: 'What role do you want to assign this employee?',
            type: 'list',
            name: 'role_id',
            choices: employeeRolesOptions,
        },
    ]);

    await dbQueryUtil.updateEmployeeRole(employee.id, role.role_id);
    console.log(`Updated employee's role`);
    startQuestion();
};

// function to view all roles
async function viewAllRoles() {
    const allRoles = await dbQueryUtil.viewAllRoles();
    console.table(allRoles);
    startQuestion();
};

// function to add role 
async function addRole() {
    const readDepartments = await dbQueryUtil.viewAllDepartments();
    const departmentList = readDepartments.map(({ id, name }) => ({ name: name, value: id }));

    const newRole = await inquirer.prompt([
        {
            message: 'What role do you want to add?',
            type: 'input',
            name: 'title',
        },
        {
            message: 'What is the salary of the role?',
            type: 'input',
            name: 'salary',
        },
        {
            message: 'What department does this role belong to?',
            type: 'list',
            name: 'department_id',
            choices: departmentList,
        },
    ]);
    await dbQueryUtil.addRole(newRole);
    console.log(`Role added successfully`);
    startQuestion();
};

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
    console.log(`Department added successfully`);
    startQuestion();
};

// function to delete department
async function deleteDepartment() {
    const readDepartments = await dbQueryUtil.viewAllDepartments();
    const departmentList = readDepartments.map(({ id, name }) => ({ name: name, value: id }));

    const department = await inquirer.prompt([
        {
            message: 'What department would you like to delete?',
            type: 'list',
            name: 'id',
            choices: departmentList,
        }
    ]);
    await dbQueryUtil.removeDepartment(department.id);
    console.log(`Department deleted successfully`);
    startQuestion();
};

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

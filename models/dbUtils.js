const db = require('../connection/connection.js');

class dbQueryUtil {
    constructor (connection) {
        this.connection = connection;
    }

    viewAllEmployees() {
        return this.connection.query('SELECT employee.id, employee.first_name, employee.last_name, role.title, role.department_id, role.salary, employee.manager_id FROM employee INNER JOIN role ON employee.role_id=role.title,');
    }
    createNewEmployee(employee) {
        return this.connection.query('INSERT INTO employee SET ?', employee);
    }
    updateEmployee() {
        return this.connection.query('UPDATE employee SET role_id = role_id WHERE first_name = name');
    }
    updateEmployeeRole(employee, role) {
        return this.connection.query('UPDATE employee SET role_id = ? WHERE id = ?', [employee, role]);
    }
    deleteEmployee(id) {
        return this.connection.query('DELETE from employee WHERE id = ?', [id]);
    }


    viewAllRoles() {
        return this.connection.query('SELECT role.id, role.title, role.salary, department.name AS department FROM role INNER JOIN department ON role.department_id=department.id');
    }
    addRole(newRole) {
        return this.connection.query('INSERT INTO role SET ?', newRole);
    }
    deleteRole(id) {
        return this.connection.query('DELETE FROM role WHERE id = ?', id);
    }


    viewAllDepartments() {
        return this.connection.query('SELECT * from department');
    }
    createDepartment(newDepartment) {
        return this.connection.query('INSERT INTO department SET ?', newDepartment);
    }
    deleteDepartment(id) {
        return this.connection.query('DELETE FROM department WHERE id = ?', id);
    }
}

module.exports = new dbQueryUtil(db);
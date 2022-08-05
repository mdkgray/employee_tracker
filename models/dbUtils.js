const db = require('../connection/connection.js');

class dbQueryUtil {
    constructor (connection) {
        this.connection = connection;
    }
    viewAllEmployees() {
        return this.connection.query('SELECT * FROM employee');
    }
    createNewEmployee(employee) {
        return this.connection.query('INSERT INTO employee SET ?', employee);
    }
    updateEmployee() {
        return this.connection.query('UPDATE employee SET role_id = role_id WHERE first_name = name');
    }
    updateEmployeeRole(employeeId, newRoleId) {
        return this.connection.query('UPDATE employee SET role_id = ? WHERE id = ?', [employeeId, newRoleId]);
    }
    deleteEmployee(id) {
        return this.connection.query('DELETE from employee WHERE id = ?', [id]);
    }


    viewAllRoles() {
        return this.connection.query('SELECT id, title, salary, department_id AS role FROM role');
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

module.exports = dbQueryUtil(db);
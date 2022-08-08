const db = require('../connection/connection.js');

class dbQueryUtil {
    constructor (connection) {
        this.connection = connection;
    }

    viewAllEmployees() {
        return this.connection.query(`SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, CONCAT(m.first_name, " ", m.last_name) AS manager 
        FROM employee e
        LEFT JOIN role r
          ON e.role_id = r.id
        LEFT JOIN department d
        ON d.id = r.department_id
        LEFT JOIN employee m
          ON m.id = e.manager_id`);
    }
    createNewEmployee(employee) {
        return this.connection.promise().query('INSERT INTO employee(first_name , last_name , role_id, manager_id ) values(?,?,?,?)', [employee.first_name,employee.last_name, employee.role_id, employee.manager_id]);
    }
    updateEmployeeRole(employee, role) {
        return this.connection.query('UPDATE employee SET role_id = ? WHERE id = ?', [ role,employee]);
    }
    // deleteEmployee(id) {
    //     return this.connection.query('DELETE from employee WHERE id = ?', [id]);
    // }

    viewAllRoles() {
        return this.connection.query(`SELECT role.id, role.title, role.salary, department.name AS department 
        FROM role 
        INNER JOIN department 
        ON role.department_id=department.id`);
    }
    addRole(newRole) {
        return this.connection.query('INSERT INTO role SET ?', newRole);
    }
    // deleteRole(id) {
    //     return this.connection.query('DELETE FROM role WHERE id = ?', id);
    // }

    viewAllDepartments() {
        return this.connection.query('SELECT * from department');
    }
    createDepartment(newDepartment) {
        return this.connection.query('INSERT INTO department SET ?', newDepartment);
    }
    removeDepartment(id) {
        return this.connection.query('DELETE FROM department WHERE id = ?', id);
    }
}

module.exports = new dbQueryUtil(db);
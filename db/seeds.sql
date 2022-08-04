INSERT INTO department (id, name)
VALUES  (1, 'Sales'),
        (2, 'Engineering'),
        (3, 'Finace'),
        (4, 'Legal');

INSERT INTO role (id, title, salary, department_id)
VALUES  (1, 'Salesperson', 80000, 1),
        (2, 'Sales Lead', 100000, 1),
        (3, 'Lead Engineer', 170000, 2),
        (4, 'Software Engineer', 130000, 2),
        (5, 'Account Manager', 150000, 3),
        (6, 'Accountant', 120000, 3),
        (7, 'Leagal Team Lead', 250000, 4),
        (8, 'Lawyer', 190000, 4);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES  (1, 'Mark', 'Smith', 2, null),
        (2, 'John', 'Doe', 1, 2),
        (3, 'Jane', 'Burns', 3, null),
        (4, 'Rob', 'Mills', 4, 3),
        (5, 'Samantha', 'Jean', 5, null),
        (6, 'Hank', 'Stevens', 6, 5), 
        (7, 'Mike', 'Horne', 7, null), 
        (8, 'Sarah', 'Wells', 8, 7);
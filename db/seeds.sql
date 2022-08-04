INSERT INTO department (id, name)
VALUES  ('Sales'),
        ('Engineering'),
        ('Finace'),
        ('Legal');

INSERT INTO role (id, title, salary, department_id)
VALUES  (10, 'Salesperson', 80000, 1),
        (20, 'Sales Lead', 100000, 1),
        (30, 'Lead Engineer', 170000, 2),
        (40, 'Software Engineer', 130000, 2),
        (50, 'Account Manager', 150000, 3),
        (60, 'Accountant', 120000, 3),
        (70, 'Leagal Team Lead', 250000, 4),
        (80, 'Lawyer', 190000, 4);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES  ('Mark', 'Smith', 20, null),
        ('John', 'Doe', 10, 2),
        ('Jane', 'Burns', 30, null),
        ('Samantha', 'Jean', 50, null),
        ('Rob', 'Mills', 40, 3),
        ('Hank', 'Stevens', 60, 5), 
        ('Sarah', 'Wells', 80, 7),
        ('Mike', 'Horne', 70, null);
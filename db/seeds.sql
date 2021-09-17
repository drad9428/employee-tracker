INSERT INTO department (name)
VALUES
("General"),
("Finance Team"),
("Technical Team"),
("HR Team"),
("Administration Team")
;

INSERT INTO role (title, salary, department_id)
VALUES
("CEO", 300000, 1),
("Finincial Manager", 150000, 2),
("Technical Manager", 120000, 3),
("Human Resources Manager", 120000, 4),
("Administration Manager", 150000, 5),
("Senior Manager", 80000, 1),
("Assistant Manager", 60000, 1),
("Staff", 30000, 1)
;

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
("Miky", "Davis", 1, null),
("Michele", "Lucifer", 2, 1),
("Timothy", "Merrow", 6, 2),
("Jason", "Jankowski", 7, 3),
("David", "Perez", 8, 4),
("Germaine", "Smith", 3, 1),
("Marilyn", "Brown", 6, 6),
("Joseph", "Steinhoff", 7, 7), 
("Jimmie", "Robertson", 8, 8),
("Michael", "Roop", 4, 1),
("James", "Rodriguez", 6, 10),
("John", "Ridgway", 7, 11),
("Anna", "Kelley", 8, 12),
("Brenda", "Soto", 5, 1),
("Judith", "Keller", 6, 14),
("Shirley", "Henderson", 7, 15),
("Barbara", "Overby", 8, 16)
;
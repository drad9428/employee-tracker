const conTab = require("console.table")
const inquirer = require("inquirer")
const mysql = require("mysql2")
const connection = require("./db/connection")

function start(){
    inquirer.prompt(
        {
            type: 'list',
            message: 'Select action:',
            name: 'selection',
            choices: [
                'View departments',
                'View roles',
                'View employees',
                'Create department',
                'Create role',
                'Create employee',
                'Exit'
            ]
        }
    )
    .then(res => {
        switch(res.selection){
            case 'View departments':
                viewDep();
                break;
            case 'View roles':
                viewRole();
                break;
            case 'View employees':
                viewEmp();
                break;
            case 'Create department':
                createDep();
                break;
            case 'Create role':
                createRole();
                break;
            case 'Create employee':
                createEmp();
                break;
            case 'Exit':
                connection.end();
                console.log('Goodbye');
                break;
        }
    })
}

function viewDep() {
    connection.query(
        'SELECT * FROM department', (err, res) => {
            if (err) {
                console.log(err);
            }
            console.table(res)
            start();
        })
}

function viewRole() {
    connection.query(
      'SELECT * FROM role', (err, res) => {
        if (err) {
            console.log(err);
        }
        console.table(res)
        start();
    })
};

function viewEmp() {
connection.query(
    `SELECT employee.id, employee.first_name, employee.last_name, role.title,  department.name AS department_name, CONCAT(manager.first_name ," ", manager.last_name) AS manager
    FROM employee
    LEFT JOIN role ON employee.role_id = role.id
    LEFT JOIN department ON role.department_id = department.id
    LEFT JOIN employee manager ON manager.id = employee.manager_id`,
    (err, res) => {
    if (err) {
        console.log(err);
    }
    console.table(res)
    start();
    });
};

function createDep() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'department',
            message: 'Department name:'
        }
    ]).then(res => {
        console.log(res);
        connection.query('INSERT INTO department SET ?', { name: res.department }, (err, res) => {
            if (err)
            throw err;
            console.log('Department added')
            start();
        });
    });
};

function createRole() {
    let currentDepts = [];
    connection.query('SELECT * FROM department', (err, res) => {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
        currentDepts.push({name: res[i].name, value: res[i].id})
    }
    })
    inquirer.prompt([
    {
        type: 'input',
        name: 'role',
        message: 'Role name:'
    },
    {
        type: 'input',
        name: 'salary',
        message: 'Role salary:'
    },
    {
        type: 'list',
        name: 'department',
        message: 'Role department',
        choices: currentDepts
    }
    ]).then(res => {
        console.log(res);
        connection.query('INSERT INTO role SET ?', { title: res.role, salary: res.salary, department_id: res.department }, (err, res) => {
            if (err)
            throw err;
            console.log("Role added")
            start();
        });
    });
}

function createEmp() {
    let currentRoles = [];
    let currentEmployees = [];

    connection.query('SELECT * FROM role', (err, res) => {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
        currentRoles.push({name:res[i].title, value:res[i].id})
    }
    })

    connection.query('SELECT * FROM employee', (err, res) => {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
        currentEmployees.push({name: res[i].first_name + " " + res[i].last_name, value: res[i].id});
    }
    })

    inquirer.prompt([
    {
        type: 'input',
        name: 'first',
        message: 'Employee first name:'
    },
    {
        type: 'input',
        name: 'last',
        message:'Employee last name:'
    },
    {
        type: 'list',
        name: 'role',
        message: 'Employee role:',
        choices: currentRoles
    },
    {
        type: 'list',
        name: 'manager',
        message: 'Employee manager:',
        choices: currentEmployees
    },

    ]).then(res => {
    console.log(res);
    connection.query('INSERT INTO employee SET ?', 
    { 
        first_name: res.first, 
        last_name: res.last, 
        role_id: res.role, 
        manager_id: res.manager 
    }, (err, res) => {
            if (err) throw err;
            console.log("Employee added")
            start();
        });
    });
};

start()
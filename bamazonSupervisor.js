const mysql = require("mysql");
const inquirer = require("inquirer");
const Table = require('cli-table');
 
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  display();
});
function display(){
    let table = new Table({
        head: [
            '',
            'Menu'
        ]
    });
    table.push(
        {'1' : ['View Product Sales by Department']},
        {'2' : ['Create New Department']}
    );
    console.log(table.toString());
    menu_prompt();
}

function menu_prompt(){
    inquirer.prompt([
        {
            name: "choice",
            type: "input",
            message: "Please enter number of menu : "
        }
    ])
    .then(function(answer){
        if(answer.choice === "1"){
            view_product_sales_by_department();
        }else if(answer.choice === "2"){
            create_new_department();
        }
    })
}

function view_product_sales_by_department(){
    let table = new Table({
        head: [
            'Department ID',
            'Department Name',
            'Overhead Costs',
            'product Sales',
            'Total Profit'
        ]
    });
    let qry = "SELECT department_id, department_name, over_head_costs, product_sales, (product_sales - over_head_costs) AS total_profit ";
    qry += "FROM departments ";
    qry += "ORDER BY department_id ASC";
    connection.query(qry, function(err, result){
        if(err){
            console.log(err);
            //return res.status(500).end();
        }
        console.log("\n\r\n\r=============================== View Product Sales by Department =================================");
        if(result){
            for(let i = 0; i < result.length; i++){
                table.push([result[i].department_id, result[i].department_name, result[i].over_head_costs, result[i].product_sales, result[i].total_profit]);
            }
            console.log(table.toString());
        }
        console.log("====================================================================================");
        //display menu again
        display();
    });
}

function create_new_department(){
    inquirer.prompt([
        {
            name: "department_name",
            type: "input",
            message: "Please enter department name : "
        } ,
        {
            name: "over_head_costs",
            type: "input",
            message: "How much is overhead costs? : "
        }
    ])
    .then(function(answer){
        const department_name = answer.department_name;
        const over_head_costs = parseFloat(answer.over_head_costs).toFixed(2);
        // insert department
        connection.query("INSERT INTO departments SET ? ", {department_name : department_name, over_head_costs :  over_head_costs}, function(err, result){
            if(err){
                console.log(err);
                //return res.status(500).end();
            }
            console.log(`
            
            [${department_name} is successfully added.]
            
            `);
            display();
        })
    })
}
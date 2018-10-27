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
        {'1' : ['View Products for Sale']},
        {'2' : ['View Low Inventory']},
        {'3' : ['Add to Inventory']},
        {'4' : ['Add New Product']}
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
            view_products('default');
        }else if(answer.choice === "2"){
            view_low_inventory();
        }else if(answer.choice === "3"){
            add_to_inventory();
        }else if(answer.choice === "4"){
            add_new_product();
        }
    })
}


function view_products(mode){
    let table = new Table({
        head: [
            'Item ID',
            'Product Name',
            'Department Name',
            'Price',
            'Stock Quantity'
        ]
    });

    let qry = "SELECT p.item_id, p.product_name, d.department_name, p.price, p.stock_quantity ";
    qry += "FROM products AS p ";
    qry += "LEFT JOIN departments AS d ";
    qry += "ON p.department_id = d.department_id ";
    qry += "ORDER BY item_id ASC";
    connection.query(qry, function(err, result){
        if(err){
            console.log(err);
            //return res.status(500).end();
        }
        console.log("\n\r\n\r=============================== View Products for Sale =================================");
        if(result){
            for(let i = 0; i < result.length; i++){
                table.push([result[i].item_id, result[i].product_name, result[i].department_name, "$"+result[i].price, result[i].stock_quantity]);
            }
            console.log(table.toString());
        }
        console.log("====================================================================================");
        //display menu again
        display();
    });
}

function view_low_inventory(){
    let table = new Table({
        head: [
            'Item ID',
            'Product Name',
            'Department Name',
            'Price',
            'Stock Quantity'
        ]
    });
    let qry = "SELECT p.item_id, p.product_name, d.department_name, p.price, p.stock_quantity ";
    qry += "FROM products AS p ";
    qry += "LEFT JOIN departments AS d ";
    qry += "ON p.department_id = d.department_id ";
    qry += "WHERE p.stock_quantity < 5 "
    qry += "ORDER BY stock_quantity ASC, item_id ASC";
    connection.query(qry, function(err, result){
        if(err){
            console.log(err);
            //return res.status(500).end();
        }
        console.log("\n\r\n\r=============================== View Low Inventory =================================");
        if(result){
            for(let i = 0; i < result.length; i++){
                table.push([result[i].item_id, result[i].product_name, result[i].department_name, "$"+result[i].price, result[i].stock_quantity]);
            }
            console.log(table.toString());
        }
        console.log("====================================================================================");
        //display menu again
        display();
    });
}

function add_to_inventory(){
    let table = new Table({
        head: [
            'Item ID',
            'Product Name',
            'Department Name',
            'Price',
            'Stock Quantity'
        ]
    });
    let qry = "SELECT p.item_id, p.product_name, p.department_id, d.department_name, p.price, p.stock_quantity ";
    qry += "FROM products AS p ";
    qry += "LEFT JOIN departments AS d ";
    qry += "ON p.department_id = d.department_id ";
    qry += "ORDER BY item_id ASC";
    connection.query(qry, function(err, result){
        if(err){
            console.log(err);
            //return res.status(500).end();
        }
        console.log("\n\r\n\r=============================== Add to Inventory =================================");
        if(result){
            for(let i = 0; i < result.length; i++){
                table.push([result[i].item_id, result[i].product_name, result[i].department_name, "$"+result[i].price, result[i].stock_quantity]);
            }
            console.log(table.toString());
        }
        console.log("====================================================================================");

        inquirer.prompt([
            {
                name: "item_id",
                type: "input",
                message: "Please enter item ID of the product you want to add inventory : "
            },
            {
                name: "quantity",
                type: "input",
                message: "How many do you want to add? : "
            }
        ])
        .then(function(answer){
            //what manager wants to add inventory
            const item_id = answer.item_id;
            const quantity = answer.quantity;
            const prev_qty = result[parseInt(item_id) - 1].stock_quantity;
            const updated_qty = parseInt(result[parseInt(item_id) - 1].stock_quantity) + parseInt(quantity);
            //update product inventory qty
            connection.query("UPDATE products SET ? WHERE ?", [{stock_quantity: updated_qty}, {item_id: result[parseInt(item_id) - 1].item_id}], function(err, result){
                if(err){
                    console.log(err);
                    //return res.status(500).end();
                }
            })
            console.log(`
            
            [Total quantity of Item ID( ${result[parseInt(item_id) - 1].item_id} ) is Successfully changed from ${prev_qty} to ${updated_qty}.]
            
            `);

            //update department overhead costs
            const product_purchase_price = parseFloat(result[parseInt(item_id) - 1].price) * parseInt(quantity) * 0.7;//assume that purchase price is 30% cheaper than sales price
            const department_id = result[parseInt(item_id) - 1].department_id;
            connection.query("SELECT over_head_costs FROM departments WHERE department_id=" +  department_id, function(err, result){
                if(err){
                    console.log(err);
                }
                const previous_overhead_costs = result[0].over_head_costs;
                connection.query("UPDATE departments SET ? WHERE ?", [{over_head_costs: (parseFloat(previous_overhead_costs) + parseFloat(product_purchase_price)).toFixed(2)}, {department_id: department_id}], function(err, result){
                    if(err){
                        console.log(err);
                        //return res.status(500).end();
                    }
                })
            })
            display();
        })
    });
}

function add_new_product(){
    const departments_info = [];
    connection.query("SELECT department_id, department_name FROM departments ORDER BY department_id ASC", function(err, result){
        if(err){
            console.log(err);
        }
        if(result){
            
            for(let i = 0; i < result.length; i++){
                const department_id = result[i].department_id;
                const department_name = result[i].department_name;
                departments_info[i] = department_id + ' ' +department_name;
            }
            //console.log(departments_info);
            inquirer.prompt([
                {
                    name: "product_name",
                    type: "input",
                    message: "Please enter product name : "
                }, 
                {
                    name: "department_name",
                    type: "list",
                    message: "Select department: ",
                    choices: departments_info
                },
                {
                    name: "price",
                    type: "input",
                    message: "How much is sales price? : "
                },
                {
                    name: "stock_quantity",
                    type: "input",
                    message: "How many do you want to add? : "
                }
            ])
            .then(function(answer){
                //what manager wants to add inventory
                const product_name = answer.product_name;
                const department_name = answer.department_name;
                const department_id = department_name.split(" ")[0];
                const price = parseFloat(answer.price).toFixed(2);
                const stock_quantity = answer.stock_quantity;

                // insert product
                connection.query("INSERT INTO products SET ? ", {product_name : product_name, department_id :  department_id, price : price, stock_quantity: stock_quantity}, function(err, result){
                    if(err){
                        console.log(err);
                        //return res.status(500).end();
                    }
                    console.log(`
                    
                    ${stock_quantity} of ${product_name} is successfully added.
                    
                    `);
                    display();
                })
                
        
                //update department overhead costs
                connection.query("SELECT over_head_costs FROM departments WHERE department_id=" +  department_id, function(err, result){
                    if(err){
                        console.log(err);
                    }
                    const previous_overhead_costs = result[0].over_head_costs;
                    const product_purchase_price = parseFloat(price) * parseInt(stock_quantity) * 0.7;//assume that purchase price is 30% cheaper than sales price
                    connection.query("UPDATE departments SET ? WHERE ?", [{over_head_costs: (parseFloat(previous_overhead_costs) + parseFloat(product_purchase_price)).toFixed(2)}, {department_id: department_id}], function(err, result){
                        if(err){
                            console.log(err);
                            //return res.status(500).end();
                        }
                    })
                })
                
            })
        }
    });
    
}

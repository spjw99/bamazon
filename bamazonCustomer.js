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
            'Item ID',
            'Product Name',
            'Department Name',
            'Price',
            'Stock Quantity'
        ]
    });
    connection.query("SELECT item_id, product_name, department_name, price, stock_quantity FROM products ORDER BY department_name ASC", function(err, result){
        if(err){
            console.log(err);
            //return res.status(500).end();
        }
        //console.log(result);
        if(result){
            for(let i = 0; i < result.length; i++){
                table.push([result[i].item_id, result[i].product_name, result[i].department_name, result[i].price, result[i].stock_quantity]);
            }
        }
        console.log(table.toString());
        
        //ask customer
        purchase_prompt(result);
    });
}
function purchase_prompt(products){
    inquirer.prompt([
        {
            name: "item_id",
            type: "input",
            message: "Please enter item ID of the product you want to purchse : "
        },
        {
            name: "quantity",
            type: "input",
            message: "How many do you want to purchase? : "
        }
    ])
    .then(function(answer){
        //what customer wants
        const item_id = answer.item_id;
        const quantity = answer.quantity;

        //selected product info
        const selected_product_info = products[parseInt(item_id) - 1];
        const selected_product_id = selected_product_info.item_id;
        const selected_product_price = selected_product_info.price;
        const selected_product_stock_quantity = selected_product_info.stock_quantity;

        //total order price
        const total_price = parseFloat(selected_product_price * quantity);

        //check product is available or not
        if(quantity <= selected_product_stock_quantity){//available
            connection.query("UPDATE products SET ? WHERE ?", [{stock_quantity: (selected_product_stock_quantity - quantity)}, {item_id: selected_product_id}], function(err, result){
                if(err){
                    console.log(err);
                    //return res.status(500).end();
                }
            })
            console.log("Thank you for the order. Your total is $" +  total_price.toFixed(2) + ".");
        }else{//insufficient
            console.log("Insufficient quantity!");
        }
        display();
    })
}
# bamazon

### node bamazonCustomer.js
![alt text](https://github.com/spjw99/bamazon/blob/master/screen_shot/bamaonCustomer1.JPG)
* Customer see products in bamazon
* Enter which item id
* Enter how many quantity
  * If there is not enough number of products in stock, it will return "Insufficient quantity!"
  * If customer purchased, it will return the thank you message with total price.
  * After purchase completed, it will update DB (stock_quantity, product_sales)
    
-----------------------
### node bamazonManager.js
* As default, manager will see menu
  * View Products for Sale
  * View Low Inventory
  * Add to Inventory
  * Add New Product
**1.VIEW**
![alt text](https://github.com/spjw99/bamazon/blob/master/screen_shot/bamazonManager_view.JPG)
* If manager selects "View Products for Sale", it returns products which currently are for sale.
* If manager selects "View Low Inventory", it returns products which have less than 5 stocks.

**2.ADD**
![alt text](https://github.com/spjw99/bamazon/blob/master/screen_shot/bamazonManager_add.JPG)
* If manager selects "Add to Inventory", enter item id and quantity.
 * After added inventory, update stock_quantity in products table and over_head_costs in departments table
* If manager selects "Add New Product", enter product name, department, price and quantity.
 * Insert the new product into products table and update over_head_costs in departments table.
 
-----------------------
### node bamazonSupervisor.js
* As default, Supervisor will see menu
  * View Product Sales by Department
  * Create New Department
![alt text](https://github.com/spjw99/bamazon/blob/master/screen_shot/bamazonSupervisor.JPG)
* If supervisor selects "View Product Sales by Department", it returns departments with overhead costs, product sales and total profit(product sales - overhead costs)
* If supervisor selects "Create New Department", enter department name and overhead costs.
 * Insert the new department into departments table.

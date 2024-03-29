var mysql = require('mysql');
var inquirer = require('inquirer')
var connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'Summer#611',
  database: 'bamazon'
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  readProducts();
});

function readProducts() {
  console.log("Selecting all products...\n");
  connection.query("SELECT * FROM bamazon.products;", function(err, res) {
    if (err) throw err;
    console.log(res);
  });
}

 function createProduct() {
   console.log("Inserting a new product...\n");
   var query = connection.query(
     "INSERT INTO products SET ?",
     {
       flavor: "Rocky Road",
       price: 3.0,
       quantity: 50
     },
     function(err, res) {
       if (err) throw err;
       console.log(res.affectedRows + " product inserted!\n");
       // Call updateProduct AFTER the INSERT completes
       updateProduct();
     }
   );

  // logs the actual query being run
   console.log(query.sql);
 }

 function updateProduct() {
   console.log("Updating all Rocky Road quantities...\n");
   var query = connection.query(
     "UPDATE products SET ? WHERE ?",
     [
       {
         quantity: 100
       },
       {
         flavor: "Rocky Road"
       }
     ],
     function(err, res) {
       if (err) throw err;
       console.log(res.affectedRows + " products updated!\n");
       // Call deleteProduct AFTER the UPDATE completes
       deleteProduct();
     }
   );

//   // logs the actual query being run
   console.log(query.sql);
 }

 function deleteProduct() {
   console.log("Deleting all strawberry icecream...\n");
   connection.query(
     "DELETE FROM products WHERE ?",
     {
       flavor: "strawberry"
     },
     function(err, res) {
       if (err) throw err;
       console.log(res.affectedRows + " products deleted!\n");
       // Call readProducts AFTER the DELETE completes
       readProducts();
     }
   );
 }

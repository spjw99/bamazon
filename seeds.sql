use bamazon;

INSERT INTO products
    (product_name, department_id, price, stock_quantity)
VALUES 
    ("iphone XR", 1, 749.99, 20),
    ("Echo Dot (2nd Generation)", 1, 50.00, 5),
    ("NEC NP-PA621X XGA 5000:1 6200 Lumens HDMI/VGA 240V LCD Projector", 1, 2999.99, 2),
    ("Dyson Cyclone V10 Motorhead Lightweight Cordless Stick Vacuum Cleaner", 1, 394.44, 5),
    ("Apple 15.4 inch MacBook Pro (Retina, Tourch Bar, 2.6GHz 6-Core Intel Core i7, 16GB Ram, 512GB SSD)", 1, 2799.99, 3),

    ("Mrs. Meyer's Clean day Dish Soap", 2, 4.99, 50),
    ("Weber 741001 Original Kettle 22-Inch Charcoal Grill", 2, 99.99, 20),
    ("Nespresso: Arpeggio, 50 Count", 3, 38.00, 50),
    ("LEGO City Police Station 60141 Building Kit with Cop Car, Jail Cell, and Helicopter", 4, 99.95, 10),
    ("eames® lounge chair & ottoman", 5, 5294.99, 3);

INSERT INTO departments (department_name, over_head_costs, product_sales)
VALUES ('ELECTRONICS, COMPUTERS & OFFICE', 22000.00, 0.00),
    ('HOME & KITCHEN', 1400.00, 0.00),
    ('FOOD & GROCERY', 1300.00, 0.00),
    ('TOYS, KIDS & BABY', 600.00, 0.00),
    ('FURNITURE', 11119.48, 0.00)
   
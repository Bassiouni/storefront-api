# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index `/product [GET]`
- Show `/product/:id [GET]`
- Create [token required] `/product [POST]`
- [OPTIONAL] Top 5 most popular products 
- [OPTIONAL] Products by category (args: product category)

#### Users
- Index [token required] `/user [GET]`
- Show [token required] `/user/:id [GET]`
- Create `/user [POST]`

#### Orders
- Current Order by user (args: user id)[token required] `/order/:user_id [GET]`
- [OPTIONAL] Completed Orders by user (args: user id)[token required]
- [ADDED] Create Order [token required] `/order [POST]`
- [ADDED] Add products to Order (args: user id)[token required] `/order/:user_id/products [POST]`

## Data Shapes
#### Product
- id
- name
- price
- [OPTIONAL] category

```
Table: products (
  id: Serial [Primary key],
  name: VarChar,
  price: Int
)
```

#### User
- id
- firstName
- lastName
- password

```
Table: users (
  id: Serial [Primary key],
  firstName: VarChar,
  lastName: VarChar,
  password: Text
);
```

#### Orders
- id
- user_id

```
Table: orders (
  id: Serial [Primary Key],
  user_id: INT foreign key to users table,
);
```

#### Order Products
- id
- quantity of each product in the order
- id of each product in the order

```
Table: order_products (
  id Serial[Primary Key],
  quantity int,
  order_id int foreign key to orders table,
  product_id int foreign key to products table
);
```

Create Table order_products (
  id Serial Primary Key,
  quantity Int,
  order_id int references orders(id),
  product_id int references products(id)
);
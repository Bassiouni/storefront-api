Create Table orders (
  id Serial Primary Key Not Null Unique,
  user_id INT REFERENCES users(id) Not Null
);

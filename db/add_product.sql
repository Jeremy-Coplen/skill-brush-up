INSERT INTO products (catagory, name, description, color, picture, price)
values ($1, $2, $3, $4, $5, $6)
RETURNING id;
<h1>SHOPPAS BAY ECOMMERCE APP</h1>
<h2>Backend Routes</h2>
<h3>Products</h3>

```
GET      /api/v1/products 
GET      /api/v1/products/:id
POST     /api/v1/products
PUT      /api/v1/products/:id
DELETE   /api/v1/products/:id
PUT gallery-images : /api/v1/products/gallery-images/:id
GET featured products: /api/v1/products/get/featured/:count
GET products count: /api/v1/products/get/count
```

<h3>Orders</h3>
```
GET      /api/v1/orders
GET      /api/v1/orders/:id
POST     /api/v1/orders
PUT      /api/v1/orders/:id
DELETE   /api/v1/orders/:id
GET orders count: /api/v1/orders/get/count
```

<h3>Users</h3>
```
GET      /api/v1/users
GET      /api/v1/users/:id
POST     /api/v1/users
PUT      /api/v1/users/:id
DELETE   /api/v1/users/:id
GET users count: /api/v1/users/get/count
```

<h3>Register new user</h3>

```
POST     /api/v1/users/register
```

<h3>Login user</h3>
To login the user and get the auth token you can use:

```
POST     /api/v1/users/login
```

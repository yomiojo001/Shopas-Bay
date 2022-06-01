<h1>SHOPPAS BAY ECOMMERCE APP</h1>
<h2>Backend Routes</h2>
<h3>Products</h3>

<code> GET      /api/v1/products <br>
GET      /api/v1/products/:id<br>
POST     /api/v1/products<br>
PUT      /api/v1/products/:id<br>
DELETE   /api/v1/products/:id <br>
PUT gallery-images : /api/v1/products/gallery-images/:id<br>
GET featured products: /api/v1/products/get/featured/:count<br>
GET products count: /api/v1/products/get/count </code>

<h3>Orders</h3>
<code>GET      /api/v1/orders<br>
GET      /api/v1/orders/:id<br>
POST     /api/v1/orders<br>
PUT      /api/v1/orders/:id<br>
DELETE   /api/v1/orders/:id<br>
GET orders count: /api/v1/orders/get/count</code>
<h3>Users</h3>
<code>GET      /api/v1/users<br>
GET      /api/v1/users/:id<br>
POST     /api/v1/users<br>
PUT      /api/v1/users/:id<br>
DELETE   /api/v1/users/:id<br>
GET users count: /api/v1/users/get/count</code><br>
<h3>Register new user</h3>
<code>POST     /api/v1/users/register</coe>
<h3>Login user</h3>
To login the user and get the auth token you can use:

<code>POST     /api/v1/users/login</code>

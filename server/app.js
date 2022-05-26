const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv/config')
const authJwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler')


app.use(cors());
app.options('*', cors())



// middleware
app.use(bodyParser.json())
app.use(morgan('tiny'))
app.use(authJwt())
app.use('/public/uploads', express.static(__dirname + '/public/uploads'))
app.use(errorHandler)


const api = process.env.API_URI
const PORT = process.env.PORT;

// Routes
const productsRouter = require('./routes/products')
const userRouter = require('./routes/users')
const categoryRouter = require('./routes/categories')
const orderRouter = require('./routes/orders');



// router
app.use(`${api}/products`, productsRouter)
app.use(`${api}/users`, userRouter)
app.use(`${api}/categories`, categoryRouter)
app.use(`${api}/orders`, orderRouter)



mongoose.connect(process.env.CONNECTION_URI)
.then(() => {
    console.log('Database Connection is ready..');
})
.catch((err) => {
    console.log(err);
})

app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
} )
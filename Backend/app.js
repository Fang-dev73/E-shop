const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv/config');

app.use(cors());
app.options('*', cors())

//middleware
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use('/public/uploads/', express.static(__dirname + '/public/uploads/'))

//Routers
const productsRouter = require('./routers/products');
const categoriesRouter = require('./routers/categories');
const usersRouter = require('./routers/users');
const ordersRouter = require('./routers/orders');

const api = process.env.API_URL;

app.use(`${api}/products`,productsRouter)
app.use(`${api}/categories`,categoriesRouter)
app.use(`${api}/users`,usersRouter)
app.use(`${api}/orders`,ordersRouter)

mongoose.connect(process.env.CONNECTION_STRING,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'gokart-database'
})
.then(()=>{
    console.log('--------------Database is connected successfully-------------');
})
.catch((error)=> {
    console.log('-----------------Database is not connected--------------------');
    console.log(error);
    
})

app.listen(3000,()=>{
    console.log(api);
    console.log('Server is running at http://localhost:3000');
})



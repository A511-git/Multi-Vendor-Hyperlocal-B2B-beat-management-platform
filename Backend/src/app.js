import express, { json } from "express";
import 'dotenv/config'
import { loggerSetup } from "./middlewares/logger.middleware.js";
import { retry } from "./utils/retry.js";

export const app = express();

//-------------------------------------------

// Logger Setup
loggerSetup(app)

//-------------------------------------------

// DataBase Setup
import { connectDB } from "./db/sequalize/sequalize.js";
retry(connectDB, 10, 1000) 
//-------------------------------------------

// Redis Setup
import {checkRedisConnection} from "./db/cache/redis.js";
checkRedisConnection()

//-------------------------------------------

// Cookie Parser
import cookieParser from "cookie-parser";
app.use(cookieParser())

//-------------------------------------------


// Routes Setup
app.get('/', (req, res) => res.send('Hello World!'));

import {getProducts, getProduct} from "./product.js";

app.get('/products', async (req, res) => {

    let data = await redis.get('products');
    if(data)
        return res.json(JSON.parse(data));
    
    data = await getProducts();
    redis.set('products', JSON.stringify(data))
    res.json(data);
})

app.get('/product/:id', async (req, res) => {
    const {id} = req.params;
    let data = await redis.get(`product:${id}`);
    if(data)
        return res.json(JSON.parse(data));
    
    data = await getProduct(id);
    redis.set(`product:${id}`, JSON.stringify(data))
    res.json(data);
})

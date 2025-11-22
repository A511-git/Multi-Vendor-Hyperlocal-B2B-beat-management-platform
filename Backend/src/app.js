import express, { json } from "express";
import 'dotenv/config'
import { loggerSetup } from "./middlewares/logger.middleware.js";
import { retry } from "./utils/retry.js";

export const app = express();

//-------------------------------------------

// Logger Setup
loggerSetup(app)

//-------------------------------------------

// Initialize Models and Associations
import "../src/models/index.js";
//-------------------------------------------

// DataBase Setup
import { connectDB } from "./db/sequalize/sequalize.js";
retry(connectDB, 10, 1000)
//-------------------------------------------

// Redis Setup
import {connectRedis} from "./db/cache/redis.js";
retry(connectRedis, 10, 1000)
//-------------------------------------------

// JSON Body Parser
app.use(json());
//-------------------------------------------

// Cookie Parser
import cookieParser from "cookie-parser";
app.use(cookieParser())

//-------------------------------------------


// Routes Setup
import globalRouter from "./routes/index.js";

app.use('/api/v1', globalRouter)

app.get('/', (req, res) => res.send('Hello World!'));

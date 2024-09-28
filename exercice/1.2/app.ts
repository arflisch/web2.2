import express from "express";
import { requestCounterMiddleware } from "./utils/counter"; 

import usersRouter from "./routes/users";
import pizzaRouter from "./routes/pizzas";
import filmRouter from "./routes/fillms"

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let counter = 0;
app.use((req, _res, next) => {
    if(req.method === "GET"){
        counter++;
        console.log(`Request GET : ${counter}`)
    }
    next();   
})

app.use(requestCounterMiddleware);

app.use("/users", usersRouter);
app.use("/pizzas", pizzaRouter);
app.use("/films", filmRouter);

export default app;

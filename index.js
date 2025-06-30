import express from "express";
import mongo_connection from "./dataBase/mongo_conn.js";
import createCategory from "./controller/categoryController.js";

import dontenv from "dotenv";
import auth from "./middleware/auth.js";
import router from "./controller/authCotroller.js";
import categoryRouter from "./routes/categoryRoutes.js";

dontenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.listen(port , ()=>{
    console.log(`Server listen on port ${port}`);
})

mongo_connection();



app.use("/cateogry" , categoryRouter);
app.use("/user" , router);



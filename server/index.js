import express from "express";
import cors from "cors";
import morgan from "morgan";
import connect from "./config_database/database.js";
import router from "./router/routes.js";

const app = express();
const port = 4000;


// middleware
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.disable("x-powered-by");


app.get("/",(req,res)=>{
    res.status(201).json("HOME Hai vmrro");
});

// api routes */

app.use('/api', router);

// successful connection

connect().then(()=>{
    try {

        app.listen(port, ()=>{
            console.log("Server is running on port", port);
        })
        
    } catch (error) {
        console.log("cannot connect to the server");
    }
}).catch(error =>{
    console.log("Invalid database");
})


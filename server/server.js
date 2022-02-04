//this gotta be at the top
const express = require("express");
const cors = require("cors");
const app = express();
const port = 8000;

const cookieParser = require('cookie-parser');

require('dotenv').config();





//middleware
//this allows the backend to talk to the front end
app.use(cookieParser());
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.json(), express.urlencoded({ extended: true }));
//run the connect to monoogse file from config
require("./config/mongoose.config")

//import the routes and execute it passing in the app
//change these to the correct ones
const userRoutes = require("./routes/user.routes")
userRoutes(app)





//needs to be at bottom
app.listen(port, () => console.log(`Listening on port: ${port}`));
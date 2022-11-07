const express = require ('express');
const cors = require('cors');
const userrouter = require ('./routes/user')
const dotenv = require('dotenv').config();
const {errorHandler}=  require('./middleware/errorMiddleware');
const connectDB = require('./config/db');

connectDB();
const app = express();

const options = {
    origin:"http://localhost:3000",
    optionSuccessStatus: 200
}

app.use(express.json());
app.use(cors(options));

 



app.use('/', userrouter);

app.use(errorHandler)


const PORT= process.env.PORT || 8000;

app.listen(PORT,()=>{
    console.log(`Sever is running on port ${PORT}`)
})
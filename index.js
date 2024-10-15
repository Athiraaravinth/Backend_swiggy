const express = require("express");
const dotEnv = require('dotenv');
const mongoose = require('mongoose');
const vendorRoutes = require('./Routes/VendorRoute');
const bodyParser = require('body-parser');
const firmRoutes  = require('./Routes/FirmRoute');
const productRoutes = require('./Routes/ProductRoute');

const path = require('path');

const app = express();

const PORT = process.env.PORT || 4070

dotEnv.config();

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("Database connected"))
.catch((error) => console.log(error))

app.use(bodyParser.json());
app.use('/vendor',vendorRoutes);
app.use('/firm',firmRoutes); 
app.use('/product',productRoutes);
app.use('/uploads',express.static('uploads'));

app.listen(PORT, '0.0.0.0',(error)=>{
    if(error){
        console.log(`server not running`)
    }else{
        console.log(`server started and running 4000 `)
    }

})

app.use('/',(req,res)=>{
    res.send("<h1> Welcome to ruby resturant");
})

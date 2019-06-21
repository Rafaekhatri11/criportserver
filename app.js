const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = require('./src/router/api')
const cors = require('cors');



mongoose.connect("mongodb://rafae:meh169222@ds233596.mlab.com:33596/criport",{useNewUrlParser: true});
mongoose.connection.on('connected', (err) =>{
    console.log("Successfully connected to the Database");
});

app.use(cors());


app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());


app.use(router);    

app.get('/', (req,res)=>{
    res.send("Hello World");
})

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})
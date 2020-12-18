const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const port = process.env.PORT || 3001;

require("dotenv").config();

const userRoute = require('./routes/userRouter');
const todoRoute = require('./routes/todoRoute');
const compression = require('compression');



const app = express();
app.use(express.json());
app.use(cors());


mongoose.connect('mongodb+srv://sbobbili:Chintu@509216@nbadcluster.nhrgk.mongodb.net/test?retryWrites=true&w=majority', 
    {useNewUrlParser: true,
     useUnifiedTopology: true,
     useCreateIndex: true,
    }, (err) => {
        if(err) throw err;
        console.log("DB Connected :)");
    });

// mongodb+srv://sbobbili:<password>@nbadcluster.nhrgk.mongodb.net/<dbname>?retryWrites=true&w=majority
console.log('app');
app.use('/user',userRoute);
app.use('/todos',todoRoute);
app.use('/budget', require('./routes/budgetRoute'));
app.use('/expense', require('./routes/expenseRoute'));
app.use(compression());


app.listen(port, () => {
    console.log('API Served and  listening at http://localhost:'+port);
});

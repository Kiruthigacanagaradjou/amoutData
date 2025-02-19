const http = require('http');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const server = http.createServer(app);
const amountModel = require('./models/amount');
// const amountModel = mongoose.model('Amount', amountSchema);

mongoose.connect('mongodb://localhost:27017/amount', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log("connected");
    //console.log(amount)
}).catch((error)=>{
    console.log("error",error);
});

async function createAmount() {
    // let amount = new amountModel({
    //     creditAmount: 10000
    // });
    // amount.save();
    let amountData = await amountModel.find().lean().exec();
    console.log(amountData,new Date().getHours())
    if(new Date().getHours() > 6 && new Date().getHours() < 9){
        console.log("im there")
        amountData[0].creditAmount -=10;
        await amountModel.find({_id:amountData[0]._id}).updateOne({creditAmount:amountData[0].creditAmount});
    }
    if(new Date().getHours() > 9 && new Date().getHours() < 24){
        console.log("im there ji")
        amountData[0].creditAmount -=15;
        await amountModel.find({_id:amountData[0]._id}).updateOne({creditAmount:amountData[0].creditAmount});
    }
}

app.get('/', (req, res) => {
    createAmount();
    res.send('Hello World');
})

app.listen(3000, () => {  
    console.log("im there in server")
})

const express=require('express');
const bodyparser=require('body-parser');
const cors=require('cors');
const app=express();

app.use(bodyparser.json());
app.use(cors());


app.listen(3000,() =>{
    console.log('server run at 3000');
})
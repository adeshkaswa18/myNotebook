const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/mynotebook";


const connectToMongo = () => {
    mongoose.connect(mongoURI, ()=>{
        console.log("connected to mongoose");
    })
}

module.exports = connectToMongo;
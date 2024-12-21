const mongoose = require('mongoose');
const colors = require('colors');

const connecttoDb = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log(`Database is connected to ${mongoose.connection.host}`.bgGreen.white);
        
    } catch (error) {
        console.log(`MongoDb DataBase Error ${error}`.bgRed.white);
    }
}

module.exports = connecttoDb
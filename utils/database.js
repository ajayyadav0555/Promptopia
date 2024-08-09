import mongoose from "mongoose";
let isConnected=false


export const connectToDB=async()=>{
    mongoose.set("strictQuery",true);
    if(isConnected){
        console.log("MongoDb is already connected")
        return ;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI,{
            dbName:"Share_prompt",
            useNewUrlParser:true,
            useUnifiedTopology:true,
        })
        isConnected=true;
        console.log("MOngoDB connected")
    } catch (error) {
        console.log("Error connecting to MongoDB:", error)
    }
}


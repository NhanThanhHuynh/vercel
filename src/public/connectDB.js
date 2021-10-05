const mongoose = require('mongoose')
const connectDB = async () => {
    try {
      await mongoose.connect(
        `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.ff8lt.mongodb.net/Suckedbook?retryWrites=true&w=majority`,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        }
      );
      console.log("Connect mongodb");
    } catch (error) {
      console.log("Failted to connect mongoDB");
      console.log(error.message);
    }
}

module.exports={connectDB}


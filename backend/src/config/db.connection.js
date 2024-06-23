const mongoose = require('mongoose');

// Mongodb connection url :
const url = process.env.MONGO_DB_URL;

// Mongodb Connection :
mongoose.set('strictQuery', false);
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDb Connection Successful');
  })
  .catch((err) => console.log('Connection failed with error :' + err));

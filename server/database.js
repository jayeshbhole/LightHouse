require("dotenv/config");
const mongoose = require("mongoose");

const path = process.env.MONGO_URI;

mongoose
  .connect(path, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Database Connected Successfully"))
  .catch((err) => console.log(err));

// const connection = mongoose.connection();

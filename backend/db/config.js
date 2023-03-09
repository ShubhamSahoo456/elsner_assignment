const mongoose = require("mongoose");

const MONGO =
  "mongodb+srv://shubhamsahoo456:1234@cluster0.c33agjs.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connection successful");
  })
  .catch((err) => {
    console.log(err);
  });

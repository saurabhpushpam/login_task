const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

app.use(express.json());

const mongoose = require('mongoose');

const DB = "mongodb+srv://spuspam111:Sp123456@cluster0.0taaaup.mongodb.net/registration_system?retryWrites=true&w=majority";
mongoose.connect(DB)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch(error => {
    console.error("Error connecting to MongoDB:", error);
  });


const user_route = require("./routes/userRoutes");
app.use('/api', user_route);


const PORT = 5000;


app.listen(PORT, function () {
  console.log('server is running on port : ', PORT);
});


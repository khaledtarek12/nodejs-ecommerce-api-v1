const mongoose = require("mongoose");
const dbConnection = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then((connection) => {
      console.log(`Connected to MongoDB...${connection.connection.host}`);
    })
  // .catch((error) => {
  //   console.log(`DataBase Error: ${error.message}`);
  //   process.exit(1);
  // });
};

module.exports = dbConnection;

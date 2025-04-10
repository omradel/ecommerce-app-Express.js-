import mongoose from "mongoose";

const dbConnection = () => {
  mongoose.connect(process.env.DB_URL).then((connect) => {
    console.log(`DB connected ${connect.connection.host}`);
  });
};

export default dbConnection;

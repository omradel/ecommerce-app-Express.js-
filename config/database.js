import mongoose from "mongoose";

const dbConnection = () => {
  mongoose.connect(process.env.DB_URL).then((connect) => {
    console.log(`DB connected ${connect.connection.host}`);
  });
  // .catch((error) => {
  //   console.log(`DB faild to connect ${error}`);
  //   process.exit(1);
  // });
};

export default dbConnection;

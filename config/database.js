import mongoose from "mongoose";

async function connectDB() {
  mongoose
    .connect(process.env.MONGODB_URI)
    .catch((err) => console.log("Error connecting to the DB:", err)); // initial connection errors

  mongoose.connection.on("error", (err) => {
    console.log("Error on DB connection:", err);
  }); // errors after initial connection was established

  mongoose.connection.once("open", function () {
    console.log("DB connected");
  });
}

// connectDB();

// export { connectDB };

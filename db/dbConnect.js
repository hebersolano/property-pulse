import mongoose from "mongoose";

if (global?.mongoose === undefined) {
  global.mongoose = null;
}

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect(dbUrl) {
  const DBurl = new URL(dbUrl);
  if (cached.conn) {
    console.log("Using cached connection");
    return cached.conn;
  }
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };
    console.log("Connection to:", DBurl.hostname);
    cached.promise = mongoose.connect(dbUrl, opts).then((mongoose) => {
      console.log("DB connection started");
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }
  return cached.conn;
}

export default dbConnect.bind(null, MONGODB_URI);

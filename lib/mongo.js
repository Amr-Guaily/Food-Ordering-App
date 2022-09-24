import mongoose from 'mongoose';

const MONGO_URL = process.env.NEXT_PUPLIC_MONGO_URL;

if (!MONGO_URL) {
  throw new Error(
    'Please define the MONGO_URL environment variable inside .env.local'
  );
}

/**
 * We can directly connect to our database, but we created a cached varible - Why!?
 * it's used for maintaining cached connection across hot reloads - what does mean?
 * In our app we are going to fetch pizza data/specific id for each pizza, we have an admin panal so we are going to update/delete, and much more processes,
 * for all those processes we have to connect to mongodb again and again..
 * To preveent this, we used cached variable and it checks whether we are connecting to mongodb or not and if we are alredy connected it's not going to connect again.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGO_URL, opts).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;

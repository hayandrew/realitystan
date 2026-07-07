import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/bbstan";

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 2000,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongooseInstance) => {
      return mongooseInstance;
    });
  }
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

const PersonSchema = new mongoose.Schema({
  id: { type: Number, trim: true },
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  image: { type: String, required: true },
  showId: { type: String, required: true, trim: true }
});

const ShowSchema = new mongoose.Schema({
  name: { type: String, trim: true },
  shortId: { type: String, required: true, trim: true },
  nomineesTitle: { type: String, required: true, trim: true },
  peopleTitle: { type: String, required: true },
  leaderTitle: { type: String, required: true, trim: true }
});

const WeekSchema = new mongoose.Schema({
  showId: { type: String, trim: true },
  startDate: { type: String, required: true, trim: true },
  endDate: { type: String, required: true, trim: true },
  nominees: { type: Array, trim: true },
  hoh: { type: Array, trim: true },
  evicted: { type: Array, trim: true }
});

export const Person = mongoose.models.Person || mongoose.model("Person", PersonSchema);
export const Show = mongoose.models.Show || mongoose.model("Show", ShowSchema);
export const Week = mongoose.models.Week || mongoose.model("Week", WeekSchema);

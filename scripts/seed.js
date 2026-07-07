const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");

// Load .env.local if it exists
const envPath = path.resolve(__dirname, "../.env.local");
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf-8");
  envContent.split("\n").forEach(line => {
    const parts = line.split("=");
    if (parts.length >= 2) {
      const key = parts[0].trim();
      const val = parts.slice(1).join("=").trim().replace(/^['"]|['"]$/g, "");
      if (key && !key.startsWith("#")) {
        process.env[key] = val;
      }
    }
  });
}

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/bbstan";

const PersonSchema = new mongoose.Schema({
  id: Number,
  firstName: String,
  lastName: String,
  image: String,
  showId: String
});

const ShowSchema = new mongoose.Schema({
  name: String,
  shortId: String,
  nomineesTitle: String,
  peopleTitle: String,
  leaderTitle: String
});

const WeekSchema = new mongoose.Schema({
  showId: String,
  startDate: String,
  endDate: String,
  nominees: Array,
  hoh: Array,
  evicted: Array
});

const Person = mongoose.models.Person || mongoose.model("Person", PersonSchema);
const Show = mongoose.models.Show || mongoose.model("Show", ShowSchema);
const Week = mongoose.models.Week || mongoose.model("Week", WeekSchema);

const showId = "5c040f9c3090cc98f4822a21";

const showData = {
  _id: showId,
  name: "Star Wars Big Brother",
  shortId: "us-swbb",
  nomineesTitle: "Nominees",
  peopleTitle: "Voters",
  leaderTitle: "Head of Household"
};

const nominees = [2, 3, 5];
const hoh = [1, 4];

const people = [
  { id: 1, showId, firstName: "Boba Fett", lastName: "", image: "boba.jpg" },
  { id: 2, showId, firstName: "C3P0", lastName: "", image: "c3p0.jpg" },
  { id: 3, showId, firstName: "Chewie", lastName: "", image: "chewbacca.jpg" },
  { id: 4, showId, firstName: "Finn", lastName: "", image: "finn.jpg" },
  { id: 5, showId, firstName: "Han", lastName: "Solo", image: "han.jpg" },
  { id: 6, showId, firstName: "Lando", lastName: "Calrissian", image: "lando.jpg" },
  { id: 7, showId, firstName: "Leia", lastName: "Organa", image: "leia.jpg" },
  { id: 8, showId, firstName: "Luke", lastName: "Skywalker", image: "luke.jpg" },
  { id: 9, showId, firstName: "Maul", lastName: "", image: "maul.jpg" },
  { id: 10, showId, firstName: "Obi-Wan", lastName: "Kenobi", image: "obiwan.jpg" },
  { id: 11, showId, firstName: "Padme", lastName: "Amidala", image: "padme.jpg" },
  { id: 12, showId, firstName: "Palpatine", lastName: "", image: "palpatine.jpg" },
  { id: 13, showId, firstName: "R2D2", lastName: "", image: "r2d2.jpg" },
  { id: 14, showId, firstName: "Rey", lastName: "", image: "rey.jpg" },
  { id: 15, showId, firstName: "Vader", lastName: "", image: "vader.jpg" },
  { id: 16, showId, firstName: "Yoda", lastName: "", image: "yoda.jpg" },
  { id: 17, showId, firstName: "Kylo", lastName: "Ren", image: "kylo.jpg" }
];

const weekData = {
  showId,
  startDate: "2026-07-06",
  endDate: "2026-07-13",
  nominees: nominees,
  hoh: hoh,
  evicted: []
};

async function seed() {
  console.log("Connecting to MongoDB at:", MONGODB_URI);
  await mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 2000 });
  console.log("Connected successfully.");

  // Check if show exists
  const existingShow = await Show.findById(showId);
  if (existingShow) {
    console.log("Database already contains show data. Skipping seed.");
  } else {
    console.log("Database is empty. Seeding Star Wars Big Brother...");

    await Show.create(showData);
    console.log("Created Show document.");

    await Person.create(people);
    console.log(`Created ${people.length} Person documents.`);

    await Week.create(weekData);
    console.log("Created Week document.");

    console.log("Database seeding completed successfully!");
  }

  await mongoose.connection.close();
  console.log("Connection closed.");
}

seed().catch(err => {
  console.error("Seeding failed:", err);
  process.exit(1);
});

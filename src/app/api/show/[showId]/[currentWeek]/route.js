import { NextResponse } from "next/server";
import { connectToDatabase, Show, Person, Week } from "@/lib/mongodb";
import staticData from "@/data/staticData";

export async function GET(request, { params }) {
  // Await the route parameters (Next.js 15 App Router requirement)
  const { showId, currentWeek: weekParam } = await params;
  const targetWeekIndex = parseInt(weekParam, 10) - 1 || 0;

  try {
    // Attempt database connection
    await connectToDatabase();

    // Fetch show data from database
    const showData = await Show.findById(showId);
    if (!showData) {
      throw new Error("Show not found in database");
    }

    const personData = await Person.find({ showId });
    const weekData = await Week.find({ showId });
    
    if (weekData.length === 0) {
      throw new Error("No weeks found for show in database");
    }

    const weekObj = weekData[targetWeekIndex] || weekData[0];

    const nominees = personData.filter(person =>
      weekObj.nominees.includes(person.id)
    );
    const hoh = personData.filter(person => 
      weekObj.hoh.includes(person.id)
    );
    const voters = personData.filter(
      person =>
        !weekObj.nominees.includes(person.id) &&
        !weekObj.hoh.includes(person.id)
    );

    return NextResponse.json({
      show: showData,
      currentWeek: weekObj,
      hoh,
      nominees,
      voters,
      people: personData,
      weeks: weekData
    });

  } catch (error) {
    console.warn("Database error or not configured. Falling back to static mockup data:", error.message);
    
    // Static Fallback
    const showData = staticData.show;
    const personData = staticData.people;

    // Construct mock week data matching staticData choices
    const weekObj = {
      showId: "static-1",
      startDate: "2026-07-06",
      endDate: "2026-07-13",
      nominees: staticData.nominees, // [2, 3, 5]
      hoh: staticData.hoh, // [1, 4]
      evicted: []
    };

    const weekData = [weekObj];

    const nominees = personData.filter(person =>
      weekObj.nominees.includes(person.id)
    );
    const hoh = personData.filter(person => 
      weekObj.hoh.includes(person.id)
    );
    const voters = personData.filter(
      person =>
        !weekObj.nominees.includes(person.id) &&
        !weekObj.hoh.includes(person.id)
    );

    return NextResponse.json({
      show: showData,
      currentWeek: weekObj,
      hoh,
      nominees,
      voters,
      people: personData,
      weeks: weekData
    });
  }
}

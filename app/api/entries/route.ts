import { NextResponse } from "next/server";
import connectDB from "../../lib/db";
import Entry from "../../lib/schemas/entry";

export async function GET() {
  try {
    await connectDB();
    const entries = await Entry.find({});
    return NextResponse.json({ success: true, data: entries }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      {
        sucess: false,
        error: err instanceof Error ? err.message : "Please try again",
      },
      { status: 400 },
    );
  }
}

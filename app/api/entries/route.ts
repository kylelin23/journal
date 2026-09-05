import { NextResponse, NextRequest } from "next/server";
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

export async function POST(request : NextRequest){
    try{
        await connectDB();
        const body = await request.json();
        console.log('POST body:', body);
        const newEntry = await Entry.create(body);
        return NextResponse.json({ success : true, data : newEntry}, { status : 200 });
    }
    catch(err){
      console.log(err);
      return NextResponse.json({ error: err instanceof Error ? err.message : "Something went wrong" }, { status: 500 })
    }
}
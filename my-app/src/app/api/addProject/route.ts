import { NextResponse } from "next/server";
import { supabaseServer } from "@/utils/SupaBase/supaBaseServer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, tech, desc, github, preview, image } = body;

    const { error } = await supabaseServer.from("projects").insert([
      { name, tech, desc, github, preview, image },
    ]);

    if (error) {
      console.error(error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

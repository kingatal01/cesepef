import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File | null;

  if (!file) return NextResponse.json({ error: "Aucun fichier" }, { status: 400 });
  if (!["image/jpeg", "image/png", "image/webp"].includes(file.type))
    return NextResponse.json({ error: "Format non supporté" }, { status: 400 });
  if (file.size > 3 * 1024 * 1024)
    return NextResponse.json({ error: "Max 3 Mo" }, { status: 400 });

  const ext = file.name.split(".").pop() ?? "jpg";
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const uploadDir = path.join(process.cwd(), "public", "images", "realisations");

  await mkdir(uploadDir, { recursive: true });
  await writeFile(path.join(uploadDir, filename), Buffer.from(await file.arrayBuffer()));

  return NextResponse.json({ url: `/images/realisations/${filename}` });
}

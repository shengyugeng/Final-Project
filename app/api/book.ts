import { NextResponse } from "next/server";
import dbConnect from "@/app/lib/db";
import Book from "@/app/models/Book";

export async function GET(req: Request) {
  await dbConnect();

  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = 5; // Number of books per page

  const totalBooks = await Book.countDocuments();
  const totalPages = Math.ceil(totalBooks / limit);

  const books = await Book.find()
    .skip((page - 1) * limit)
    .limit(limit);

  return NextResponse.json({ books, totalPages });
}

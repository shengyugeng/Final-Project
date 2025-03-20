import { NextResponse, NextRequest } from "next/server";
import connectMongoDB from "@/app/lib/db";
import Book from "@/app/models/Book";

export async function GET(request: NextRequest) {
  await connectMongoDB();

  const search = request.nextUrl.searchParams.get("search") || "";
  const page = parseInt(request.nextUrl.searchParams.get("page") || "1", 10);
  const limit = 13; // Number of books per page

  // Count total books matching the search query
  const totalBooks = await Book.countDocuments({
    title: { $regex: search, $options: "i" },
  });
  const totalPages = Math.ceil(totalBooks / limit);

  // Get paginated books
  const books = await Book.find({ title: { $regex: search, $options: "i" } })
    .skip((page - 1) * limit)
    .limit(limit);

  return NextResponse.json({ books, totalPages });
}

export async function POST(request: NextRequest) {
  await connectMongoDB();
  const { title, author, price } = await request.json();
  const newBook = await Book.create({ title, author, price });
  return NextResponse.json({
    book: newBook,
    message: "Book added successfully!",
  });
}

import { NextResponse } from "next/server";
import connectMongoDB from "@/app/lib/db";
import Book from "@/app/models/Book";

export async function GET() {
  await connectMongoDB();

  const books = await Book.insertMany([
    { title: "Book 1", author: "Author A", price: 19.99 },
    { title: "Book 2", author: "Author B", price: 29.99 },
    { title: "Book 3", author: "Author C", price: 39.99 },
  ]);

  return NextResponse.json({ message: "Books seeded successfully!", books });
}

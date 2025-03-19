import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "@/app/lib/db";
import Book from "@/app/models/Book";

export async function PUT(req: NextRequest, { params }: any) {
  const { id } = params;
  const { title, author, price } = await req.json();

  await connectMongoDB();

  await Book.findByIdAndUpdate(id, { title, author, price });

  return NextResponse.json({ message: "Book updated successfully!" });
}

export async function DELETE(_: NextRequest, { params }: any) {
  const { id } = params;
  await connectMongoDB();
  await Book.findByIdAndDelete(id);
  return NextResponse.json({ message: "Book deleted successfully!" });
}

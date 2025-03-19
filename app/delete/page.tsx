"use client";
import { useState, useEffect } from "react";
import data from "@/app/lib/db";

interface Book {
  _id: string;
  title: string;
  author: string;
  price: number;
}

export default function DeleteBookPage() {
  const [books, setBooks] = useState<Book[]>([]); // ✅ Explicitly define the type

  const fetchBooks = async () => {
    const res = await fetch("/api/books");
    const data = await res.json();
    setBooks(data.books as Book[]); // ✅ Explicitly cast the fetched data
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleDelete = async (id: string) => {
    await fetch(`/api/books/${id}`, { method: "DELETE" });
    fetchBooks(); // Refresh list
  };

  return (
    <div className="p-8 min-h-screen bg-gray-50">
      <h1 className="text-xl font-semibold">Delete Books</h1>
      <ul>
        {books.map(
          (
            book: Book // ✅ Explicitly tell TypeScript that book is of type Book
          ) => (
            <li key={book._id} className="flex justify-between p-2 border-b">
              {book.title} by {book.author} (${book.price})
              <button
                onClick={() => handleDelete(book._id)}
                className="bg-red-600 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </li>
          )
        )}
      </ul>
    </div>
  );
}

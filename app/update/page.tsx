"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Book {
  _id: string;
  title: string;
  author: string;
  price: number;
}

export default function UpdateBookPage() {
  const router = useRouter();
  const [books, setBooks] = useState<Book[]>([]); //  Set the correct type
  const [selectedBook, setSelectedBook] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newPrice, setNewPrice] = useState("");

  const fetchBooks = async () => {
    const res = await fetch("/api/books");
    const data = await res.json();
    setBooks(data.books as Book[]); //  Type assertion to ensure correct data type
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleUpdate = async () => {
    if (!selectedBook) return;
    await fetch(`/api/books/${selectedBook}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: newTitle,
        author: newAuthor,
        price: parseFloat(newPrice),
      }),
    });
    router.push("/"); // Redirect to Home Page
  };

  return (
    <div className="p-8 min-h-screen bg-gray-50">
      <h1 className="text-xl font-semibold">Update Book</h1>
      <select
        onChange={(e) => {
          setSelectedBook(e.target.value);
          const book = books.find((b) => b._id === e.target.value);
          if (book) {
            setNewTitle(book.title);
            setNewAuthor(book.author);
            setNewPrice(book.price.toString());
          }
        }}
        className="border p-2 my-2 w-full"
      >
        <option value="">Select a book to update</option>
        {books.map(
          (
            book: Book // Ensure TypeScript knows the type
          ) => (
            <option key={book._id} value={book._id}>
              {book.title}
            </option>
          )
        )}
      </select>

      <input
        placeholder="New Title"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
        className="border p-2 my-2 w-full"
      />
      <input
        placeholder="New Author"
        value={newAuthor}
        onChange={(e) => setNewAuthor(e.target.value)}
        className="border p-2 my-2 w-full"
      />
      <input
        placeholder="New Price"
        type="number"
        value={newPrice}
        onChange={(e) => setNewPrice(e.target.value)}
        className="border p-2 my-2 w-full"
      />
      <button
        onClick={handleUpdate}
        className="bg-blue-700 text-white px-4 py-2 rounded"
      >
        Update Book
      </button>
    </div>
  );
}

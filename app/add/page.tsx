"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddBookPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState("");

  const handleAddBook = async () => {
    if (!title || !author || !price) {
      setError("All fields are required!");
      alert("please input book information");
      return;
    }
    await fetch("/api/books", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, author, price: parseFloat(price) }),
    });
    router.push("/"); // Redirect to Home Page
  };

  return (
    <div className="p-8 min-h-screen bg-gray-50">
      <h1 className="text-xl font-semibold">Add New Book</h1>
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 my-2 w-full"
      />
      <input
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        className="border p-2 my-2 w-full"
      />
      <input
        placeholder="Price"
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="border p-2 my-2 w-full"
      />
      <button
        onClick={handleAddBook}
        className="bg-green-700 text-white px-4 py-2 rounded"
      >
        Add Book
      </button>
    </div>
  );
}

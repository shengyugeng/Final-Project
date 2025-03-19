"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState, useEffect } from "react";

interface Book {
  _id: string;
  title: string;
  author: string;
  price: number;
  isbn?: string;
  description?: string;
}

export default function HomePage() {
  const { data: session, status } = useSession();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchBooks = async (search?: string, pageNumber: number = 1) => {
    try {
      setLoading(true);
      const res = await fetch(
        `/api/books?page=${pageNumber}${search ? `&search=${search}` : ""}`
      );
      if (!res.ok) throw new Error("Failed to fetch books");
      const data = await res.json();
      setBooks(data.books);
      setTotalPages(data.totalPages);
    } catch (err) {
      setError("Error loading books. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks(searchTerm, page);
  }, [searchTerm, page]);

  const handleSearch = () => {
    setPage(1);
    fetchBooks(searchTerm, 1);
  };

  return (
    <div className="p-8 min-h-screen bg-gray-50 font-sans">
      <header className="shadow-sm py-3 px-8 bg-white flex items-center justify-between">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search books"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-[500px] py-2 px-4 rounded-l-lg border border-green-600 focus:outline-none"
          />
          <button
            onClick={handleSearch}
            className="bg-green-700 p-2 rounded-r-lg text-white hover:bg-green-600"
          >
            Search
          </button>
        </div>
      </header>

      <section className="p-8">
        <h2 className="text-lg font-semibold mb-4">Manage Books</h2>
        <div className="flex gap-4">
          <Link href="/add">
            <button className="bg-green-700 text-white px-4 py-2 rounded">
              Add Book
            </button>
          </Link>
          <Link href="/update">
            <button className="bg-yellow-500 text-white px-4 py-2 rounded">
              Update Book
            </button>
          </Link>
          <Link href="/delete">
            <button className="bg-red-600 text-white px-4 py-2 rounded">
              Delete Book
            </button>
          </Link>
        </div>
      </section>

      <section className="p-8">
        {error && <p className="text-red-500">{error}</p>}
        {loading ? (
          <div className="animate-pulse">
            <div className="h-6 bg-gray-300 rounded mb-4 w-1/2"></div>
            <div className="h-6 bg-gray-300 rounded mb-4 w-1/3"></div>
            <div className="h-6 bg-gray-300 rounded mb-4 w-3/4"></div>
          </div>
        ) : (
          <>
            <ul>
              {books.map((book) => (
                <li key={book._id} className="mb-2 border-b pb-2">
                  {book.title} by {book.author} (${book.price})
                </li>
              ))}
            </ul>
            {/* Pagination */}
            <div className="flex gap-4 mt-4">
              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className={`px-4 py-2 rounded ${
                  page === 1 ? "bg-gray-300" : "bg-blue-600 text-white"
                }`}
              >
                Previous
              </button>

              {/* Display total pages correctly */}
              <span>
                Page {page} of {totalPages || "?"}
              </span>

              <button
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
                className={`px-4 py-2 rounded ${
                  page === totalPages ? "bg-gray-300" : "bg-blue-600 text-white"
                }`}
              >
                Next
              </button>
            </div>
          </>
        )}
      </section>
    </div>
  );
}

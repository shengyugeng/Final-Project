"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Header() {
  const { data: session, status } = useSession();

  return (
    <header className="shadow-sm py-3 px-8 bg-white flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span className="text-2xl font-bold text-green-700">Books</span>
      </div>
      <div className="flex gap-4">
        <Link href="/">
          <button className="hover:text-green-700">Home</button>
        </Link>
        <Link href="/add">
          <button className="hover:text-green-700">Add</button>
        </Link>
        <Link href="/update">
          <button className="hover:text-green-700">Update</button>
        </Link>
        <Link href="/delete">
          <button className="hover:text-green-700">Delete</button>
        </Link>
      </div>
      <div className="flex gap-4 items-center">
        {status === "authenticated" ? (
          <>
            <span className="text-sm">{session.user?.email}</span>
            <button onClick={() => signOut()} className="hover:text-green-700">
              Log Out
            </button>
          </>
        ) : (
          <Link href="/api/auth/signin">
            <button className="hover:text-green-700">Log In</button>
          </Link>
        )}
      </div>
    </header>
  );
}

"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      alert(res.error); // Clearly defined error message
    } else {
      window.location.href = "/";
    }
  };

  return (
    <div className="p-8">
      <form
        onSubmit={handleLogin}
        className="max-w-md mx-auto p-4 bg-white shadow rounded-lg"
      >
        <h1 className="text-xl mb-4">Login</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="block w-full mb-2 p-2 border"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="block w-full mb-2 p-2 border"
          required
        />
        <button className="bg-green-700 text-white py-2 px-4 rounded">
          Login
        </button>
      </form>
    </div>
  );
}

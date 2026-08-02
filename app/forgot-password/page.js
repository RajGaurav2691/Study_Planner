"use client";

import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setError("");

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setMessage(
        "If an account exists with this email, a password reset link has been sent."
      );

      setEmail("");
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  }

  return (
    <div
      style={{
        width: "400px",
        margin: "80px auto",
        padding: "30px",
        border: "1px solid #ddd",
        borderRadius: "8px",
      }}
    >
      <h2>Forgot Password</h2>

      <p>Enter your email address to receive a password reset link.</p>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "20px",
          }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            marginTop: "20px",
            width: "100%",
            padding: "10px",
            cursor: "pointer",
          }}
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
      </form>

      {message && (
        <p
          style={{
            color: "green",
            marginTop: "20px",
          }}
        >
          {message}
        </p>
      )}

      {error && (
        <p
          style={{
            color: "red",
            marginTop: "20px",
          }}
        >
          {error}
        </p>
      )}
    </div>
  );
}
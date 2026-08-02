"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [remember, setRemember] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e) {
    e.preventDefault();

    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Invalid email or password.");
      return;
    }

    if (remember) {
      localStorage.setItem("rememberEmail", email);
    } else {
      localStorage.removeItem("rememberEmail");
    }

    router.push("/dashboard");
  }

  async function handleGoogleLogin() {
    await signIn("google", {
      callbackUrl: "/dashboard",
    });
  }

  return (
    <div
      style={{
        width: "420px",
        margin: "80px auto",
        padding: "35px",
        border: "1px solid #ddd",
        borderRadius: "10px",
        boxShadow: "0 5px 20px rgba(0,0,0,0.08)",
        background: "white",
      }}
    >
      <h2
        style={{
          marginBottom: "8px",
          fontSize: "30px",
        }}
      >
        Welcome Back
      </h2>

      <p
        style={{
          color: "#666",
          marginBottom: "30px",
        }}
      >
        Login to your Smart Study account
      </p>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
            border: "1px solid #ddd",
            borderRadius: "6px",
            outline: "none",
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "12px",
            border: "1px solid #ddd",
            borderRadius: "6px",
            outline: "none",
          }}
        />

        {/* Remember Me + Forgot Password */}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "15px",
            marginBottom: "25px",
          }}
        >
          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              cursor: "pointer",
              fontSize: "15px",
            }}
          >
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />

            Remember me
          </label>

          <Link
            href="/forgot-password"
            style={{
              textDecoration: "none",
              color: "#7C3AED",
              fontWeight: "600",
            }}
          >
            Forgot Password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "13px",
            background: "#7C3AED",
            color: "white",
            border: "none",
            borderRadius: "6px",
            fontWeight: "600",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          {loading ? "Logging in..." : "Sign In"}
        </button>
      </form>

      <div
        style={{
          textAlign: "center",
          margin: "25px 0",
          color: "#888",
        }}
      >
        OR
      </div>

      <button
        onClick={handleGoogleLogin}
        style={{
          width: "100%",
          padding: "13px",
          background: "white",
          border: "1px solid #ddd",
          borderRadius: "6px",
          cursor: "pointer",
          fontWeight: "600",
          fontSize: "15px",
        }}
      >
        Continue with Google
      </button>

      {error && (
        <p
          style={{
            color: "red",
            marginTop: "20px",
            textAlign: "center",
            fontWeight: "500",
          }}
        >
          {error}
        </p>
      )}

      <p
        style={{
          textAlign: "center",
          marginTop: "30px",
        }}
      >
        Don't have an account?{" "}
        <Link
          href="/register"
          style={{
            color: "#7C3AED",
            textDecoration: "none",
            fontWeight: "600",
          }}
        >
          Register
        </Link>
      </p>
    </div>
  );
}
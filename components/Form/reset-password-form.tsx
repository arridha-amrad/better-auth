"use client";

import { useRef, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import Link from "next/link";
import { resetPassword } from "@/lib/auth-client";

export default function ResetPasswordForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const ref = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);
    const newPassword = formData.get("password") as string;
    const token = new URLSearchParams(window.location.search).get("token");

    if (!token) {
      alert("token is missing");
      return;
    }
    await resetPassword(
      {
        newPassword,
        token,
      },
      {
        onRequest: () => {
          setLoading(true);
        },
        onResponse: () => {
          setLoading(false);
        },
        onSuccess: () => {
          setMessage("Reset password is successful");
          ref.current?.reset();
        },
        onError: ({ error }) => {
          setError(error.message || "Something went wrong");
        },
      }
    );
  };
  return (
    <fieldset
      className="w-full max-w-md border p-8 rounded-xl"
      disabled={loading}
    >
      <form ref={ref} onSubmit={handleSubmit}>
        <div className="mb-4">
          <h1 className="text-4xl font-bold">Reset Password</h1>
        </div>

        {error && (
          <div className="mb-4">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        {message && (
          <div className="mb-4">
            <p className="text-green-400 text-sm">{message}</p>
          </div>
        )}

        <div className="space-y-4">
          <div className="grid w-full max-w-sm items-center gap-3">
            <Label htmlFor="email">New Password</Label>
            <Input
              type="password"
              id="email"
              name="password"
              placeholder="Email"
            />
          </div>
          <div className="my-4">
            <Button
              variant={loading ? "default" : "default"}
              disabled={loading}
              className="w-full"
            >
              {loading && <Spinner />}
              Reset Password
            </Button>
          </div>
        </div>
        <div className="flex justify-center text-sm">
          <span className="pr-1">Back to </span>
          <Link className="hover:underline" href="/sign-in">
            sign in
          </Link>
        </div>
      </form>
    </fieldset>
  );
}

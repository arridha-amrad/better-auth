"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Spinner } from "../ui/spinner";
import { useState } from "react";
import { signUp } from "@/lib/auth-client";

export default function SignupForm() {
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    await signUp.email(
      {
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        password: formData.get("password") as string,
        username: formData.get("username") as string,
        callbackURL: "/dashboard",
      },
      {
        onRequest: () => {
          setLoading(true);
        },
        onSuccess: () => {
          setMessage("Please verify your email");
        },
        onError: ({ error }) => {
          setError(error.message || "Something went wrong.");
        },
        onResponse: () => {
          setLoading(false);
        },
      },
    );
  }

  return (
    <fieldset
      className="w-full max-w-md border p-8 rounded-xl"
      disabled={loading}
    >
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <h1 className="text-4xl font-bold">Sign Up</h1>
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
            <Label htmlFor="name">Name</Label>
            <Input type="text" id="name" name="name" placeholder="Name" />
          </div>
          <div className="grid w-full max-w-sm items-center gap-3">
            <Label htmlFor="username">Name</Label>
            <Input type="text" id="username" name="username" placeholder="Username" />
          </div>
          <div className="grid w-full max-w-sm items-center gap-3">
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" name="email" placeholder="Email" />
          </div>
          <div className="grid w-full max-w-sm items-center gap-3">
            <Label htmlFor="email">Password</Label>
            <Input
              type="password"
              id="password"
              name="password"
              placeholder="*******"
            />
          </div>
          <div className="my-4">
            <Button
              variant={loading ? "outline" : "default"}
              disabled={loading}
              className="w-full"
            >
              {loading && <Spinner />}
              Signup
            </Button>
          </div>
        </div>

        <div className="flex justify-center text-sm">
          <span className="pr-1">Already have an account?</span>
          <Link className="hover:underline" href="/sign-in">
            Sign in
          </Link>
        </div>
      </form>
    </fieldset>
  );
}

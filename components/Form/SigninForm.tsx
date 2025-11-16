"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Spinner } from "../ui/spinner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "@/lib/auth-client";

export default function SigninForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);

    await signIn.email(
      {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
      },
      {
        onRequest: () => {
          setLoading(true);
        },
        onSuccess: () => {
          router.push("/dashboard");
        },
        onError: ({ error }) => {
          setLoading(false);
          setError(error.message || "Something went wrong.");
        },
      }
    );
  }
  return (
    <fieldset
      className="w-full max-w-md border p-8 rounded-xl"
      disabled={loading}
    >
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <h1 className="text-4xl font-bold">Login</h1>
        </div>

        {error && (
          <div className="mb-4">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        <div className="space-y-4">
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
              variant={loading ? "default" : "default"}
              disabled={loading}
              className="w-full"
            >
              {loading && <Spinner />}
              Login
            </Button>
          </div>
        </div>
        <div className="flex justify-center text-sm">
          <span className="pr-1">Don't have an account?</span>
          <Link className="hover:underline" href="/sign-up">
            Sign up
          </Link>
        </div>
      </form>
    </fieldset>
  );
}

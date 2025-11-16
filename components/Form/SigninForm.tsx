"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Spinner } from "../ui/spinner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { sendVerificationEmail, signIn } from "@/lib/auth-client";

export default function SigninForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showVerify, setShowVerify] = useState(false);
  const [isSendVerification, setIsSendVerification] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    await signIn.email(
      {
        email,
        password,
      },
      {
        onRequest: () => {
          setLoading(true);
        },
        onSuccess: () => {
          router.push("/dashboard");
        },
        onError: ({ error }) => {
          localStorage.setItem("email", email);
          setLoading(false);
          // Handle error of unverified email
          if (error.status === 403) {
            setShowVerify(true);
            return;
          }
          //you can also show the original error message
          setError(error.message || "Something went wrong.");
        },
      }
    );
  }

  const resendVerification = async () => {
    await sendVerificationEmail(
      {
        email: localStorage.getItem("email") as string,
        callbackURL: "/dashboard",
      },
      {
        onRequest: () => {
          setIsSendVerification(true);
        },
        onError: ({ error }) => {
          setShowVerify(false);
          setError(error.message);
        },
        onSuccess: () => {
          setShowVerify(false);
          setMessage("Please check your email inbox");
        },
        onResponse: () => {
          setIsSendVerification(false);
        },
      }
    );
  };

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

        {message && (
          <div className="mb-4">
            <p className="text-green-400 text-sm">{message}</p>
          </div>
        )}

        {showVerify && (
          <div className="mb-4 flex justify-between">
            <p className="text-red-400 text-sm">Verification required</p>
            <Button
              disabled={isSendVerification}
              type="button"
              onClick={resendVerification}
              size="sm"
              variant="secondary"
            >
              {isSendVerification && <Spinner />}
              Resend Verification
            </Button>
          </div>
        )}

        <div className="space-y-4">
          <div className="grid w-full max-w-sm items-center gap-3">
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" name="email" placeholder="Email" />
          </div>
          <div className="grid w-full max-w-sm items-center gap-3">
            <div className="flex justify-between">
              <Label htmlFor="email">Password</Label>
              <Link className="text-sm font-medium" href={"/forgot-password"}>
                forgot password
              </Link>
            </div>
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

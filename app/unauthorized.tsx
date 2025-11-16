import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <main className="flex flex-col h-screen justify-center items-center">
      <div>
        <h1>You are not authorized to view this page</h1>
      </div>
      <div className="my-8">
        <Link
          className="bg-foreground text-background py-2 px-4 rounded-xl"
          href="/sign-in"
        >
          Login
        </Link>
      </div>
    </main>
  );
}

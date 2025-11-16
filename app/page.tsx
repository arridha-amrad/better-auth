import Link from "next/link";

const className = {
  link: "w-sm bg-foreground text-background rounded-lg p-2 text-center",
};

export default function RootPage() {
  return (
    <main className="flex flex-col gap-y-4 h-screen justify-center items-center">
      <Link className={className.link} href="/sign-in">
        Sign In
      </Link>
      <Link className={className.link} href="/sign-up">
        Sign up
      </Link>
      <Link className={className.link} href="/dashboard">
        Dashboard
      </Link>
    </main>
  );
}

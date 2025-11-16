import { signIn } from "@/lib/auth-client";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";

export default function ButtonOAuthGoogle() {
  const pathname = usePathname();
  const signinWithGoogle = async () => {
    await signIn.social({
      provider: "google",
      callbackURL: "/dashboard",
      errorCallbackURL: pathname,
    });
  };
  return (
    <Button
      className="w-full"
      variant={"ghost"}
      type="button"
      onClick={signinWithGoogle}
    >
      Continue With Google
    </Button>
  );
}

"use client";

import { signOut } from "@/lib/auth-client";
import { DropdownMenuItem } from "./ui/dropdown-menu";
import { useRouter } from "next/navigation";

export default function ButtonLogout() {
  const router = useRouter();
  const logout = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.replace("/sign-in");
        },
      },
    });
  };
  return <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>;
}

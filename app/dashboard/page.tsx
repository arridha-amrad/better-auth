import ButtonLogout from "@/components/buttons/ButtonLogout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getServerSession } from "@/lib/auth";
import { unauthorized } from "next/navigation";

export default async function DashboardPage() {
  const session = await getServerSession();
  if (!session) {
    return unauthorized();
  }

  return (
    <main className="container mx-auto">
      <div className="flex items-center min-h-screen justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>
              <Avatar className="size-15">
                <AvatarImage
                  src={session.user.image ?? undefined}
                  alt="Avatar"
                />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </CardTitle>
            <CardAction>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant={"outline"}>Options</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <ButtonLogout />
                </DropdownMenuContent>
              </DropdownMenu>
            </CardAction>
          </CardHeader>
          <CardContent>
            <p>Name : {session.user.name}</p>
            <p>Username : {session.user.username}</p>
            <p>Email : {session.user.email}</p>
            <p>Role : {session.user.role}</p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

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
            <div className="flex">
              <div className="w-15">Name</div>
              <p>
                : <span className="pl-4">{session.user.name}</span>
              </p>
            </div>
            <div className="flex">
              <div className="w-15">Email</div>
              <p>
                : <span className="pl-4">{session.user.email}</span>
              </p>
            </div>
            <div className="flex">
              <div className="w-15">Role</div>
              <p>
                : <span className="pl-4">{session.user.role}</span>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

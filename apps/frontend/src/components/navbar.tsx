
import { Button } from "@/components/ui/button";
import { useSession } from "@/lib/auth-client"; // import the auth client
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { Menu, Transition } from "@/components/ui/menubar";
import { CreditCard, Link } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { ProfileDropdown } from "./profile.dropdown";
import { useEffect } from "react";

export function Navbar() {
  const {
    data: session,
  } = useSession();
  const navigate = useNavigate();

  useEffect(() => {

  }, [session]);

  return (
    <>
      <nav className="flex items-center justify-between p-3 bg-background">
        <NavLink to={"/"} className="flex items-center ml-4 justify-center gap-4">
        <div className="flex items-center ml-4 justify-center gap-4">
          <Link href="/" className="text-xl font-bold text-white">
            Clipthink
          </Link>
          <div className="text-lg font-semibold text-white">ClipThink</div>
        </div>
        </NavLink>

        {!session && (
          <div className="flex items-center gap-4">
            <Button
              className="text-md font-normal dark:bg-transparent hover:bg-transparent shadow-none"
              onClick={() => navigate("/auth")}
            >
              Login
            </Button>
            <Button
              className="text-md font-normal"
              onClick={() => navigate("/auth")}
            >
              Sign Up
            </Button>
          </div>
        )}

        {session && (
          <div className="flex items-center gap-6 mr-3 ">
            {/* display remaining credits */}
            {/* //make more better ui for credits */}
            <div className="text-md border border-secondary p-2 px-4 rounded-xl text-muted-foreground flex items-center gap-2">
              <CreditCard className="w-4 h-4" />
              Credits : {session.user.credits}
            </div>
            {/* Profile Dropdown */}
            <ProfileDropdown user={session.user}/>
          </div>
        )}
      </nav>
    </>
  );
}

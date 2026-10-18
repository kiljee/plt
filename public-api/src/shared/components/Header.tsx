import { Plus } from "lucide-react";
import { useLocation } from "react-router-dom";
import { logout, useAuth } from "wasp/client/auth";
import { getMe, useQuery } from "wasp/client/operations";
import { Link } from "wasp/client/router";
import { Button } from "../../components/ui/button";
import { AdminNavLinks } from "./AdminNavLinks";
import { useAddEventModal } from "../context/AddEventModalContext";

type AdminNavActive = "workshops" | "calendar" | "reservations" | "report";

const getActiveFromPathname = (pathname: string): AdminNavActive => {
  if (pathname.startsWith("/kalendar")) return "calendar";
  if (pathname.startsWith("/rezervacije")) return "reservations";
  if (pathname.startsWith("/izvestaj")) return "report";
  return "workshops";
};

export function Header() {
  const { data: user } = useAuth();
  const { data: me } = useQuery(getMe);
  const { open: openAddEventModal } = useAddEventModal();
  const { pathname } = useLocation();
  const isAdmin = me?.isAdmin ?? false;
  const showAdmin = Boolean(user && isAdmin);
  const active = getActiveFromPathname(pathname);

  return (
    <header className="sticky top-0 z-10 border-b border-zinc-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-3">
          <Link
            to="/"
            className="flex shrink-0 items-center gap-2 rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2"
          >
            <img
              src="/Paleto logo 2.png"
              alt="Paleto"
              className="h-9 w-auto"
              style={{ imageRendering: "-webkit-optimize-contrast" }}
            />
          </Link>

          {showAdmin ? (
            <div className="hidden min-w-0 flex-1 justify-center lg:flex">
              <AdminNavLinks active={active} orientation="horizontal" />
            </div>
          ) : null}

          <nav className="flex shrink-0 items-center gap-2 sm:gap-3">
            {showAdmin ? (
              <Button
                type="button"
                size="sm"
                onClick={openAddEventModal}
                className="shrink-0"
              >
                <Plus aria-hidden />
                <span className="hidden sm:inline">Dodaj radionicu</span>
                <span className="sm:hidden">Dodaj</span>
              </Button>
            ) : null}
            {user ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={logout}
                className="shrink-0"
              >
                Odjava
              </Button>
            ) : (
              <>
                <Button asChild className="shrink-0">
                  <Link to="/signup">Registracija</Link>
                </Button>
                <Button asChild variant="ghost" className="shrink-0">
                  <Link to="/login">Prijava</Link>
                </Button>
              </>
            )}
          </nav>
        </div>

        {showAdmin ? (
          <div className="-mx-1 overflow-x-auto px-1 pb-2 lg:hidden">
            <AdminNavLinks active={active} orientation="horizontal" />
          </div>
        ) : null}
      </div>
    </header>
  );
}

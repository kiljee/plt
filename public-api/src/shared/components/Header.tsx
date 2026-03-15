import { logout, useAuth } from "wasp/client/auth";
import { getMe, useQuery } from "wasp/client/operations";
import { Link } from "wasp/client/router";
import { Button } from "../../components/ui/button";
import { useAddEventModal } from "../context/AddEventModalContext";

export function Header() {
  const { data: user } = useAuth();
  const { data: me } = useQuery(getMe);
  const { open: openAddEventModal } = useAddEventModal();
  const isAdmin = me?.isAdmin ?? false;

  return (
    <header className="sticky top-0 z-10 border-b border-zinc-200 bg-white shadow-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="flex items-center gap-2 rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2"
        >
          <img
            src="/Paleto logo 2.png"
            alt="Paleto"
            className="h-9 w-auto"
            style={{ imageRendering: "-webkit-optimize-contrast" }}
          />
        </Link>
        <nav className="flex items-center gap-3 sm:gap-6">
          {user && isAdmin && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={openAddEventModal}
              className="shrink-0"
            >
              Dodaj radionicu
            </Button>
          )}
          {user ? (
            <Button onClick={logout} className="shrink-0">
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
    </header>
  );
}

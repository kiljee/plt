import { logout, useAuth } from "wasp/client/auth";
import { Link } from "wasp/client/router";
import Logo from "../../assets/logo.svg";
import { Button } from "../../components/ui/button";

export function Header() {
  const { data: user } = useAuth();

  return (
    <header className="sticky top-0 z-10 border-b border-zinc-200 bg-white shadow-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="flex items-center gap-2 rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2"
        >
          <img src={Logo} alt="Paleto Admin" className="h-9 w-9" />
          <span className="text-xl font-semibold text-zinc-900">Dashboard</span>
        </Link>
        <nav className="flex items-center gap-3 sm:gap-6">
          {user && (
            <Link
              to="/events"
              className="text-sm font-medium text-zinc-600 hover:text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 rounded-md px-2 py-1"
            >
              Dodaj radionicu
            </Link>
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

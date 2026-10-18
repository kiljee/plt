import { Link } from "wasp/client/router";
import { Button } from "../../components/ui/button";

interface AdminNavLinksProps {
  active?: "workshops" | "calendar" | "reservations" | "report";
  onAddEvent?: () => void;
}

const linkClass = (isActive: boolean) =>
  isActive
    ? "rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground"
    : "rounded-md px-3 py-2 text-sm font-medium hover:bg-muted";

export const AdminNavLinks = ({
  active = "workshops",
  onAddEvent,
}: AdminNavLinksProps) => (
  <nav className="flex flex-col gap-2">
    <Link to="/" className={linkClass(active === "workshops")}>
      Radionice
    </Link>
    <Link to="/kalendar" className={linkClass(active === "calendar")}>
      Kalendar
    </Link>
    {onAddEvent ? (
      <Button
        type="button"
        variant="outline"
        className="justify-start"
        onClick={onAddEvent}
      >
        Dodaj radionicu
      </Button>
    ) : null}
    <Link to="/rezervacije" className={linkClass(active === "reservations")}>
      Rezervacije
    </Link>
    <Link to="/izvestaj" className={linkClass(active === "report")}>
      Izveštaj
    </Link>
  </nav>
);

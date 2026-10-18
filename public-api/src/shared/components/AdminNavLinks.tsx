import { Link } from "wasp/client/router";
import { Button } from "../../components/ui/button";

interface AdminNavLinksProps {
  active?: "workshops" | "calendar" | "reservations" | "report";
  onAddEvent?: () => void;
  orientation?: "vertical" | "horizontal";
}

const linkClass = (isActive: boolean) =>
  isActive
    ? "rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground"
    : "rounded-md px-3 py-2 text-sm font-medium hover:bg-muted";

const horizontalLinkClass = (isActive: boolean) =>
  isActive
    ? "rounded-md bg-primary px-2.5 py-1 text-[13px] font-medium text-primary-foreground"
    : "rounded-md px-2.5 py-1 text-[13px] font-medium text-muted-foreground hover:bg-muted hover:text-foreground";

export const AdminNavLinks = ({
  active = "workshops",
  onAddEvent,
  orientation = "vertical",
}: AdminNavLinksProps) => {
  if (orientation === "horizontal") {
    return (
      <nav className="flex flex-wrap items-center gap-1" aria-label="Admin">
        <Link to="/" className={horizontalLinkClass(active === "workshops")}>
          Radionice
        </Link>
        <Link
          to="/kalendar"
          className={horizontalLinkClass(active === "calendar")}
        >
          Kalendar
        </Link>
        <Link
          to="/rezervacije"
          className={horizontalLinkClass(active === "reservations")}
        >
          Rezervacije
        </Link>
        <Link
          to="/izvestaj"
          className={horizontalLinkClass(active === "report")}
        >
          Izveštaj
        </Link>
        {onAddEvent ? (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-7 px-2.5 text-[13px] text-muted-foreground"
            onClick={onAddEvent}
          >
            + Nova radionica
          </Button>
        ) : null}
      </nav>
    );
  }

  return (
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
};

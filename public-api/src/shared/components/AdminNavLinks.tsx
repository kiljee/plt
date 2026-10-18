import { Plus } from "lucide-react";
import { Link } from "wasp/client/router";
import { Button } from "../../components/ui/button";

type AdminNavActive = "workshops" | "calendar" | "reservations" | "report";

interface AdminNavLinksProps {
  active?: AdminNavActive;
  onAddEvent?: () => void;
  orientation?: "vertical" | "horizontal";
}

const LINK_CLASS = (isActive: boolean) =>
  isActive
    ? "rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground"
    : "rounded-md px-3 py-2 text-sm font-medium hover:bg-muted";

const HORIZONTAL_LINK_CLASS = (isActive: boolean) =>
  isActive
    ? "rounded-md bg-muted px-2.5 py-1.5 text-[13px] font-medium text-foreground"
    : "rounded-md px-2.5 py-1.5 text-[13px] font-medium text-muted-foreground hover:bg-muted hover:text-foreground";

export const AdminNavLinks = ({
  active = "workshops",
  onAddEvent,
  orientation = "vertical",
}: AdminNavLinksProps) => {
  if (orientation === "horizontal") {
    return (
      <nav className="flex items-center gap-1" aria-label="Admin">
        <Link to="/" className={HORIZONTAL_LINK_CLASS(active === "workshops")}>
          Radionice
        </Link>
        <Link
          to="/kalendar"
          className={HORIZONTAL_LINK_CLASS(active === "calendar")}
        >
          Kalendar
        </Link>
        <Link
          to="/rezervacije"
          className={HORIZONTAL_LINK_CLASS(active === "reservations")}
        >
          Rezervacije
        </Link>
        <Link
          to="/izvestaj"
          className={HORIZONTAL_LINK_CLASS(active === "report")}
        >
          Izveštaj
        </Link>
        {onAddEvent ? (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-8 px-2.5 text-[13px] text-muted-foreground"
            onClick={onAddEvent}
          >
            <Plus aria-hidden />
            Dodaj radionicu
          </Button>
        ) : null}
      </nav>
    );
  }

  return (
    <nav className="flex flex-col gap-2">
      <Link to="/" className={LINK_CLASS(active === "workshops")}>
        Radionice
      </Link>
      <Link to="/kalendar" className={LINK_CLASS(active === "calendar")}>
        Kalendar
      </Link>
      {onAddEvent ? (
        <Button
          type="button"
          variant="outline"
          className="justify-start"
          onClick={onAddEvent}
        >
          <Plus aria-hidden />
          Dodaj radionicu
        </Button>
      ) : null}
      <Link to="/rezervacije" className={LINK_CLASS(active === "reservations")}>
        Rezervacije
      </Link>
      <Link to="/izvestaj" className={LINK_CLASS(active === "report")}>
        Izveštaj
      </Link>
    </nav>
  );
};

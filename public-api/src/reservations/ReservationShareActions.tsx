import { useState } from "react";
import { Check, Copy, Share2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "../components/ui/button";
import {
  buildReservationsListShareText,
  type ReservationShareItem,
} from "../lib/reservationCode";

interface ReservationShareActionsProps {
  reservations: ReservationShareItem[];
  eventTitle?: string | null;
  eventDate?: string | null;
  disabled?: boolean;
}

export const ReservationShareActions = ({
  reservations,
  eventTitle,
  eventDate,
  disabled = false,
}: ReservationShareActionsProps) => {
  const [copied, setCopied] = useState(false);
  const shareText = buildReservationsListShareText({
    eventTitle,
    eventDate,
    reservations,
  });
  const shareTitle = eventTitle
    ? `Rezervacije: ${eventTitle}`
    : "Rezervacije";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      toast.success("Sve rezervacije kopirane");
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Kopiranje nije uspelo");
    }
  };

  const handleShare = async () => {
    if (typeof navigator.share === "function") {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
        });
        return;
      } catch (err: unknown) {
        if (err instanceof Error && err.name === "AbortError") return;
      }
    }
    await handleCopy();
  };

  return (
    <div className="flex items-center gap-1">
      <Button
        type="button"
        size="sm"
        variant="outline"
        onClick={handleCopy}
        disabled={disabled || reservations.length === 0}
        className="gap-1.5"
        aria-label="Kopiraj sve rezervacije"
        title="Kopiraj sve"
      >
        {copied ? (
          <Check className="h-4 w-4 text-green-600" aria-hidden />
        ) : (
          <Copy className="h-4 w-4" aria-hidden />
        )}
        <span>{copied ? "Kopirano" : "Kopiraj sve"}</span>
      </Button>
      <Button
        type="button"
        size="sm"
        variant="outline"
        onClick={handleShare}
        disabled={disabled || reservations.length === 0}
        className="gap-1.5"
        aria-label="Podeli sve rezervacije"
        title="Podeli sve"
      >
        <Share2 className="h-4 w-4" aria-hidden />
        <span>Podeli sve</span>
      </Button>
    </div>
  );
};

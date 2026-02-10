"use client";

import { useState } from "react";
import { formatTotalPrice } from "@/lib/price";

interface ReservationFormProps {
  eventId: string;
  eventTitle: string;
  quantity: number;
  price: number;
  currency: string;
  onSuccess: () => void;
  onCancel: () => void;
}

export const ReservationForm = ({
  eventId,
  eventTitle,
  quantity,
  price,
  currency,
  onSuccess,
  onCancel,
}: ReservationFormProps) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const base =
        typeof window !== "undefined"
          ? window.location.origin
          : (process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000");
      const url = `${base.replace(/\/$/, "")}/api/reservations`;

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventId,
          email: email.trim(),
          name: name.trim() || undefined,
          phone: phone.trim() || undefined,
          seats: quantity,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error((data as { error?: string })?.error ?? res.statusText);
      }

      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Greška pri rezervaciji");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h3 className="text-lg font-semibold">Rezervacija: {eventTitle}</h3>

      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-medium">
          Email *
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full rounded-lg border border-zinc-300 px-3 py-2 focus:border-[#2D9CDB] focus:outline-none focus:ring-1 focus:ring-[#2D9CDB]"
          placeholder="vas@email.com"
        />
      </div>

      <div>
        <label htmlFor="name" className="mb-1 block text-sm font-medium">
          Ime i prezime
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-lg border border-zinc-300 px-3 py-2 focus:border-[#2D9CDB] focus:outline-none focus:ring-1 focus:ring-[#2D9CDB]"
          placeholder="Vaše ime"
        />
      </div>

      <div>
        <label htmlFor="phone" className="mb-1 block text-sm font-medium">
          Broj telefona
        </label>
        <input
          id="phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full rounded-lg border border-zinc-300 px-3 py-2 focus:border-[#2D9CDB] focus:outline-none focus:ring-1 focus:ring-[#2D9CDB]"
          placeholder="+381 6x xxx xxxx"
        />
      </div>

      <div className="space-y-2">
        <p className="text-sm text-zinc-500">
          Rezervišete {quantity} {quantity === 1 ? "mesto" : "mesta"}.
        </p>
        <div className="rounded-lg bg-blue-50 p-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-zinc-700">Ukupna cena:</span>
            <span className="text-lg font-bold text-[#2D9CDB]">
              {formatTotalPrice(price, currency, quantity)}
            </span>
          </div>
        </div>
      </div>

      {error && (
        <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>
      )}

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 rounded-lg border border-zinc-300 bg-white px-4 py-2 font-medium hover:bg-zinc-50"
        >
          Otkaži
        </button>
        <button
          type="submit"
          disabled={loading}
          className="flex-1 rounded-lg bg-[#2D9CDB] px-4 py-2 font-medium text-white hover:bg-[#2480b8] disabled:opacity-60"
        >
          {loading ? "Obrada…" : "Potvrdi rezervaciju"}
        </button>
      </div>
    </form>
  );
};

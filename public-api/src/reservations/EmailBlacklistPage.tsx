import { useState } from "react";
import { Link } from "react-router-dom";
import {
  getEmailBlacklist,
  addEmailToBlacklist,
  removeEmailFromBlacklist,
  useQuery,
  useAction,
} from "wasp/client/operations";
import { toast } from "sonner";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";

export const EmailBlacklistPage = () => {
  const { data: list = [], isLoading, refetch } = useQuery(getEmailBlacklist);
  const addAction = useAction(addEmailToBlacklist);
  const removeAction = useAction(removeEmailFromBlacklist);
  const [email, setEmail] = useState("");
  const [adding, setAdding] = useState(false);
  const [removingId, setRemovingId] = useState<string | null>(null);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    const value = email.trim().toLowerCase();
    if (!value) {
      toast.error("Unesite email.");
      return;
    }
    setAdding(true);
    try {
      await addAction({ email: value });
      toast.success("Email dodat u blacklist.");
      setEmail("");
      refetch();
    } catch (err: unknown) {
      toast.error(String(err));
    } finally {
      setAdding(false);
    }
  };

  const handleRemove = async (id: string) => {
    setRemovingId(id);
    try {
      await removeAction({ id });
      toast.success("Email uklonjen sa blacklist-e.");
      refetch();
    } catch (err: unknown) {
      toast.error(String(err));
    } finally {
      setRemovingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <nav className="mb-2 flex gap-4 text-sm">
              <Link
                to="/rezervacije"
                className="text-muted-foreground hover:text-foreground"
              >
                Rezervacije
              </Link>
              <span className="font-medium text-foreground">Blacklist emailova</span>
            </nav>
            <Link
              to="/rezervacije"
              className="text-sm text-muted-foreground hover:underline"
            >
              ← Nazad na rezervacije
            </Link>
          </div>
          <Button asChild variant="outline">
            <Link to="/rezervacije">Sve rezervacije</Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Blacklist emailova</CardTitle>
            <p className="text-sm text-muted-foreground">
              Adrese na listi pri rezervaciji dobijaju kratak mail „Uskoro će vam stići podaci za uplatu” umesto punog maila sa uplatnicom.
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleAdd} className="flex gap-2">
              <Input
                type="email"
                placeholder="email@ primer.rs"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" disabled={adding}>
                {adding ? "Dodavanje…" : "Dodaj"}
              </Button>
            </form>

            {isLoading ? (
              <p className="text-sm text-muted-foreground">Učitavanje…</p>
            ) : list.length === 0 ? (
              <p className="text-sm text-muted-foreground">Lista je prazna.</p>
            ) : (
              <ul className="divide-y rounded-md border">
                {list.map((item: { id: string; email: string }) => (
                  <li
                    key={item.id}
                    className="flex items-center justify-between px-3 py-2 text-sm"
                  >
                    <span>{item.email}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="text-destructive hover:text-destructive"
                      disabled={removingId === item.id}
                      onClick={() => handleRemove(item.id)}
                    >
                      {removingId === item.id ? "Uklanjanje…" : "Ukloni"}
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

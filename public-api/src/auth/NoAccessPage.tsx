import { logout } from "wasp/client/auth";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

export function NoAccessPage() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md items-center justify-center px-4 py-16">
      <Card>
        <CardHeader>
          <CardTitle>Nemate pristup</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Samo administrator može pristupiti dashboardu i upravljanju
            radionicama. Vaš nalog nema ovlašćenja.
          </p>
          <Button onClick={() => logout()}>Odjava</Button>
        </CardContent>
      </Card>
    </div>
  );
}

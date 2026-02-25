import { Outlet } from "react-router-dom";
import "./App.css";
import { Toaster } from "./components/ui/sonner";
import { AddEventModal } from "./shared/components/AddEventModal";
import { Header } from "./shared/components/Header";
import { AddEventModalProvider } from "./shared/context/AddEventModalContext";

export function App() {
  return (
    <AddEventModalProvider>
      <main className="flex min-h-screen w-full flex-col bg-background text-foreground">
        <Header />
        <Outlet />
        <Toaster />
      </main>
      <AddEventModal />
    </AddEventModalProvider>
  );
}

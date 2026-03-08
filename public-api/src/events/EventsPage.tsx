import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRequireAdmin } from "../hooks/useRequireAdmin";
import { useAddEventModal } from "../shared/context/AddEventModalContext";

export const EventsPage = () => {
  const { isLoading: isAuthLoading, isAdmin } = useRequireAdmin();
  const navigate = useNavigate();
  const { open: openAddEventModal } = useAddEventModal();

  useEffect(() => {
    if (isAuthLoading || !isAdmin) return;
    openAddEventModal();
    navigate("/", { replace: true });
  }, [isAuthLoading, isAdmin, openAddEventModal, navigate]);

  if (isAuthLoading || !isAdmin) return null;
  return null;
};

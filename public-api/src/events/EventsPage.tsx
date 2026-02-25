import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAddEventModal } from "../shared/context/AddEventModalContext";

export const EventsPage = () => {
  const navigate = useNavigate();
  const { open: openAddEventModal } = useAddEventModal();

  useEffect(() => {
    openAddEventModal();
    navigate("/", { replace: true });
  }, [openAddEventModal, navigate]);

  return null;
};

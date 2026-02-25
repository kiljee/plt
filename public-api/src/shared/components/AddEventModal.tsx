import { toast } from "sonner";
import { Dialog, DialogContent } from "../../components/ui/dialog";
import { CreateEventForm } from "../../events/components/CreateEventForm";
import { useAddEventModal } from "../context/AddEventModalContext";

const SUCCESS_MESSAGE = "Radionica je uspešno dodata.";

export function AddEventModal() {
  const { isOpen, close, onSuccessRef } = useAddEventModal();

  const handleSuccess = () => {
    close();
    toast.success(SUCCESS_MESSAGE);
    onSuccessRef.current?.();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && close()}>
      <DialogContent className="flex max-h-[90vh] w-[calc(100%-2rem)] max-w-4xl flex-col overflow-hidden p-0 sm:rounded-lg">
        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain p-6 pr-12 sm:p-8 sm:pr-12">
          <CreateEventForm
            onSuccess={handleSuccess}
            formClassName="flex w-full max-w-2xl flex-col gap-4"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

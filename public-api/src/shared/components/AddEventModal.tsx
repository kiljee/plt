import { useRef } from "react"
import { toast } from "sonner"
import { Dialog, DialogContent } from "../../components/ui/dialog"
import {
  CreateEventForm,
  type CreateEventFormRef,
} from "../../events/components/CreateEventForm"
import { EventDuplicatePanel } from "../../events/components/EventDuplicatePanel"
import { type Event } from "wasp/entities"
import { useAddEventModal } from "../context/AddEventModalContext"

const SUCCESS_MESSAGE = "Radionica je uspešno dodata."

export function AddEventModal() {
  const { isOpen, close, onSuccessRef } = useAddEventModal()
  const formRef = useRef<CreateEventFormRef>(null)

  const handleSuccess = () => {
    close()
    toast.success(SUCCESS_MESSAGE)
    onSuccessRef.current?.()
  }

  const handleDuplicate = (event: Event) => {
    formRef.current?.resetWithEvent(event)
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && close()}>
      <DialogContent className="flex h-dvh max-h-dvh w-full max-w-none flex-col overflow-hidden rounded-none border-0 p-0 sm:h-auto sm:max-h-[90vh] sm:w-[calc(100%-2rem)] sm:max-w-5xl sm:rounded-lg sm:border">
        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain sm:flex-row">
          <div className="flex min-h-0 flex-1 flex-col overflow-y-auto p-3 sm:p-8">
            <CreateEventForm
              ref={formRef}
              onSuccess={handleSuccess}
              formClassName="flex w-full max-w-2xl flex-col gap-3 sm:gap-4"
            />
          </div>
          <EventDuplicatePanel onDuplicate={handleDuplicate} />
        </div>
      </DialogContent>
    </Dialog>
  )
}

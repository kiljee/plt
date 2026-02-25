import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from "react";

type AddEventModalContextValue = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  onSuccessRef: React.MutableRefObject<(() => void) | null>;
};

const AddEventModalContext = createContext<AddEventModalContextValue | null>(
  null,
);

export function AddEventModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  const onSuccessRef = useRef<(() => void) | null>(null);

  const open = useCallback(() => setOpen(true), []);
  const close = useCallback(() => setOpen(false), []);

  const value: AddEventModalContextValue = {
    isOpen,
    open,
    close,
    onSuccessRef,
  };

  return (
    <AddEventModalContext.Provider value={value}>
      {children}
    </AddEventModalContext.Provider>
  );
}

export function useAddEventModal(): AddEventModalContextValue {
  const ctx = useContext(AddEventModalContext);
  if (!ctx) {
    throw new Error("useAddEventModal must be used within AddEventModalProvider");
  }
  return ctx;
}

export { AddEventModalContext };

import { Controller, useFieldArray, type Control } from "react-hook-form"
import { Button } from "../../components/ui/button"
import type { EventFormValues } from "./CreateEventForm"

const MAX_LABEL_LENGTH = 80

interface WorkshopOptionsFieldsProps {
  control: Control<EventFormValues>
}

export const WorkshopOptionsFields = ({ control }: WorkshopOptionsFieldsProps) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "options",
  })

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-2">
        <span className="label">Opcije</span>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() =>
            append({
              id: crypto.randomUUID(),
              label: "",
              price: "",
            })
          }
        >
          Dodaj opciju
        </Button>
      </div>
      <p className="text-sm text-zinc-500">
        Ako nema opcija, važi osnovna cena po mestu. Prva opcija je već izabrana
        za svako mesto.
      </p>
      {fields.map((field, index) => (
        <div
          key={field.id}
          className="grid grid-cols-1 gap-2 sm:grid-cols-[1fr_8rem_auto]"
        >
          <Controller
            name={`options.${index}.id`}
            control={control}
            render={({ field: idField }) => (
              <input type="hidden" {...idField} />
            )}
          />
          <Controller
            name={`options.${index}.label`}
            control={control}
            render={({ field: labelField }) => (
              <input
                {...labelField}
                type="text"
                maxLength={MAX_LABEL_LENGTH}
                placeholder="npr. jedna šolja"
                className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-zinc-800 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
              />
            )}
          />
          <Controller
            name={`options.${index}.price`}
            control={control}
            render={({ field: priceField }) => (
              <input
                {...priceField}
                type="number"
                min="0"
                step="1"
                placeholder="Cena"
                className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-zinc-800 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
              />
            )}
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => remove(index)}
          >
            Ukloni
          </Button>
        </div>
      ))}
    </div>
  )
}

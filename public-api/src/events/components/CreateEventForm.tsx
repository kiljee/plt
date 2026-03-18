import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import { forwardRef, useCallback, useImperativeHandle, useState } from "react"

dayjs.extend(utc)
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner";
import { type Event } from "wasp/entities";
import { createEvent, uploadEventImage, useAction } from "wasp/client/operations";
import { Button } from "../../components/ui/button";
import { Input } from "../../shared/components/Input";
import { uploadImageFile } from "./uploadImageFile";
import { EventStatus } from "../constants";

export const AGE_CATEGORIES = [
  { value: "Adults", label: "Odrasli" },
  { value: "Kids", label: "Deca" },
  { value: "All", label: "Svi" },
];

export const IMAGE_COUNT = 6;
export const CAPACITY_MIN = 1;
export const CAPACITY_MAX = 500;

export interface EventFormValues {
  title: string;
  description: string;
  location: "BELGRADE" | "NOVI_SAD";
  date: string;
  startTime: string;
  endTime: string;
  ageCategory: string;
  capacity: string;
  imageUrls: string[];
  price: string;
  currency: string;
  status: EventStatus;
}

export interface EventFormSubmitPayload {
  title: string;
  description: string;
  location: "BELGRADE" | "NOVI_SAD";
  date: string;
  startTime: string;
  endTime: string;
  ageCategory: string;
  capacity: number;
  imageUrls: string[];
  price: number;
  currency: string;
  status?: EventStatus;
}

const DEFAULT_DATE = dayjs().format("YYYY-MM-DD");
const DEFAULT_START_TIME = "10:00";
const DEFAULT_END_TIME = "12:00";
const DEFAULT_AGE_CATEGORY = "Adults";
const DEFAULT_CAPACITY = "10";
const DEFAULT_PRICE = "0";
const DEFAULT_CURRENCY = "RSD";

const getFilledImageUrls = (imageUrls: string[] = []) =>
  Array.from({ length: IMAGE_COUNT }, (_, i) => imageUrls[i] ?? "");

const parseImageUrls = (raw: Event["imageUrls"]): string[] => {
  if (!raw) return [];
  if (Array.isArray(raw)) return raw;
  if (typeof raw !== "string") return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const getEventFormDefaults = (
  overrides: Partial<EventFormValues> = {},
): EventFormValues => {
  const baseValues: EventFormValues = {
    title: "",
    description: "",
    location: "BELGRADE",
    date: DEFAULT_DATE,
    startTime: DEFAULT_START_TIME,
    endTime: DEFAULT_END_TIME,
    ageCategory: DEFAULT_AGE_CATEGORY,
    capacity: DEFAULT_CAPACITY,
    imageUrls: getFilledImageUrls(),
    price: DEFAULT_PRICE,
    currency: DEFAULT_CURRENCY,
    status: EventStatus.ACTIVE,
  };
  const imageUrls = getFilledImageUrls(
    overrides.imageUrls ?? baseValues.imageUrls,
  );
  return { ...baseValues, ...overrides, imageUrls };
};

export const mapEventToFormValues = (event: Event): EventFormValues => ({
  title: event.title ?? "",
  description: event.description ?? "",
  location:
    event.location === "NOVI_SAD" || event.location === "BELGRADE"
      ? event.location
      : "BELGRADE",
  date: dayjs.utc(event.date).format("YYYY-MM-DD"),
  startTime: event.startTime || DEFAULT_START_TIME,
  endTime: event.endTime || DEFAULT_END_TIME,
  ageCategory: event.ageCategory || DEFAULT_AGE_CATEGORY,
  capacity: String(event.capacity ?? DEFAULT_CAPACITY),
  imageUrls: getFilledImageUrls(parseImageUrls(event.imageUrls)),
  price: String(event.price ?? DEFAULT_PRICE),
  currency: event.currency || DEFAULT_CURRENCY,
  status: event.status === EventStatus.INACTIVE ? EventStatus.INACTIVE : EventStatus.ACTIVE,
})

export const mapEventToFormValuesForDuplicate = (event: Event): EventFormValues =>
  mapEventToFormValues({ ...event, date: dayjs().toDate() })

export interface CreateEventFormRef {
  resetWithEvent: (event: Event) => void
}

interface CreateEventFormProps {
  onSuccess?: () => void
  initialValues?: Partial<EventFormValues>
  onSubmit?: (payload: EventFormSubmitPayload) => Promise<void>
  submitLabel?: string
  title?: string
  resetOnSuccess?: boolean
  formClassName?: string
}

export const CreateEventForm = forwardRef<CreateEventFormRef, CreateEventFormProps>(
  (
    {
      onSuccess,
      initialValues,
      onSubmit,
      submitLabel,
      title,
      resetOnSuccess = true,
      formClassName,
    },
    ref,
  ) => {
  const defaultValues = getEventFormDefaults(initialValues)
  const { handleSubmit, control, reset, setError, setValue, formState } =
    useForm<EventFormValues>({
      defaultValues,
      mode: "onTouched",
    })
  const uploadAction = useAction(uploadEventImage)

  useImperativeHandle(ref, () => ({
    resetWithEvent: (event: Event) => {
      reset(mapEventToFormValuesForDuplicate(event))
    },
  }))
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);

  const handleFileSelect = useCallback(
    async (index: number, file: File | null) => {
      if (!file) return;
      setUploadingIndex(index);
      try {
        const url = await uploadImageFile(file, uploadAction);
        setValue(`imageUrls.${index}`, url);
      } catch (err) {
        toast.error(`Greška pri otpremanju: ${String(err)}`);
      } finally {
        setUploadingIndex(null);
      }
    },
    [uploadAction, setValue],
  );

  const handleRemoveImage = useCallback(
    (index: number) => {
      setValue(`imageUrls.${index}`, "");
    },
    [setValue],
  );

  const onSubmitHandler = async (data: EventFormValues) => {
    const capacityNum = parseInt(data.capacity, 10);
    if (capacityNum < CAPACITY_MIN || capacityNum > CAPACITY_MAX) {
      setError("capacity", {
        message: `Broj mesta mora biti između ${CAPACITY_MIN} i ${CAPACITY_MAX}.`,
      });
      return;
    }

    const priceNum = parseInt(data.price, 10);
    if (priceNum < 0) {
      setError("price", {
        message: "Cena ne može biti negativna.",
      });
      return;
    }

    const start = dayjs(`2000-01-01 ${data.startTime}`);
    const end = dayjs(`2000-01-01 ${data.endTime}`);
    if (end.isBefore(start) || end.isSame(start)) {
      setError("endTime", { message: "Vreme završetka mora biti posle početka." });
      return;
    }

    const submitAction = onSubmit ?? createEvent;
    const payload: EventFormSubmitPayload = {
      title: data.title.trim(),
      description: (data.description ?? "").trim(),
      location: data.location,
      date: dayjs.utc(data.date).toISOString(),
      startTime: data.startTime,
      endTime: data.endTime,
      ageCategory: data.ageCategory,
      capacity: capacityNum,
      imageUrls: data.imageUrls.filter((u) => u?.trim()).filter(Boolean),
      price: priceNum,
      currency: data.currency,
      status: data.status,
    };

    try {
      await submitAction(payload);
      if (resetOnSuccess) {
        reset(getEventFormDefaults(initialValues));
      }
      onSuccess?.();
    } catch (err: unknown) {
      toast.error(`Greška: ${String(err)}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitHandler)}
      className={formClassName ?? "flex w-full max-w-xl flex-col gap-4"}
    >
      <h2 className="text-xl font-semibold text-zinc-900">
        {title ?? "Nova radionica"}
      </h2>

      <Controller
        name="title"
        control={control}
        rules={{
          required: { value: true, message: "Naslov je obavezan." },
          minLength: {
            value: 2,
            message: "Naslov mora imati najmanje 2 karaktera.",
          },
          maxLength: {
            value: 200,
            message: "Naslov može imati najviše 200 karaktera.",
          },
        }}
        render={({ field, fieldState }) => (
          <Input
            label="Naslov"
            placeholder="Naslov radionice"
            fieldState={fieldState}
            {...field}
          />
        )}
      />

      <Controller
        name="description"
        control={control}
        rules={{
          maxLength: {
            value: 2000,
            message: "Opis može imati najviše 2000 karaktera.",
          },
        }}
        render={({ field, fieldState }) => (
          <div className="flex flex-col gap-1">
            <label htmlFor="description" className="label">
              Opis
            </label>
            <textarea
              id="description"
              placeholder="Opis radionice"
              rows={4}
              className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-zinc-800 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
              {...field}
            />
            {fieldState.error && (
              <span className="text-sm text-red-500">
                {fieldState.error.message}
              </span>
            )}
          </div>
        )}
      />

      <Controller
        name="location"
        control={control}
        rules={{ required: { value: true, message: "Lokacija je obavezna." } }}
        render={({ field, fieldState }) => (
          <div className="flex flex-col gap-1">
            <label htmlFor="location" className="label">
              Lokacija
            </label>
            <select
              id="location"
              className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-zinc-800 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
              {...field}
            >
              <option value="BELGRADE">Beograd</option>
              <option value="NOVI_SAD">Novi Sad</option>
            </select>
            {fieldState.error && (
              <span className="text-sm text-red-500">
                {fieldState.error.message}
              </span>
            )}
          </div>
        )}
      />

      <Controller
        name="status"
        control={control}
        rules={{ required: { value: true, message: "Status je obavezan." } }}
        render={({ field, fieldState }) => (
          <div className="flex flex-col gap-1">
            <label htmlFor="status" className="label">
              Status
            </label>
            <select
              id="status"
              className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-zinc-800 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
              {...field}
            >
              <option value={EventStatus.ACTIVE}>Aktivna</option>
              <option value={EventStatus.INACTIVE}>Neaktivna</option>
            </select>
            {fieldState.error && (
              <span className="text-sm text-red-500">
                {fieldState.error.message}
              </span>
            )}
          </div>
        )}
      />

      <Controller
        name="date"
        control={control}
        rules={{
          required: { value: true, message: "Datum je obavezan." },
          validate: (v) => {
            const d = dayjs(v);
            if (!d.isValid()) return "Unesite ispravan datum.";
            return true;
          },
        }}
        render={({ field, fieldState }) => (
          <div className="flex flex-col gap-1">
            <label htmlFor="date" className="label">
              Datum
            </label>
            <input
              id="date"
              type="date"
              className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-zinc-800 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
              {...field}
            />
            {fieldState.error && (
              <span className="text-sm text-red-500">
                {fieldState.error.message}
              </span>
            )}
          </div>
        )}
      />

      <div className="grid grid-cols-2 gap-4">
        <Controller
          name="startTime"
          control={control}
          rules={{ required: { value: true, message: "Vreme početka je obavezno." } }}
          render={({ field, fieldState }) => (
            <div className="flex flex-col gap-1">
              <label htmlFor="startTime" className="label">
                Od (sati)
              </label>
              <input
                id="startTime"
                type="time"
                className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-zinc-800 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                {...field}
              />
              {fieldState.error && (
                <span className="text-sm text-red-500">
                  {fieldState.error.message}
                </span>
              )}
            </div>
          )}
        />
        <Controller
          name="endTime"
          control={control}
          rules={{ required: { value: true, message: "Vreme završetka je obavezno." } }}
          render={({ field, fieldState }) => (
            <div className="flex flex-col gap-1">
              <label htmlFor="endTime" className="label">
                Do (sati)
              </label>
              <input
                id="endTime"
                type="time"
                className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-zinc-800 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                {...field}
              />
              {fieldState.error && (
                <span className="text-sm text-red-500">
                  {fieldState.error.message}
                </span>
              )}
            </div>
          )}
        />
      </div>

      <Controller
        name="ageCategory"
        control={control}
        rules={{ required: { value: true, message: "Kategorija doba je obavezna." } }}
        render={({ field, fieldState }) => (
          <div className="flex flex-col gap-1">
            <label htmlFor="ageCategory" className="label">
              Kategorija doba
            </label>
            <select
              id="ageCategory"
              className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-zinc-800 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
              {...field}
            >
              {AGE_CATEGORIES.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
            {fieldState.error && (
              <span className="text-sm text-red-500">
                {fieldState.error.message}
              </span>
            )}
          </div>
        )}
      />

      <Controller
        name="capacity"
        control={control}
        rules={{
          required: { value: true, message: "Broj mesta je obavezan." },
          min: {
            value: CAPACITY_MIN,
            message: `Minimum je ${CAPACITY_MIN} mesto.`,
          },
          max: {
            value: CAPACITY_MAX,
            message: `Maksimum je ${CAPACITY_MAX} mesta.`,
          },
        }}
        render={({ field, fieldState }) => (
          <div className="flex flex-col gap-1">
            <label htmlFor="capacity" className="label">
              Broj mesta
            </label>
            <input
              id="capacity"
              type="number"
              min={CAPACITY_MIN}
              max={CAPACITY_MAX}
              className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-zinc-800 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
              {...field}
            />
            {fieldState.error && (
              <span className="text-sm text-red-500">
                {fieldState.error.message}
              </span>
            )}
          </div>
        )}
      />

      <div className="grid grid-cols-2 gap-4">
        <Controller
          name="price"
          control={control}
          rules={{
            required: { value: true, message: "Cena je obavezna." },
            min: {
              value: 0,
              message: "Cena ne može biti negativna.",
            },
          }}
          render={({ field, fieldState }) => (
            <div className="flex flex-col gap-1">
              <label htmlFor="price" className="label">
                Cena
              </label>
              <input
                id="price"
                type="number"
                min="0"
                className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-zinc-800 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                {...field}
              />
              {fieldState.error && (
                <span className="text-sm text-red-500">
                  {fieldState.error.message}
                </span>
              )}
            </div>
          )}
        />
        <Controller
          name="currency"
          control={control}
          rules={{ required: { value: true, message: "Valuta je obavezna." } }}
          render={({ field, fieldState }) => (
            <div className="flex flex-col gap-1">
              <label htmlFor="currency" className="label">
                Valuta
              </label>
              <select
                id="currency"
                className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-zinc-800 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                {...field}
              >
                <option value="RSD">RSD</option>
                <option value="EUR">EUR</option>
                <option value="USD">USD</option>
              </select>
              {fieldState.error && (
                <span className="text-sm text-red-500">
                  {fieldState.error.message}
                </span>
              )}
            </div>
          )}
        />
      </div>

      <div className="flex flex-col gap-2">
        <span className="label">Slike (do 6, opciono)</span>
        {Array.from({ length: IMAGE_COUNT }, (_, i) => (
          <Controller
            key={i}
            name={`imageUrls.${i}`}
            control={control}
            render={({ field }) => (
              <div className="flex flex-col gap-0.5">
                {field.value ? (
                  <div className="flex items-center gap-2">
                    <img
                      src={field.value}
                      alt={`Slika ${i + 1}`}
                      className="h-16 w-16 rounded object-cover"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => handleRemoveImage(i)}
                    >
                      Ukloni
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <input
                      type="file"
                      accept="image/*"
                      className="w-full max-w-xs text-sm text-zinc-600 file:mr-2 file:rounded file:border-0 file:bg-primary-100 file:px-3 file:py-1.5 file:text-primary-700"
                      disabled={uploadingIndex !== null}
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) void handleFileSelect(i, f);
                        e.target.value = "";
                      }}
                    />
                    {uploadingIndex === i && (
                      <span className="text-sm text-zinc-500">Otpremanje…</span>
                    )}
                  </div>
                )}
              </div>
            )}
          />
        ))}
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <Button type="submit" disabled={formState.isSubmitting}>
          {formState.isSubmitting
            ? "Čuvanje…"
            : submitLabel ?? "Dodaj radionicu"}
        </Button>
      </div>
    </form>
  )
})

CreateEventForm.displayName = "CreateEventForm"

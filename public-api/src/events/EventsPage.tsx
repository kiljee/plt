import { getMe, useQuery } from "wasp/client/operations";
import { CreateEventForm } from "./components/CreateEventForm";

export const EventsPage = () => {
  const { data: me } = useQuery(getMe);
  const isAdmin = Boolean(me?.isAdmin);

  return (
    <div className="flex flex-col items-center gap-8 px-8 py-12">
      <h1 className="text-4xl font-bold">Admin – Događaji</h1>
      {isAdmin ? (
        <section className="card w-full max-w-3xl p-4 lg:p-6">
          <CreateEventForm />
        </section>
      ) : (
        <p className="text-neutral-500">Samo admin može dodavati događaje.</p>
      )}
    </div>
  );
};

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCreateEvent } from "./events.hook";

const schema = z.object({
  description: z.string().min(3),
  eventTime: z.string(),
  bookingClose: z.string(),
  eventCapacity: z.number().min(1),
  location: z.string().optional(),
});

export default function CreateEventForm() {
  const form = useForm({
    resolver: zodResolver(schema),
  });

  const createEvent = useCreateEvent();

  const onSubmit = (data: any) => {
    createEvent.mutate(data);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <Input placeholder="Description" {...form.register("description")} />
      <Input type="datetime-local" {...form.register("eventTime")} />
      <Input type="datetime-local" {...form.register("bookingClose")} />
      <Input
        type="number"
        {...form.register("eventCapacity", { valueAsNumber: true })}
      />
      <Input placeholder="Location (optional)" {...form.register("location")} />

      <Button type="submit" disabled={createEvent.isPending}>
        Create Event
      </Button>
    </form>
  );
}

"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createEventSchema, CreateEventInput } from "../../features/events/events.schema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCreateEvent } from "../../features/events/events.hook";

export default function CreateEventForm({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const form = useForm<CreateEventInput>({
    resolver: zodResolver(createEventSchema),
  });

  const createEvent = useCreateEvent();

  const onSubmit = (data: CreateEventInput) => {
    createEvent.mutate(data, {
      onSuccess: () => {
        form.reset();
        onSuccess();
      },
    });
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <Input placeholder="Event description" {...form.register("description")} />

      <Input
        type="datetime-local"
        {...form.register("eventTime")}
      />

      <Input
        type="datetime-local"
        {...form.register("bookingClose")}
      />

      <Input
        type="number"
        placeholder="Capacity"
        {...form.register("eventCapacity", { valueAsNumber: true })}
      />

      <Input placeholder="Location (optional)" {...form.register("location")} />
      <Input placeholder="Meeting link (optional)" {...form.register("meetingLink")} />

      <Button
        type="submit"
        className="w-full"
        disabled={createEvent.isPending}
      >
        {createEvent.isPending ? "Creating..." : "Create Event"}
      </Button>
    </form>
  );
}

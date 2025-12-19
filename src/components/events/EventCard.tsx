"use client"

import { Event } from "../../features/events/events.types"
import dayjs from "dayjs"
import { Button } from "@/components/ui/button"
import { getEventStatus } from "../../features/events/event.utils"
import { useJoinEvent, useLeaveEvent } from "../../features/events/events.hook"
import { toast } from "sonner"

type Props = {
  event: Event
  isCreator: boolean
  isJoined: boolean
}

export default function EventCard({ event, isCreator, isJoined }: Props) {
  const joinMutation = useJoinEvent()
  const leaveMutation = useLeaveEvent()

  const status = getEventStatus({ event, isCreator, isJoined })

  const handleJoin = async () => {
    try {
      await joinMutation.mutateAsync(event._id)
      toast.success("Event joined")
    } catch {
      toast.error("Unable to join event")
    }
  }

  const handleLeave = async () => {
    try {
      await leaveMutation.mutateAsync(event._id)
      toast.success("Left event")
    } catch {
      toast.error("Unable to leave event")
    }
  }

  return (
    <div className="rounded-lg border p-4 space-y-3">
      <div className="flex justify-between items-start">
        <h3 className="font-semibold">{event.description}</h3>
        <span className="text-xs font-medium">{status}</span>
      </div>

      <p className="text-sm text-muted-foreground">
        Event Time: {dayjs(event.eventTime).format("DD MMM YYYY, HH:mm")}
      </p>

      <p className="text-sm">
        Seats: {event.bookedCount} / {event.eventCapacity}
      </p>

      <div className="pt-2">
        {status === "OPEN" && (
          <Button onClick={handleJoin} disabled={joinMutation.isPending}>
            Join Event
          </Button>
        )}

        {status === "JOINED" && (
          <Button
            variant="outline"
            onClick={handleLeave}
            disabled={leaveMutation.isPending}
          >
            Leave Event
          </Button>
        )}

        {(status === "FULL" || status === "CLOSED") && (
          <Button disabled variant="secondary">
            {status === "FULL" ? "Event Full" : "Booking Closed"}
          </Button>
        )}

        {status === "CREATED" && (
          <Button disabled variant="secondary">
            You are the host
          </Button>
        )}
      </div>
    </div>
  )
}

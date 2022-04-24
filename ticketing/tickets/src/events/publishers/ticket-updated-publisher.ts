import {
  Publisher,
  Subjects,
  TicketUpdatedEvent,
} from "@sapienslabs/ticketing-common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}

import {
  Publisher,
  Subjects,
  TicketCreatedEvent,
} from "@sapienslabs/ticketing-common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}

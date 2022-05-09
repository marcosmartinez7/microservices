import {
  Publisher,
  OrderCreatedEvent,
  Subjects,
} from "@sapienslabs/ticketing-common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}

import {
  Publisher,
  OrderCreatedEvent,
  Subjects,
  OrderCancelledEvent,
} from "@sapienslabs/ticketing-common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}

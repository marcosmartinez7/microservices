import {
  PaymentCreatedEvent,
  Publisher,
  Subjects,
} from "@sapienslabs/ticketing-common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}

import {
  Publisher,
  Subjects,
  ExpirationCompleteEvent,
} from "@sapienslabs/ticketing-common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}

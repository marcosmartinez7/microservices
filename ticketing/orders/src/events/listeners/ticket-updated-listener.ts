import { Message } from "node-nats-streaming";
import {
  Subjects,
  Listener,
  TicketUpdatedEvent,
} from "@sapienslabs/ticketing-common";
import { Ticket } from "../../models/ticket";
import { queueGroupName } from "./queue-group-name";

export class TicketUpdatedListener extends Listener<TicketUpdatedEvent> {
  readonly subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
  queueGroupName: string = queueGroupName;
  async onMessage(data: TicketUpdatedEvent["data"], msg: Message) {
    const { id, title, price, version } = data;
    const ticket = await Ticket.findByEvent({
      id,
      version,
    });
    if (!ticket) {
      throw new Error("Ticket not found!");
    } else {
      ticket.set({ title, price });
      await ticket.save();
      console.log("Updated ticket: ", ticket);
      msg.ack();
    }
  }
}

import { randomBytes } from "crypto";
import nats from "node-nats-streaming";
import { TicketCreatedListener } from "./events/ticket-created-listener";

// kubectl port-forward nats-depl-5f5fff85d5-cdzl6 4222:4222
const stan = nats.connect("ticketing", randomBytes(4).toString("hex"), {
  url: "http://localhost:4222",
});

stan.on("connect", () => {
  console.log("Listener connected to NATS");
  new TicketCreatedListener(stan).listen();
});

stan.on("close", () => {
  console.log("NATS closed!");
  process.exit();
});

process.on("SIGINT", () => stan.close());
process.on("SIGTERM", () => stan.close());

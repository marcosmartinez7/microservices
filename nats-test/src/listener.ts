import { randomBytes } from "crypto";
import nats from "node-nats-streaming";

// kubectl port-forward nats-depl-5f5fff85d5-cdzl6 4222:4222
const stan = nats.connect("ticketing", randomBytes(4).toString("hex"), {
  url: "http://localhost:4222",
});

stan.on("connect", () => {
  console.log("Listener connected to NATS");

  const options = stan
    .subscriptionOptions()
    .setManualAckMode(true) // retry until ack
    .setDeliverAllAvailable() // reply from first message
    .setDurableName("service-name"); // store events with a mark if was processed or not, resume with the not proccessed (Ack). The idea is that with setDeliverAllAvailable we receive all the messages, but, we dont want to reprocess the already ACK ones.

  const subscription = stan.subscribe(
    "ticket:created",
    "queue-group-name",
    options
  );
  subscription.on("message", (msg) => {
    console.log(
      "Received a message [" + msg.getSequence() + "] " + msg.getData()
    );
    msg.ack();
  });
});

stan.on("close", () => {
  console.log("NATS closed!");
  process.exit();
});

process.on("SIGINT", () => stan.close());
process.on("SIGTERM", () => stan.close());

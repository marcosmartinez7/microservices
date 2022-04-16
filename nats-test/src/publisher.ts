import nats from "node-nats-streaming";
import { randomBytes } from "crypto";
// kubectl port-forward nats-depl-5f5fff85d5-cdzl6 4222:4222
const stan = nats.connect("ticketing", randomBytes(4).toString("hex"), {
  url: "http://localhost:4222",
});

stan.on("connect", () => {
  console.log("Publisher connected to NATS");

  const data = JSON.stringify({
    id: "123",
    title: "concert",
    price: 20,
  });

  stan.publish("ticket:created", data, () => {
    console.log("Event published ", data);
  });
});

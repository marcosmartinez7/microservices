import { OrderCreatedListener } from "./events/listeners/order-created-listener";
import { natsWrapper } from "./nats-wrapper";

const start = async () => {
  console.log("Starting expiration service!");
  if (!process.env.NATS_CLIENT_ID) {
    throw new Error("No NATS_CLIENT_ID");
  }

  if (!process.env.NATS_URL) {
    throw new Error("No NATS_URL");
  }

  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error("No NATS_CLUSTER_ID");
  }
  await natsWrapper.connect(
    process.env.NATS_CLUSTER_ID,
    process.env.NATS_CLIENT_ID,
    process.env.NATS_URL
  );

  natsWrapper.client.on("close", () => {
    console.log("Nats connection closed");
    process.exit();
  });

  new OrderCreatedListener(natsWrapper.client).listen();

  process.on("SIGINT", () => natsWrapper.client.close());
  process.on("SIGTERM", () => natsWrapper.client.close());
};

start();

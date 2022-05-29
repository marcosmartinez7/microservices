import mongoose from "mongoose";
import { app } from "./app";
import { OrderCanclledListener } from "./events/listeners/order-cancelled-listener";
import { OrderCreatedListener } from "./events/listeners/order-created-listener";
import { natsWrapper } from "./nats-wrapper";

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("No JWT_KEY");
  }

  if (!process.env.MONGO_URI) {
    throw new Error("No MONGO_URI");
  }

  if (!process.env.NATS_CLIENT_ID) {
    throw new Error("No NATS_CLIENT_ID");
  }

  if (!process.env.NATS_URL) {
    throw new Error("No NATS_URL");
  }

  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error("No NATS_CLUSTER_ID");
  }
  await mongoose.connect(process.env.MONGO_URI);
  await natsWrapper.connect(
    process.env.NATS_CLUSTER_ID,
    process.env.NATS_CLIENT_ID,
    process.env.NATS_URL
  );

  natsWrapper.client.on("close", () => {
    console.log("Nats connection closed");
    process.exit();
  });

  new OrderCanclledListener(natsWrapper.client).listen();
  new OrderCreatedListener(natsWrapper.client).listen();

  process.on("SIGINT", () => natsWrapper.client.close());
  process.on("SIGTERM", () => natsWrapper.client.close());

  app.listen(3000, () => {
    console.log("Tickets service started at port 3000!");
  });
};

start();

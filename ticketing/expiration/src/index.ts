import { natsWrapper } from "./nats-wrapper";

const start = async () => {
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

  process.on("SIGINT", () => natsWrapper.client.close());
  process.on("SIGTERM", () => natsWrapper.client.close());
};

start();

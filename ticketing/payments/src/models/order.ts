import mongoose from "mongoose";
import { OrderStatus } from "@sapienslabs/ticketing-common";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";
interface OrderAttrs {
  id: string;
  status: OrderStatus;
  userId: string;
  version: number;
  price: number;
}

interface OrderModel extends mongoose.Model<OrderDoc> {
  build(attrs: OrderAttrs): OrderDoc;
}

interface OrderDoc extends mongoose.Document {
  status: OrderStatus;
  userId: string;
  version: number;
  price: number;
}

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: Object.values(OrderStatus),
      default: OrderStatus.Created,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

orderSchema.set("versionKey", "version");
orderSchema.plugin(updateIfCurrentPlugin);
orderSchema.statics.build = (atrs: OrderAttrs) => {
  return new Order({
    _id: atrs.id,
    status: atrs.status,
    userId: atrs.userId,
    price: atrs.price,
  });
};

const Order = mongoose.model<OrderDoc, OrderModel>("order", orderSchema);

export { Order };

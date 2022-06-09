import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";
interface PaymentAttrs {
  orderId: string;
  stripeId: string;
}

interface PaymentModel extends mongoose.Model<PaymentDoc> {
  build(attrs: PaymentAttrs): PaymentDoc;
}

interface PaymentDoc extends mongoose.Document {
  orderId: string;
  stripeId: string;
}

const paymentSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
    },

    stripeId: {
      type: String,
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

paymentSchema.set("versionKey", "version");
paymentSchema.plugin(updateIfCurrentPlugin);
paymentSchema.statics.build = (atrs: PaymentAttrs) => {
  return new Payment({
    orderId: atrs.orderId,
    stripeId: atrs.stripeId,
  });
};

const Payment = mongoose.model<PaymentDoc, PaymentModel>(
  "payment",
  paymentSchema
);

export { Payment };

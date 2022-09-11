import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    customer: {
      type: String,
      required: true,
      maxLength: 60,
    },
    address: {
      trpe: String,
      required: true,
      maxlength: 150,
    },
    total: {
      type: Number,
      required: true,
    },
    status: {
      type: Number,
      default: 0,
    },

    method: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Oreder || mongoose.model('Order', orderSchema);

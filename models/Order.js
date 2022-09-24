import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    customer: String,
    address: String,
    total: Number,
    status: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model('Order', orderSchema);

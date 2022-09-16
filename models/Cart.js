import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema(
  {
    name: String,
    img: String,
    extras: [String],
    quantity: Number,
    price: Number,
    total: Number,
  },
  { toObject: { versionKey: false, flattenMaps: true }, timestamps: true }
);

export default mongoose.models.Cart || mongoose.model('Cart', cartSchema);

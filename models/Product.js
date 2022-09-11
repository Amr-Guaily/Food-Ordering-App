import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxLength: 60,
    },
    desc: {
      type: String,
      required: true,
      maxLength: 200,
    },
    img: {
      /** Why image in String type !?
       * when we create a new product, we gonna upload image from our computer,
       * and for uploading process.. we are goining to use an external CDN service like (firebase, amazon S3, ..etc)
       * after uploading the img file, the CDN service return us a URL and that url will be string.
       */
      type: String,
      required: true,
    },
    prices: {
      type: [Number],
      required: true,
    },
    extraOptions: {
      type: [
        {
          text: { type: String, required: true },
          price: { type: String, required: true },
        },
      ],
    },
  },
  // When we create/update product, we will get the create/update date
  { timestamps: true }
);

// If we already have this Product model, don't create it again
export default mongoose.models.Product ||
  mongoose.model('Product', productSchema);

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  // Define los campos necesarios para el carrito
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: { type: Number, default: 1 }
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});


export default mongoose.model('Cart', userSchema);



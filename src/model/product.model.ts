import { ObjectId } from 'bson';
import mongoose, { Document, Model, Schema } from 'mongoose';
import { Categoria, ICategory } from './category.model';

// Interface
export interface IProduct extends Document {
  id: ObjectId;
  name: string;
  brand: string;
  bardCode: string;
  description: string;
  Keywords: string[];
  createAt: Date;
  updateAt: Date;
  price: number;
  isActive: boolean;
  category: ICategory['_id'];
}

// Schema
const ProductSchema: Schema = new mongoose.Schema({
  id: {
    type: ObjectId,
    required: true,
  },
  name: {
    type: String,
  },
  brand: {
    type: String,
  },
  bardCode: {
    type: String,
  },
  description: {
    type: String,
  },
  Keywords: {
    type: Array,
  },
  createAt: {
    type: Date,
  },
  updateAt: {
    type: Date,
  },
  price: {
    type: Number,
  },
  isActive: {
    type: Boolean,
  },
  category: {
    type: Schema,
    ref: Categoria
  },
});

const Product: Model<IProduct> = mongoose.model<IProduct>('Product', ProductSchema);

export { Product };

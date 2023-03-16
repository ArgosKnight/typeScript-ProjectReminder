import { ObjectId } from 'mongodb';
import mongoose, { Document, Model, Schema } from 'mongoose';
import { ICategory } from './category.model';

export interface IProduct extends Document {
  id: ObjectId;
  name: string;
  brand: string;
  bardCode: string;
  description: string;
  keywords: string[];
  createdAt: Date;
  updatedAt: Date;
  price: number;
  isActive: boolean;
  category: ICategory['_id'];
}

const ProductSchema: Schema = new mongoose.Schema({
  id:{
    type: ObjectId,
    require: true
  },
  name: {
    type: String,
    required: true
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
  keywords: {
    type: [String],
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
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Categoria',
  }
});

const Product: Model<IProduct> = mongoose.model<IProduct>('Product', ProductSchema);

export { Product };

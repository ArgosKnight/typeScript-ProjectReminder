import mongoose, { Document, Model, Schema } from 'mongoose';

export interface ICategory extends Document {
  name: string;
}

const CategorySchema: Schema = new mongoose.Schema({
  name: {
    type: String,
  },
});

export const Categoria: Model<ICategory> = mongoose.model<ICategory>('Categoria', CategorySchema);

module.exports = {Categoria, CategorySchema}
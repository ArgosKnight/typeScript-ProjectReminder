import mongoose from 'mongoose';

// Función para conectarse a la base de datos
export const connectDB = async (): Promise<void> => {
  const url = 'mongodb+srv://argosknight:skatelife1995@cluster0.bx1i440.mongodb.net/TEST';
  try {
    mongoose.set('strictQuery', true);
    const conn = await mongoose.connect(url);
    console.log('CONECTADO A LA BASE DE DATOS');
  } catch (error) {
    console.error(error);
  }
};

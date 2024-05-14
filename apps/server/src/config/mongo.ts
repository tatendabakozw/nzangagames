import mongoose, { ConnectOptions } from 'mongoose';
mongoose.set('strictQuery', false);
// const mongoUrl = `mongodb://localhost:27017/gateway_DB`;

const mongoUrl = process.env.MONGO_DB;

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(mongoUrl, {} as ConnectOptions);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(process.env.MONGO_DB);
    console.error('Could not connect to database --- ', error.message);
    process.exit(1);
  }
};

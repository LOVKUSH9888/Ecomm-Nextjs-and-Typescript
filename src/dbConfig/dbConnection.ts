import mongoose from "mongoose";

export const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION_STRING!); //Just use the ! sign then the issue get resolved
    console.log("dbConnection successfully");
  } catch (error) {
    console.log(error);
  }
};

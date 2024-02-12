// Import necessary modules and packages
import { dbConnection } from "@/dbConfig/dbConnection";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";

// Establish database connection
dbConnection();

// Define the POST function for user registration
export async function POST(request: NextRequest) {
  try {
    ///const { name, email, password } = await request.json();
    const reqBody = await request.json();

    // Check if the user already exists
    /// const userExists = await User.findOne({ email });
    const userExists = await User.findOne({ email: reqBody.email });
    if (userExists) {
      throw new Error("User already exists");
    }

    // Create a new user
    const newUser = new User(reqBody);
    await newUser.save();

    // Return a success response
    return NextResponse.json({
      message: "User created successfully",
      data: newUser,
    });
  } catch (error: any) {
    // Return an error response
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 400 }
    );
  }
}

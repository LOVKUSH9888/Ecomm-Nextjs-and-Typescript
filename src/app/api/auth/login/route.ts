// Import necessary modules and packages
import { dbConnection } from "@/dbConfig/dbConnection";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Establish database connection
dbConnection();

// Define the POST function
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json(); //reqBody = payload with destructring

    // check if user exists in database or not
    const user = await User.findOne({ email: reqBody.email });
    if (!user) {
      throw new Error("User does not exist");
    }

    //Matching the password now
    const passwordMatch = await bcrypt.compare(reqBody.password, user.password);
    if (!passwordMatch) {
      throw new Error("Invalid credentials");
    }

    // create token
    /* jwt.sign({data: 'foobar'}, 'secret', { expiresIn: '1h' }); */
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY_COOKIE!, {
      expiresIn: "7d",
    });

    const response = NextResponse.json({
      message: "Login successful",
    });

    //Storing Token into the Cookie
    ///cookie.set("Any secret ket", token, parameters)
    response.cookies.set("process.env.SECRET_KEY_COOKIE!", token, {
      httpOnly: true,
      path: "/",
    });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 400 }
    );
  }
}

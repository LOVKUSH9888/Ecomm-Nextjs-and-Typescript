import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const validateJWT = async (request: NextRequest) => {
  try {
    // Retrieve the token from cookies, defaulting to an empty string if not present = Using this JS Destructuring method
    const { value: token = "" } = request.cookies.get("token") || {};

    // If no token is provided, throw an error
    if (!token) {
      throw new Error("No token provided");
    }

    // Verify the token using the provided secret and extract the user ID = Object Destructing with Type Assertion
    const { id } = jwt.verify(token, process.env.jwt_secret!) as { id: string };

    // Return the user ID
    return id;
  } catch (error: any) {
    // If an error occurs during token validation, throw an error with the error message
    throw new Error(error.message);
  }
};

//Complex I wrote before
/*import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const validateJWT = async (request: NextRequest) => {
  try {
    const token = request.cookies.get("token")?.value || "";
    if (!token) {
      throw new Error("No token provided");
    }

    // decode the token
    const decryptedToken: any = jwt.verify(token, process.env.jwt_secret!);
    return decryptedToken.id;
  } catch (error: any) {
    throw new Error(error.message);
  }
}; */

import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const validateJWT = async (request: NextRequest) => {
  try {
    // Retrieve the token from cookies, defaulting to an empty string if not present
    const token = request.cookies.get("token")?.value || "";

    // If no token is provided, throw an error
    if (!token) {
      throw new Error("No token provided");
    }

    // Decode the token using the provided secret and extract the user ID
    // Note: The type of decryptedToken is any, as jwt.verify returns an object with dynamic properties
    const decryptedToken: any = jwt.verify(token, process.env.SECRET_KEY!);

    // Return the user ID extracted from the decoded token
    return decryptedToken.id;
  } catch (error: any) {
    // If an error occurs during token validation, throw an error with the error message
    throw new Error(error.message);
  }
};

import jwt from "jsonwebtoken";

export const  generateTokens =async ( userId, email)=> {

  try {
    const accessToken = jwt.sign(
      {  email, userId },
      process.env.ACCESS_TOKEN_PRIVATE_KEY || "",
      {
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }
    );
    return Promise.resolve({ accessToken, userId });
  } catch (err) {
    return Promise.reject(err);
  }
}


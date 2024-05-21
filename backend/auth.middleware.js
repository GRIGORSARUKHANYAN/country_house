import jwt from "jsonwebtoken"

export const authMiddleware = async (req, res, next) => {
  try {

    if (!req ||  !req.header  || !req.header("Authorization") ) {
      return next(res.status(400).send("Authentication token missing"));
    }
    const token = req.header("Authorization")?.split("Bearer ")[1];
    if (!token) {
      next(res.status(400).send("Authentication token missing"));
    } else {
      jwt.verify(token, process.env.ACCESS_TOKEN_PRIVATE_KEY || "", (err) => {
        if (err) {
          next(res.status(401).send("Wrong authentication token"));
        } else {
          next();
        }
      });
    }
  } catch (err) {
    next(res.status(401).send("Error verifying authentication token"));
  }
};


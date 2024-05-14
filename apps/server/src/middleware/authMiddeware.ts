import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

/**
 * @notice - functions give permissions to users with certain roles
 * @param {token} req - token from the client
 * @returns user object with id
 */
export const requireUserSignIn = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log('req.headers', req.headers);
  if (req.headers.authorization) {
    // get token from headers
    const token = req.headers.authorization.replace('Bearer ', '');

    console.log('token', token);

    // verify if token is valid
    jwt.verify(
      token,
      process.env.JWT_SECRET as string,
      (err, user: JwtPayload | undefined) => {
        // if error occurred while validating token return that error
        if (err) {
          res.status(500).send({ error: err.message });
        } else if (
          user &&
          (user.role === 'user' || user.role === 'admin')
        ) {
          req.user = user;
          next();
        } else {
          console.log('Elevated previledges required')
          return res
            .status(500)
            .send({ message: 'Only Users can perform that task' });
        }
      }
    );
  } else {
    return res.status(500).send({ message: 'Authorization Required!' });
  }
};

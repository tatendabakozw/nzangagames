import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET;

// Function to generate a JWT
export function generateToken(user) {
  return jwt.sign({ user }, secretKey, { expiresIn: '1h' }); // Token expires in 1 hour
}

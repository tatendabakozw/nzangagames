import express from 'express';
const router = express();
import { loginUserWithEmail, registerUserWithEmail } from '@controllers/auth-controllers/emailAuthController';


// register user
// post request
// /api/auth/register
router.post(
  '/register',
  registerUserWithEmail
);

// login user
// post request
// /api/auth/login
router.post('/login', loginUserWithEmail);

export default router;

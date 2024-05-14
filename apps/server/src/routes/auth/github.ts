import express from 'express';
const router = express();
import {githubCallbackController, loginWithGithub } from '@controllers/auth-controllers/githubAuthController';

// github auth route
// get request
// /auth/github
router.get(
  '/github',
  loginWithGithub
);

// github callback
// get request
// /auth/github/caallback
router.get(
  '/github/callback',
  githubCallbackController
);

export default router;

/* eslint-disable @typescript-eslint/no-explicit-any */
import { userInstallGithubController } from '@controllers/user-controllers/userGithubController';
import { requireUserSignIn } from '@middleware/authMiddeware';
import { User } from '@models/User';
import express from 'express';
import { CustomRequest } from 'utils/types';
const router = express.Router();

// get all user repositories
// get request
// /api/user/repos
router.get('/repos', requireUserSignIn, async (req: CustomRequest, res, next) => {
  try {
    const user:any = req.user; // user from clienf
    const _user = await User.findById({_id: user._id});
    console.log(_user)
    const accessToken = req.session.gh_access_token;
    console.log('get all repository of user from github', accessToken);
    return res
      .status(200)
      .send({
        accessToken: accessToken,
        message: 'getting all repos was successful',
      });
  } catch (error) {
    next(error);
  }
});

// add github access token to user object
// get request
// /api/user/install-github
router.get('/install-github', requireUserSignIn, userInstallGithubController)

export default router;

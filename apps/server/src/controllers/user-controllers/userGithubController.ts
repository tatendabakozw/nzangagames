import { CustomRequest } from 'utils/types';

const clientId = process.env.GITHUB_CLIENT_ID;

export const userInstallGithubController = async (
  req: CustomRequest,
  res,
  next
) => {
  const _user = req.user;
  if (!_user) {
    return res.status(400).send({ message: 'You shouod be logged in first' });
  }
  try {
    res.redirect(
      `https://github.com/login/oauth/authorize?client_id=${clientId}`
    );
  } catch (error) {
    next(error);
  }
};

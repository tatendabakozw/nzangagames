import { User } from '@models/User';
import axios from 'axios';
import { Octokit } from '@octokit/rest';

const githubCallbackUri = 'http://localhost:3333/auth/github/callback';

const clientId = process.env.GITHUB_CLIENT_ID;
const clientSecret = process.env.GITHUB_CLIENT_SECRET;
const redirectUri = 'http://localhost:4201/new/static-site';

// request login from github
// function returrns code to the callback url
// post request
export const loginWithGithub = (req, res, next) =>{
  try {
    res.redirect(`https://github.com/login/oauth/authorize?client_id=${clientId}`);
  } catch (error) {
    next(error)
  }
}

// github call back url
// all logic purtaining github login happens here.
// post request
export const githubCallbackController = async (req, res, next) => {
  try {
    const code = req.query.code;

    // Exchange code for access token
    const { data } = await axios.post(
      'https://github.com/login/oauth/access_token',
      {
        client_id: clientId,
        client_secret: clientSecret,
        code,
        redirect_uri: githubCallbackUri,
      },
      {
        headers: {
          Accept: 'application/json',
        },
      }
    );

    // instantiate octacit to get all repositories
    const octokit = new Octokit({
      auth: data.access_token
    });

    // const response = await octokit.repos.listForAuthenticatedUser();

    // request user info from octacit
    const octokit_response = await octokit.users.getAuthenticated();
    console.log(octokit_response);

    // Store user information in session
    req.session.gh_access_token = data.access_token;

    // // console.log('profile - ', profile);
    const _user = await User.findOne({ githubId: octokit_response.data.id });
    // // // // console.log(_user)
    if (!_user) {
      const newUser = new User({
        username: octokit_response.data.login,
        photoURL: octokit_response.data.avatar_url,
        authMethod: 'github',
        githubAccessToken: data.access_token,
        githubId: octokit_response.data.id,
      });
      await newUser.save();
    }
    res.redirect(redirectUri);
  } catch (error) {
    console.error('GitHub Auth Error:', error);
    next(error);
  }
};

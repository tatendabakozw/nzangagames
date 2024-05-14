import { randomUUID } from 'crypto';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '@models/User';

const MIN_PASSWORD_LENGTH = 6;

// register user
// post request
// /api/auth/register
export const registerUserWithEmail = async (req, res, next) => {
  try {
    const { email, agreed, password } = req.body;

    if(!email){
      return res.status(500).send({message: 'Provide an email'})
    }

    if(!password){
      return res.status(500).send({message: 'Provide a password'})
    }
    
    if (password.length < MIN_PASSWORD_LENGTH) {
      return res
        .status(400)
        .send({ message: 'Password should be greater than 6 characters' });
    }

    // get user from database
    const user = await User.findOne({ email: email });

    //validate forms
    if (!agreed) {
      return res
        .status(401)
        .send({ message: 'Terms and Conditions not agreed' });
    }

    if (user) {
      return res.status(500).send({ message: 'Account already exists' });
    }

    //create new user object
    const newUser = new User({
      role: 'user',
      email: email,
      password: bcrypt.hashSync(password, 12),
      terms_agreed: agreed,
      username: email.split('@')[0],
    });

    //save in database
    await newUser.save();
    return res.status(200).send({ message: 'Account created successfully' });

  } catch (error) {
    next(error);
  }
};

export const registerUserWithGithub = async (req, res, next) => {
  try {
    const { email, agreed, method, username, photoURL, phoneNumber } = req.body;
    let { password } = req.body;

    if (password.length < MIN_PASSWORD_LENGTH) {
      return res
        .status(400)
        .send({ message: 'Password should be greater than 6 characters' });
    }

    // create password for google users
    if (method === 'google') {
      password = randomUUID();
    }

    // get user from database
    const user = await User.findOne({ email: email });

    //validate forms
    if (!agreed) {
      return res
        .status(401)
        .send({ message: 'Your have to agree to our terms and conditions' });
    }

    if (user) {
      return res.status(500).send({ message: 'Account already exists' });
    }

    //create new user object
    const newUser = new User({
      role: 'user',
      email: email,
      password: bcrypt.hashSync(password, 12),
      terms_agreed: agreed,
      authMethod: method,
      username: username,
      photoURL: photoURL,
      phoneNumber: phoneNumber,
    });

    //save in database
    const _user = await newUser.save();
    let token;
    if (method === 'google') {
      token = await jwt.sign(
        {
          // email: _user.email,
          _id: _user._id,
          role: _user.role,
          username: _user.username,
          photoURL: _user.photoURL,
        },
        process.env.JWT_SECRET
      );
      if (token) {
        const user = {
          // email: _user.email,
          _id: _user._id,
          role: _user.role,
          username: _user.username,
          photoURL: _user.photoURL,
          token: token,
        };
        return res.status(200).send({ ...user, message: 'Account Created' });
      } else {
        return res.status(422).send({ message: 'Failed to login, Try again!' });
      }
    }

    // if user registered using email and password
    return res.status(200).send({ message: 'Account Created' });
  } catch (error) {
    next(error);
  }
};

// login user
// post request
// /api/auth/login
export const loginUserWithEmail = async (req, res, next) => {
  try {
    // fields from request
    const { email, password, googleAuthId } = req.body;

    const _user = await User.findOne({ email: email });

    if (!email) {
      return res.status(400).send({ message: 'Please provide email' });
    }

    // user not found
    if (!_user) {
      return res.status(404).send({ message: 'Account does not exist!' });
    }
    // if (!_user.emailApproved) {
    //   return res.status(403).send({ message: 'Verify your email address' });
    // }
    if (_user.authMethod === 'google' && googleAuthId === '') {
      return res.status(400).send({ message: 'Login Using Google' });
    }

    // decrypt password value from database
    const password_correct = await bcrypt.compare(password, _user.password);
    if (password_correct) {
      const token = await jwt.sign(
        {
          // email: _user.email,
          _id: _user._id,
          role: _user.role,
          username: _user.username,
          photoURL: _user.photoURL,
        },
        process.env.JWT_SECRET
      );
      if (token) {
        const user = {
          // email: _user.email,
          _id: _user._id,
          role: _user.role,
          username: _user.username,
          photoURL: _user.photoURL,
          token: token,
        };

        return res.send({ user, message: 'logged in sucessfully' });
      } else {
        return res
          .status(422)
          .send({ message: 'Failed to login, Wrong details!' });
      }
    } else {
      return res.status(400).send({ message: 'Wrong login details' });
    }
  } catch (error) {
    next(error);
  }
};

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      default: '',
    },
    password: {
      type: String,
      trim: true,
      default: '',
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    terms_agreed: {
      type: Boolean,
      default: true,
    },

    authMethod: {
      type: String,
      enum: ['email_password', 'google', 'github'],
      default: 'email_password',
    },

    githubId: {
      type: String,
    },
    githubAccessToken:{
      type: String,
      default: ''
    },
    githubInfo: Object,
    username: {
      type: String,
      default: '',
    },
    photoURL: {
      type: String,
      default: '',
    },
    phoneNumber: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model('User', userSchema);

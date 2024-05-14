import mongoose from 'mongoose';

const siteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'provide a title for your site'],
    },
    imageUrl: {
      type: String,
      default: '',
    },
    source: {
      type: String,
      enum: ['github', 'local'],
      default: 'local',
    },
    owner: {
      type: String,
      required: [true, 'No owner has been specified'],
    },
    hostUrl:{
      type: String
    },
    repo:{
      type: String
    }
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model('User', siteSchema);

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request } from 'express';

export interface CustomRequest extends Request {
  session: {
    gh_access_token?: string;
  };
}

export interface ClientUserProps{
  _id: string,
  token: string,
  username: string,
  iat: string
  photoURL: string,
  user?:any
}

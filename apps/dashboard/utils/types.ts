/* eslint-disable @typescript-eslint/no-explicit-any */

export interface projectItemProps {
  link: string;
  name: string;
  createdAt: string;
  branch: string;
  status: string;
  Icon?: any;
}
export interface UserProps {
  email: string;
  token: string;
  photoURL: string;
  role: string;
  emailVerified: boolean;
  username: boolean;
  _id: string;
  company: {
    name: string;
    logo: string;
  };
}

export interface ContextType {
  darkMode: boolean;
  userInfo: UserProps;
  search_query: string;
  dispatch?: any;
  state?: any;
}

export interface SelectItemProps {
  name?: string;
  slug?: string;
  _id?: string;
}

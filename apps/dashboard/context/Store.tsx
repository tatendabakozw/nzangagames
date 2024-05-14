/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useReducer } from 'react';
import Cookies from 'js-cookie';
import { ContextType } from '@utils/types';

const initialState = {
  darkMode: false,
  userInfo: Cookies.get('userInfo')
    ? // @ts-ignore
      JSON.parse(Cookies.get('userInfo'))
    : null,
  search_query: '',
};

export const Store = createContext<ContextType>(initialState);

function reducer(state: any, action: { type: any; payload: any }) {
  switch (action.type) {
    case 'DARK_MODE_ON':
      return { ...state, darkMode: true };
    case 'DARK_MODE_OFF':
      return { ...state, darkMode: false };
    case 'USER_LOGIN':
      Cookies.set('userInfo', JSON.stringify(action.payload));
      return { ...state, userInfo: action.payload };
    case 'USER_LOGOUT':
        Cookies.remove('userInfo');
      return { ...state, userInfo: null, cart: { cartItems: [] } };
    case 'SET_SEARCH_QUERY':
      return { ...state, search_query: action.payload };
    default:
      return state;
  }
}

interface Props {
  children?: any;
}

export function StoreProvider(props: Props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch, ...initialState };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
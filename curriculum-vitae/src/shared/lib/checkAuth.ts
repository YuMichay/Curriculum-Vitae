import Cookies from 'js-cookie';

export const checkAuth = () => {
  return Cookies.get('access_token') !== undefined;
}
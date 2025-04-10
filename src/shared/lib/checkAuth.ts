import Cookies from 'js-cookie';

export const checkAuth = () => {
  return !!localStorage.getItem("user") && !!Cookies.get('access_token');
}
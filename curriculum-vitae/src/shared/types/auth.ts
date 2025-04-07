export interface AuthFormProps {
  type: 'login' | 'signup',
};

export interface AuthData {
  email: string,
  password: string,
}